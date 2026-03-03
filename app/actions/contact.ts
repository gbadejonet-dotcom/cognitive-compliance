'use server'

import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  message: z.string().min(20, 'Please provide more detail (minimum 20 characters)'),
  budget: z.string().optional(),
  _honey: z.string().max(0, 'Bot detected'), // honeypot: must be empty
})

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    message: formData.get('message') as string,
    budget: (formData.get('budget') as string) || undefined,
    _honey: (formData.get('_honey') as string) ?? '',
  }

  // Honeypot check
  if (raw._honey && raw._honey.length > 0) {
    // Return success silently to not tip off bots
    return { status: 'success' }
  }

  const parsed = contactSchema.safeParse(raw)

  if (!parsed.success) {
    const fieldErrors: ContactFormState['fieldErrors'] = {}
    for (const [field, issues] of Object.entries(parsed.error.flatten().fieldErrors)) {
      const key = field as keyof typeof fieldErrors
      if (issues && issues.length > 0) {
        fieldErrors[key] = issues[0]
      }
    }
    return {
      status: 'error',
      message: 'Please correct the errors below.',
      fieldErrors,
    }
  }

  try {
    await sendContactEmail({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      role: parsed.data.role,
      message: parsed.data.message,
      budget: parsed.data.budget,
    })

    return {
      status: 'success',
      message:
        "Thank you for getting in touch. We'll respond within 1–2 business days.",
    }
  } catch (err) {
    console.error('[contact] Email send failed:', err)
    return {
      status: 'error',
      message:
        'Something went wrong sending your message. Please try emailing us directly at hello@cognitivecompliance.co.uk',
    }
  }
}
