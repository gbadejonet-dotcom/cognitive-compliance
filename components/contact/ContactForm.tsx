'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'
import { cn } from '@/lib/utils'

const BUDGET_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'under-10k', label: 'Under £10,000' },
  { value: '10k-50k', label: '£10,000 – £50,000' },
  { value: '50k-100k', label: '£50,000 – £100,000' },
  { value: 'over-100k', label: 'Over £100,000' },
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        'Send message'
      )}
    </Button>
  )
}

interface FieldProps {
  label: string
  id: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

function Field({ label, id, error, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const initialState: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, action] = useFormState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold text-slate-900">Message sent</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          {state.message ??
            "Thank you for getting in touch. We'll respond within 1–2 business days."}
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-6" noValidate aria-label="Contact form">
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
        <label htmlFor="_honey">Leave this field empty</label>
        <input
          type="text"
          id="_honey"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Error banner */}
      {state.status === 'error' && state.message && !state.fieldErrors && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm text-red-700">{state.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          id="name"
          error={state.fieldErrors?.name}
          required
        >
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-describedby={state.fieldErrors?.name ? 'name-error' : undefined}
            className={cn(state.fieldErrors?.name && 'border-red-400 focus-visible:ring-red-400')}
          />
        </Field>

        <Field
          label="Email address"
          id="email"
          error={state.fieldErrors?.email}
          required
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
            className={cn(state.fieldErrors?.email && 'border-red-400 focus-visible:ring-red-400')}
          />
        </Field>

        <Field
          label="Company / organisation"
          id="company"
          error={state.fieldErrors?.company}
          required
        >
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            aria-required="true"
            aria-describedby={state.fieldErrors?.company ? 'company-error' : undefined}
            className={cn(state.fieldErrors?.company && 'border-red-400 focus-visible:ring-red-400')}
          />
        </Field>

        <Field
          label="Your role"
          id="role"
          error={state.fieldErrors?.role}
          required
        >
          <Input
            id="role"
            name="role"
            type="text"
            placeholder="e.g. Head of Financial Crime"
            aria-required="true"
            aria-describedby={state.fieldErrors?.role ? 'role-error' : undefined}
            className={cn(state.fieldErrors?.role && 'border-red-400 focus-visible:ring-red-400')}
          />
        </Field>
      </div>

      <Field label="How can we help?" id="message" error={state.fieldErrors?.message} required>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe the challenge you're facing or the outcome you're looking for."
          aria-required="true"
          aria-describedby={state.fieldErrors?.message ? 'message-error' : undefined}
          className={cn(state.fieldErrors?.message && 'border-red-400 focus-visible:ring-red-400')}
        />
      </Field>

      <Field label="Approximate budget range (optional)" id="budget" error={state.fieldErrors?.budget}>
        <select
          id="budget"
          name="budget"
          className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
        >
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          By submitting, you agree to our{' '}
          <a href="/legal/privacy" className="underline hover:text-slate-700">
            privacy policy
          </a>
          . We will never share your information.
        </p>
        <SubmitButton />
      </div>
    </form>
  )
}
