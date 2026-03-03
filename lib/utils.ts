import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cognitivecompliance.co.uk'

export const SITE_NAME = 'Cognitive Compliance Limited'

export const SITE_DESCRIPTION =
  'AI agents that make KYC faster, safer, and auditable. Cognitive Compliance designs and deploys intelligent compliance automation for financial institutions — with governance, human oversight, and auditability at the core.'
