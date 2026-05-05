#!/usr/bin/env node
// Regression check for the /api/contact `formSource` allowlist.
//
// Why this script exists:
//   PR #1 round 2 introduced an allowlist (contact / order / careers / rfq).
//   The RfqPanel posts `formSource: 'rfq'` and was rejected before that fix.
//   This script makes it easy to confirm the four real-world sources still
//   succeed and a bogus one is rejected, against any environment.
//
// Usage:
//   # Against a local Next.js server you've already started in another shell
//   node scripts/verify-form-source.mjs
//
//   # Against a Vercel preview / production
//   API_BASE=https://your-preview.vercel.app node scripts/verify-form-source.mjs
//
// Notes:
//   - Sends Origin: API_BASE so the same-origin allowlist passes.
//   - Stays under the per-IP rate limit (5 / 10min) by issuing 5 requests.
//   - Exits non-zero if any case does not match its expected status.

const API_BASE = process.env.API_BASE || 'http://localhost:3000'

const cases = [
  { formSource: 'contact', expectStatus: 200, label: 'Contact form' },
  { formSource: 'order',   expectStatus: 200, label: 'Order Now form' },
  { formSource: 'careers', expectStatus: 200, label: 'Careers form' },
  { formSource: 'rfq',     expectStatus: 200, label: 'RFQ panel (regression for PR #1 round 2 follow-up)' },
  { formSource: 'bogus',   expectStatus: 400, label: 'Negative — unknown source must be rejected' },
]

const basePayload = {
  name: 'Regression Test',
  email: 'qa@example.com',
  message: 'Smoke test for formSource allowlist.',
}

let failures = 0
for (const { formSource, expectStatus, label } of cases) {
  let status = 0
  let body = ''
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: API_BASE,
      },
      body: JSON.stringify({ ...basePayload, formSource }),
    })
    status = res.status
    body = await res.text()
  } catch (err) {
    failures += 1
    console.log(`✗ formSource="${formSource}" — request failed: ${err?.message || err}`)
    continue
  }
  const ok = status === expectStatus
  if (!ok) failures += 1
  console.log(`${ok ? '✓' : '✗'} formSource="${formSource}" → ${status} (expected ${expectStatus}) — ${label}`)
  if (!ok) console.log(`  body: ${body}`)
}

if (failures > 0) {
  console.error(`\n${failures} case(s) failed.`)
  process.exit(1)
} else {
  console.log('\nAll formSource cases behave as expected.')
}
