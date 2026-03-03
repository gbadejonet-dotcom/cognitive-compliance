import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'End-to-end KYC and financial crime compliance services: CDD/EDD automation, remediation QA, ownership and control analysis, TM decision support, and AI governance.',
  path: '/services',
})

const services = [
  {
    id: 'kyc-automation',
    badge: 'Core service',
    title: 'KYC / CDD / EDD Automation',
    tagline: 'Agentic workflows that bring consistency and speed to customer due diligence.',
    description:
      "CDD and EDD processes fail when they depend on individual analyst judgement without structure. We design and implement AI-assisted workflows that guide analysts through the process — surfacing relevant risk signals, pre-populating risk ratings from structured data, and ensuring no mandatory step is missed. The result is faster onboarding and periodic review with a full, defensible audit trail.",
    useCases: [
      'New customer onboarding queue management',
      'EDD trigger identification and routing',
      'Document completeness and quality checks',
      'Risk rating pre-population from structured inputs',
      'Periodic review workflow automation',
    ],
    deliverables: [
      'Scoped agent pipeline design and implementation',
      'Integration documentation (data flow, API specs)',
      'QA and sampling framework',
      'Operator playbook and training materials',
      'Model risk documentation package',
    ],
    engagement: 'Fixed-scope diagnostic → design sprint → implementation → hypercare (4–12 weeks depending on scope).',
    success:
      'Reduced analyst time on routine CDD steps (illustrative: 20–40% reduction — actual outcomes depend on client environment). Improved consistency in EDD triage decisions. Full audit trail for every decision point.',
  },
  {
    id: 'remediation-qa',
    badge: 'Programme support',
    title: 'Remediation & Quality Assurance',
    tagline: 'Structure and governance for remediation programmes — from backlog to MI.',
    description:
      'Regulatory-driven remediation programmes often suffer from the same problems they're trying to fix: inconsistency, poor documentation, and inadequate quality assurance. We implement structured tooling that manages queues, standardises evidence checklisting, applies consistent QA scoring, and produces management information your second and third lines can rely on.',
    useCases: [
      'Periodic review backlogs and catch-up programmes',
      'Regulatory or s166-driven remediation',
      'File-level QA scoring and defect taxonomy',
      'Sampling frameworks for QA functions',
      'MI and reporting for ops and senior management',
    ],
    deliverables: [
      'Remediation queue management workflow',
      'QA sampling and scoring framework',
      'Defect taxonomy aligned to your policy',
      'Management information pack template',
      'Root cause analysis toolkit',
    ],
    engagement: 'Sprint-based delivery (2–4 week sprints); can be embedded within existing programmes or run standalone.',
    success:
      'Consistent QA outcomes across analyst cohorts. Reduction in re-work and escalation loops. Traceable defect root-cause analysis that feeds back into policy and training.',
  },
  {
    id: 'ownership-control',
    badge: 'Complex cases',
    title: 'Ownership & Control Analysis',
    tagline: 'Faster UBO identification across complex, multi-layer structures.',
    description:
      'Understanding beneficial ownership is one of the most resource-intensive steps in KYC — and one of the most error-prone. We use AI-assisted analysis to accelerate entity resolution and ownership structure mapping, reducing the time analysts spend on research while improving the quality of documented conclusions. All outputs are analyst-ready: clearly flagged with uncertainty, documented with sources, and ready for escalation where needed.',
    useCases: [
      'Multi-layer holding structures',
      'PEP-connected ownership chains',
      'High-risk jurisdiction analysis',
      'Complex trust and foundation arrangements',
      'Nominee and proxy indicator detection',
    ],
    deliverables: [
      'Ownership map outputs (structured + visual)',
      'Red-flag summary with supporting evidence',
      'Analyst-ready narrative documentation',
      'Uncertainty and data-gap flags',
      'Source referencing for all conclusions',
    ],
    engagement: 'Case-by-case engagement or pipeline integration. Initial scoping call to determine fit.',
    success:
      'Faster UBO identification with documented analytical reasoning (illustrative: 30–50% time reduction — varies by case complexity). Reduced analyst research burden. Consistent escalation standards.',
  },
  {
    id: 'tm-decision-support',
    badge: 'Decision support',
    title: 'Transaction Monitoring Decision Support',
    tagline: 'Supporting analyst decision-making — not replacing TM systems or setting thresholds.',
    description:
      "Important: this service does not replace transaction monitoring systems, configure alert thresholds, or produce Suspicious Activity Reports autonomously. It supports the analyst decision-making process by generating structured alert narratives, surfacing relevant customer context, and assisting in look-back scoping. All dispositions remain with your analysts. Controls are explicit.",
    useCases: [
      'Alert narrative generation for L1/L2 analysts',
      'Look-back scope support and data gathering',
      'SAR drafting assistance (analyst finalises and files)',
      'Escalation summarisation for senior review',
      'Case management workflow integration',
    ],
    deliverables: [
      'Decision support layer specification (not standalone system)',
      'Integration specification for existing TM platform',
      'Controls framework and human-override documentation',
      'Analyst guidance and operating procedures',
    ],
    engagement: 'Requires existing TM system. Advisory assessment first (2 weeks), followed by scoped implementation.',
    success:
      'More consistent alert narrative quality. Faster alert disposition with documented rationale. No bypass of existing controls — all enhancements work within your compliance framework.',
  },
  {
    id: 'ai-governance',
    badge: 'Governance',
    title: 'AI Governance for Financial Crime',
    tagline: 'The controls framework your AI deployments need — built for regulated environments.',
    description:
      "Deploying AI in financial crime contexts without a model risk and governance framework is itself a regulatory risk. We design, document, and implement AI governance programmes specifically calibrated to financial crime use cases — covering model risk alignment, testing frameworks, ongoing monitoring, and the artefacts you'll need for regulatory engagement.",
    useCases: [
      'Pre-deployment model risk review for existing AI tools',
      'Controls inventory and gap analysis',
      'Ongoing monitoring framework design',
      'Regulatory engagement preparation',
      'Third-party AI vendor due diligence support',
    ],
    deliverables: [
      'AI governance policy (financial crime-specific)',
      'Model risk documentation (capabilities, limitations, failure modes)',
      'Controls catalogue with ownership mapping',
      'Testing playbook (pre/post deployment)',
      'Regulatory engagement pack',
    ],
    engagement: 'Advisory plus embedded support. Engagements typically 4–8 weeks; ongoing retainer available.',
    success:
      "Clear documented ownership of AI outputs. Defined escalation and override paths. Model-risk aligned governance that satisfies internal audit and regulatory scrutiny. Your team understands what the AI can — and cannot — do.",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-900 pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="dark" className="mb-4">Services</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              From strategy to production deployment
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Five specialist services covering the full lifecycle of KYC and financial crime
              compliance transformation — from workflow design to ongoing AI governance.
            </p>
          </div>

          {/* Jump links */}
          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/20 hover:text-white transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Service detail sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={index % 2 === 0 ? 'bg-white py-24' : 'bg-slate-50 py-24'}
        >
          <Container>
            <div className="mx-auto max-w-4xl">
              <Badge variant="default" className="mb-3">{service.badge}</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {service.title}
              </h2>
              <p className="mt-2 text-lg font-medium text-blue-700">{service.tagline}</p>
              <p className="mt-6 text-base leading-relaxed text-slate-600">{service.description}</p>

              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {/* Use cases */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Typical use cases
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {service.useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Deliverables
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Engagement + success */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Engagement model
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.engagement}</p>
                  </div>
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-green-700">
                      What success looks like
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-green-800">{service.success}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-blue-700 py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Not sure which service fits?
            </h2>
            <p className="mt-3 text-blue-100">
              Book a discovery call and we'll map your challenge to the right scope of work.
            </p>
            <Button asChild size="lg" variant="solid-white" className="mt-8">
              <Link href="/contact">
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
