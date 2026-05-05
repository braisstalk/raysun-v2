import { NextResponse } from 'next/server'

interface ContactFormData {
 name: string
 email: string
 company?: string
 phone?: string
 country?: string
 inquiryType?: string
 subject?: string
 message: string
 formSource: string
}

function validateFormData(data: any): { valid: boolean; errors: string[] } {
 const errors: string[] = []
 if (!data.name?.trim()) errors.push('Name is required')
 if (!data.email?.trim()) errors.push('Email is required')
 else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Invalid email format')
 if (!data.message?.trim()) errors.push('Message is required')
 return { valid: errors.length === 0, errors }
}

function buildEmailBody(data: ContactFormData): string {
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

function buildSubject(data: ContactFormData): string {
 const sourceLabel: Record<string, string> = {
 contact: 'Contact Inquiry',
 order: 'Quote Request',
 careers: 'Job Application',
 }
 const prefix = sourceLabel[data.formSource] || 'Website Inquiry'
 const inquiryLabel = data.inquiryType ? ` — ${data.inquiryType}` : ''
 return `[Raysun Website] ${prefix}${inquiryLabel} from ${data.name}`
}

export async function POST(request: Request) {
 try {
 const data: ContactFormData = await request.json()
 const { valid, errors } = validateFormData(data)
 if (!valid) {
 return NextResponse.json({ success: false, errors }, { status: 400 })
 }

 const emailBody = buildEmailBody(data)
 const subject = buildSubject(data)
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
 subject,
 text: emailBody,
 })
 return NextResponse.json({ success: true, message: 'Your message has been sent successfully.', method: 'smtp' })
 } catch (smtpError: any) {
 console.error('[Contact API] SMTP error:', smtpError.message)
 }
 }

 console.log('[Contact API] Form submission received:')
 console.log(` To: ${recipient}`)
 console.log(` Subject: ${subject}`)
 console.log(` From: ${data.name} <${data.email}>`)
 console.log(` Source: ${data.formSource}`)

 return NextResponse.json({
 success: true,
 message: 'Your message has been received. Our team will contact you shortly.',
 method: 'logged',
 mailto: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`,
 })
 } catch (error: any) {
 console.error('[Contact API] Error:', error.message)
 return NextResponse.json(
 { success: false, errors: ['An unexpected error occurred. Please try again.'] },
 { status: 500 },
 )
 }
}
