import Link from 'next/link'
import {
  ArrowRight,
  AlertTriangle,
  Brain,
  ClipboardCheck,
  GitBranch,
  FileSearch,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Solutions',
  description:
    'Packaged AI agent solutions for KYC compliance: Risk Interpreter, Remediation Workbench, Ownership Mapper, and PEP/Sanctions Triage Assistant.',
  path: '/solutions',
})

const solutions = [
  {
    id: 'risk-interpreter',
    icon: Brain,
    name: 'Risk Interpreter Agent',
    tagline: 'Consistent, explainable risk rationale — from data and policy.',
    description:
      "Risk ratings lose their value when analysts can't explain them. The Risk Interpreter Agent takes structured customer data and your internal risk policy, and produces a consistent, documented rationale for each risk decision. Analysts review, adjust, and sign off — the agent provides a structured starting point, not a final answer.",
    capabilities: [
      'Policy-to-rationale mapping from structured inputs',
      'Multi-factor risk signal aggregation',
      'Uncertainty surfacing for data-quality issues',
      'Audit-ready output with full reasoning chain',
      'Override and adjustment logging',
    ],
    useCases: [
      'Risk rating justification for new customer onboarding',
      'Escalation memo drafting for EDD-triggered cases',
      'Periodic review risk re-assessment rationale',
    ],
    controls: [
      'Human sign-off required on every output — agent produces drafts, not decisions',
      'Outputs clearly labelled as AI-assisted and subject to analyst review',
      'Policy alignment maintained by client compliance team; agent does not interpret regulatory requirements',
      'Data quality flags surfaced explicitly; uncertain inputs do not produce confident outputs',
      'Full audit trail of agent version, inputs, outputs, and analyst actions',
    ],
  },
  {
    id: 'remediation-workbench',
    icon: ClipboardCheck,
    name: 'Remediation Workbench',
    tagline: 'Structure and traceability for remediation programmes at scale.',
    description:
      'Remediation programmes without structure produce more inconsistency. The Remediation Workbench imposes order: managed queues, standardised evidence checklists, consistent QA scoring, and MI that actually reflects what is happening in the backlog. Built for compliance teams running programmes under regulatory scrutiny.',
    capabilities: [
      'Queue management with priority scoring and assignment',
      'Evidence checklist engine (policy-configurable)',
      'QA sampling framework with statistical coverage',
      'Defect taxonomy aligned to client policy',
      'Management information pack (ops, QA, and ExCo views)',
    ],
    useCases: [
      'Periodic review backlog programmes',
      'Regulatory-driven s166 or remediation orders',
      'Onboarding quality control for new customer cohorts',
      'Ongoing QA monitoring for compliance functions',
    ],
    controls: [
      'QA scores are inputs to analyst and manager judgment — not autonomous disposition decisions',
      'Defect taxonomy must be calibrated and approved by client compliance team before deployment',
      'Sampling methodology documented and subject to QA function sign-off',
      'MI reflects what agents observed — interpretation remains with the compliance function',
      'No file is closed or escalated without human action',
    ],
  },
  {
    id: 'ownership-mapper',
    icon: GitBranch,
    name: 'Ownership Mapper',
    tagline: 'UBO identification across multi-layer, multi-jurisdiction structures.',
    description:
      'Beneficial ownership analysis is slow, error-prone, and difficult to document consistently. The Ownership Mapper accelerates entity resolution and structure mapping using AI-assisted analysis of corporate documentation and public registry data — producing analyst-ready outputs with all sources referenced and all uncertainty flags clearly surfaced.',
    capabilities: [
      'Multi-layer entity graph construction',
      'Cross-jurisdiction registry data aggregation',
      'PEP linkage and connected-party detection',
      'Red-flag pattern identification',
      'Structured output for analyst review and CMS upload',
    ],
    useCases: [
      'Complex holding structures at EDD level',
      'PEP-connected ownership chain analysis',
      'Trust and foundation arrangement mapping',
      'Sanctions screening for connected entities',
    ],
    controls: [
      'Relies on quality of input data — gaps in public registry data are surfaced, not silently filled',
      'Public registry accuracy is not guaranteed; human verification required for all material conclusions',
      'Red flags are indicators for analyst review — not determinative adverse findings',
      'UBO conclusions require analyst confirmation before inclusion in customer file',
      'Source citations included for every claim; unsupported assertions are flagged as uncertain',
    ],
  },
  {
    id: 'pep-sanctions',
    icon: FileSearch,
    name: 'PEP / Sanctions Triage Assistant',
    tagline: 'Research support for alert review — analyst always decides.',
    description:
      'PEP and sanctions alert volumes create a pressure to disposition cases quickly — sometimes at the expense of quality. The Triage Assistant supports analysts by generating structured research summaries: aggregated biographic data, role history, adverse media indicators, and screening match analysis. It never disposes an alert. That is always your analyst.',
    capabilities: [
      'Biographic research aggregation from multiple sources',
      'PEP role history and category classification',
      'Adverse media indicator surfacing',
      'Sanctions match analysis with confidence indicators',
      'Escalation-ready case summary generation',
    ],
    useCases: [
      'L1 / L2 alert disposition support',
      'False-positive triage and documentation',
      'Escalation preparation for senior review',
      'Periodic re-screening support for existing customers',
    ],
    controls: [
      'STRICT: This agent NEVER makes disposition decisions — it produces research summaries only',
      'Analyst always makes and documents the final disposition decision',
      'Outputs are explicitly labelled as AI-assisted research — not compliance determinations',
      'Confidence and match-quality indicators are displayed; low-confidence matches flagged for additional review',
      'Deployment subject to client existing compliance framework and screening programme governance',
      'Model limitations documented: agent does not have access to all global data sources; manual verification for high-risk cases required',
    ],
  },
]

export default function SolutionsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-900 pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="dark" className="mb-4">Agent solutions</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Purpose-built. Governance-first.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Four packaged agent solutions for the highest-value KYC workflow challenges. Each
              ships with controls documentation, human override paths, and explicit limitations.
            </p>
          </div>
        </Container>
      </section>

      {/* Solutions */}
      {solutions.map((solution, index) => {
        const Icon = solution.icon
        return (
          <section
            key={solution.id}
            id={solution.id}
            className={index % 2 === 0 ? 'bg-white py-24' : 'bg-slate-50 py-24'}
          >
            <Container>
              <div className="mx-auto max-w-4xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {solution.name}
                    </h2>
                    <p className="mt-1 text-base font-medium text-blue-700">{solution.tagline}</p>
                  </div>
                </div>

                <p className="mt-6 text-base leading-relaxed text-slate-600">
                  {solution.description}
                </p>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {/* Capabilities */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Capabilities
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {solution.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use cases */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Typical use cases
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {solution.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-2 text-sm text-slate-700">
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                          <span>{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Controls & Limitations panel */}
                <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-amber-900">
                      Controls &amp; Limitations
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-amber-800">
                    The following controls and limitations apply to this solution. They are
                    non-negotiable and form part of every deployment agreement.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {solution.controls.map((control) => (
                      <li
                        key={control}
                        className="flex items-start gap-2 text-xs leading-relaxed text-amber-800"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden="true" />
                        {control}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </section>
        )
      })}

      {/* CTA */}
      <section className="bg-blue-700 py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Want to see a solution in context?
            </h2>
            <p className="mt-3 text-blue-100">
              We'll walk you through how the solution would apply to your specific workflow.
            </p>
            <Button asChild size="lg" variant="solid-white" className="mt-8">
              <Link href="/contact">
                Book a call
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
