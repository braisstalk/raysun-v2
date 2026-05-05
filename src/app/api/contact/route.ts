import { NextResponse, type NextRequest } from 'next/server'
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  isBodyWithinLimit,
  isValidEmail,
  validateString,
  verifyTurnstile,
} from '@/lib/api/guard'

const MAX_BODY_BYTES = 16 * 1024
const MAX_LENGTHS = {
  name: 100,
  email: 254,
  company: 200,
  phone: 50,
  country: 100,
  inquiryType: 100,
  subject: 200,
  message: 3000,
  formSource: 32,
}
const ALLOWED_FORM_SOURCES = new Set(['contact', 'order', 'careers', 'rfq'])

interface SanitizedContactData {
  name: string
  email: string
  company: string
  phone: string
  country: string
  inquiryType: string
  subject: string
  message: string
  formSource: string
}

function buildEmailBody(data: SanitizedContactData): string {
  const lines = [
    `=== New ${data.formSource.toUpperCase()} Form Submission ===`,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
  ]
  if (data.company) lines.push(`Company: ${data.company}`)
  if (data.phone) lines.push(`Phone: ${data.phone}`)
  if (data.country) lines.push(`Country: ${data.country}`)
  if (data.inquiryType) lines.push(`Inquiry Type: ${data.inquiryType}`)
  if (data.subject) lines.push(`Subject: ${data.subject}`)
  lines.push('', `Message:`, data.message, '', `---`, `Submitted at: ${new Date().toISOString()}`)
  return lines.join('\n')
}

function buildSubject(data: SanitizedContactData): string {
  const sourceLabel: Record<string, string> = {
    contact: 'Contact Inquiry',
    order: 'Quote Request',
    careers: 'Job Application',
    rfq: 'Request for Quotation',
  }
  const prefix = sourceLabel[data.formSource] || 'Website Inquiry'
  const inquiryLabel = data.inquiryType ? ` — ${data.inquiryType}` : ''
  return `[Raysun Website] ${prefix}${inquiryLabel} from ${data.name}`
}

function genericError(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function POST(request: NextRequest) {
  // 1. Origin allowlist (covers production domain, localhost, *.vercel.app,
  //    and any extra entries from ALLOWED_ORIGINS env var). Same-origin
  //    requests with no Origin header are permitted.
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return genericError('forbidden', 403)
  }

  // 2. Body size guard (Content-Length based — fast reject before reading).
  if (!isBodyWithinLimit(request, MAX_BODY_BYTES)) {
    return genericError('payload too large', 413)
  }

  // 3. Per-instance rate limit. 5 submissions per IP per 10 minutes.
  const ip = getClientIp(request)
  const limit = checkRateLimit(ip, {
    key: 'contact',
    windowMs: 10 * 60 * 1000,
    max: 5,
  })
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: 'too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000)).toString(),
        },
      },
    )
  }

  // 4. Parse JSON body.
  let raw: Record<string, unknown>
  try {
    raw = (await request.json()) as Record<string, unknown>
  } catch {
    return genericError('invalid json', 400)
  }

  // 5. Honeypot — if the hidden `website` field is filled, silently succeed
  //    so spam bots get no signal that they were detected.
  if (typeof raw.website === 'string' && raw.website.trim().length > 0) {
    return NextResponse.json({ success: true, message: 'ok' })
  }

  // 6. Optional Turnstile / captcha gate. If TURNSTILE_SECRET_KEY is unset
  //    this is a no-op; otherwise the client must include `captchaToken`.
  if (process.env.TURNSTILE_SECRET_KEY) {
    const token =
      typeof raw.captchaToken === 'string' ? raw.captchaToken : undefined
    const ok = await verifyTurnstile(token ?? null)
    if (!ok) {
      return genericError('captcha failed', 403)
    }
  }

  // 7. Field validation.
  const errors: string[] = []
  const name = validateString(raw.name, MAX_LENGTHS.name, true)
  if (!name.ok) errors.push('Invalid name')
  const email = validateString(raw.email, MAX_LENGTHS.email, true)
  if (!email.ok || !isValidEmail(email.value)) errors.push('Invalid email')
  const message = validateString(raw.message, MAX_LENGTHS.message, true)
  if (!message.ok) errors.push('Invalid message')
  const company = validateString(raw.company, MAX_LENGTHS.company)
  if (!company.ok) errors.push('Invalid company')
  const phone = validateString(raw.phone, MAX_LENGTHS.phone)
  if (!phone.ok) errors.push('Invalid phone')
  const country = validateString(raw.country, MAX_LENGTHS.country)
  if (!country.ok) errors.push('Invalid country')
  const inquiryType = validateString(raw.inquiryType, MAX_LENGTHS.inquiryType)
  if (!inquiryType.ok) errors.push('Invalid inquiryType')
  const subject = validateString(raw.subject, MAX_LENGTHS.subject)
  if (!subject.ok) errors.push('Invalid subject')

  const formSource = validateString(raw.formSource, MAX_LENGTHS.formSource, true)
  if (!formSource.ok || !ALLOWED_FORM_SOURCES.has(formSource.value)) {
    errors.push('Invalid formSource')
  }

  if (errors.length) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  const data: SanitizedContactData = {
    name: name.value,
    email: email.value,
    company: company.value,
    phone: phone.value,
    country: country.value,
    inquiryType: inquiryType.value,
    subject: subject.value,
    message: message.value,
    formSource: formSource.value,
  }

  const emailBody = buildEmailBody(data)
  const emailSubject = buildSubject(data)
  const recipient = 'info@raysunpharma.com'

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || '587', 10),
        secure: (smtpPort || '587') === '465',
        auth: { user: smtpUser, pass: smtpPass },
      })
      await transporter.sendMail({
        from: `"Raysun Website" <${smtpUser}>`,
        replyTo: data.email,
        to: recipient,
        subject: emailSubject,
        text: emailBody,
      })
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully.',
        method: 'smtp',
      })
    } catch (smtpError: unknown) {
      // Never leak SMTP details to the client. Server-side log only.
      console.error('[Contact API] SMTP error:', (smtpError as Error)?.message)
      return genericError('Unable to send your message at this time. Please try again later.', 502)
    }
  }

  // No SMTP configured — log and return success so dev / staging still works.
  console.log('[Contact API] Form submission received:')
  console.log(`  To: ${recipient}`)
  console.log(`  Subject: ${emailSubject}`)
  console.log(`  From: ${data.name} <${data.email}>`)
  console.log(`  Source: ${data.formSource}`)

  return NextResponse.json({
    success: true,
    message: 'Your message has been received. Our team will contact you shortly.',
    method: 'logged',
  })
}
