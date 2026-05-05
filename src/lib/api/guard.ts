// Shared, opinionated guards for public API routes.
//
// These run inside Vercel serverless functions. The rate limit map is per-
// instance — i.e. NOT a globally consistent counter. It is a best-effort
// throttle that catches obvious bursts; real abuse protection should add a
// shared store (Redis / Upstash) at the next phase.

import type { NextRequest } from 'next/server'

const PRODUCTION_ORIGINS = [
  'https://www.raysunpharma.com',
  'https://raysunpharma.com',
]

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
]

function getEnvAllowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGINS
  if (!raw) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

// True for previews like https://my-branch-team.vercel.app
function isVercelPreviewOrigin(origin: string): boolean {
  try {
    const url = new URL(origin)
    return url.protocol === 'https:' && url.hostname.endsWith('.vercel.app')
  } catch {
    return false
  }
}

export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) {
    // Same-origin POSTs from the site itself (proxy → app on the same domain)
    // do not always send an Origin header. Allow null in that case; the
    // request only reaches us through Next.js's own routing, so it is safe
    // enough as a baseline. CORS preflight failures still block real abuse.
    return true
  }
  if (PRODUCTION_ORIGINS.includes(origin)) return true
  if (DEV_ORIGINS.includes(origin)) return true
  if (isVercelPreviewOrigin(origin)) return true
  if (getEnvAllowedOrigins().includes(origin)) return true
  return false
}

export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const cf = request.headers.get('cf-connecting-ip')
  if (cf) return cf.trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

interface RateLimitBucket {
  count: number
  resetAt: number
}

export interface RateLimitOptions {
  // Logical name of the limiter — separate buckets per route.
  key: string
  // Window size in ms.
  windowMs: number
  // Max requests allowed in the window.
  max: number
}

const buckets = new Map<string, RateLimitBucket>()

export interface RateLimitResult {
  ok: boolean
  remaining: number
  resetAt: number
}

// Simple per-instance fixed-window counter. Returns ok=false when the IP has
// exhausted its window. Callers should respond with 429.
export function checkRateLimit(ip: string, opts: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const bucketKey = `${opts.key}:${ip}`
  const existing = buckets.get(bucketKey)

  if (!existing || existing.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + opts.windowMs }
    buckets.set(bucketKey, fresh)
    return { ok: true, remaining: opts.max - 1, resetAt: fresh.resetAt }
  }

  if (existing.count >= opts.max) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  return { ok: true, remaining: opts.max - existing.count, resetAt: existing.resetAt }
}

// Lightweight body-size guard based on Content-Length. Returns true when the
// header is missing or below the threshold; false when exceeded.
export function isBodyWithinLimit(request: NextRequest, maxBytes: number): boolean {
  const header = request.headers.get('content-length')
  if (!header) return true
  const n = Number.parseInt(header, 10)
  if (!Number.isFinite(n)) return true
  return n <= maxBytes
}

// Verify Cloudflare Turnstile token. If TURNSTILE_SECRET_KEY is unset, this
// returns true (i.e. captcha is treated as optional and skipped). Callers that
// require captcha in production should also gate on the env var being set.
export async function verifyTurnstile(token: string | undefined | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
    })
    if (!res.ok) return false
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

// Coerce + length-check a single string field. `required` toggles whether
// missing/blank values are rejected.
export function validateString(
  value: unknown,
  max: number,
  required = false,
): { ok: boolean; value: string } {
  if (typeof value !== 'string') {
    if (required) return { ok: false, value: '' }
    return { ok: true, value: '' }
  }
  const trimmed = value.trim()
  if (required && trimmed.length === 0) return { ok: false, value: trimmed }
  if (trimmed.length > max) return { ok: false, value: trimmed }
  return { ok: true, value: trimmed }
}

// Conservative email regex; mirrors the previous behaviour but capped to 254
// chars per RFC 5321.
export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
