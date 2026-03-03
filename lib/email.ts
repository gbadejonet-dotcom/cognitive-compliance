/**
 * Email utility — backed by Resend.
 * Swap the implementation here if you change email provider.
 * Requires: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL in .env.local
 */

export interface ContactPayload {
  name: string
  email: string
  company: string
  role: string
  message: string
  budget?: string
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@cognitivecompliance.co.uk'
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? 'no-reply@cognitivecompliance.co.uk'

  if (!apiKey) {
    // In development without a key, log and return gracefully
    console.log('[email] No RESEND_API_KEY set — logging payload instead:')
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const budgetLine = payload.budget ? `\nBudget range: ${payload.budget}` : ''

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: payload.email,
    subject: `New enquiry from ${payload.name} — ${payload.company}`,
    text: `
New enquiry via cognitivecompliance.co.uk

Name:    ${payload.name}
Email:   ${payload.email}
Company: ${payload.company}
Role:    ${payload.role}${budgetLine}

Message:
${payload.message}
    `.trim(),
  })

  // Confirmation to sender
  await resend.emails.send({
    from: fromEmail,
    to: payload.email,
    subject: 'We received your message — Cognitive Compliance',
    text: `
Hi ${payload.name},

Thank you for reaching out to Cognitive Compliance. We've received your message and will respond within 1–2 business days.

If your query is urgent, please email us directly at hello@cognitivecompliance.co.uk.

—
Cognitive Compliance Limited
cognitivecompliance.co.uk
    `.trim(),
  })
}
