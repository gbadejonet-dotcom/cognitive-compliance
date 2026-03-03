import { Mail, Clock, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { ContactForm } from '@/components/contact/ContactForm'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Cognitive Compliance. Book a discovery call or tell us about your KYC and financial crime compliance challenge.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-900 pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Badge variant="dark" className="mb-4">Get in touch</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Start with a conversation
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Tell us about your challenge. We'll respond honestly about whether and how we can help.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact body */}
      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">What to expect</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  We typically respond within 1–2 business days. Initial conversations are
                  30 minutes, no pitch — we'll listen, ask questions, and tell you
                  honestly whether there's a fit.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: 'Response time',
                    body: '1–2 business days',
                  },
                  {
                    icon: MessageSquare,
                    title: 'Discovery call',
                    body: '30 minutes — focused on your challenge',
                  },
                  {
                    icon: Mail,
                    title: 'Direct email',
                    body: (
                      <a
                        href="mailto:hello@cognitivecompliance.co.uk"
                        className="text-blue-700 hover:text-blue-800"
                      >
                        hello@cognitivecompliance.co.uk
                      </a>
                    ),
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-sm text-slate-700">{item.body}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Typical enquiries */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Typical enquiries</h3>
                <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-600">
                  {[
                    'KYC remediation programme design',
                    'CDD/EDD automation scoping',
                    'AI governance review for existing tools',
                    'Ownership and control analysis support',
                    'QA framework implementation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
