import Link from 'next/link'
import { ArrowRight, Brain, ShieldCheck, FileCheck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'About Us',
  description:
    'Cognitive Compliance: our mission, philosophy, and why we believe compliance systems should reason — not just react.',
  path: '/about',
})

const pillars = [
  {
    icon: Brain,
    title: 'Reason, not just rules',
    body: "Rules are necessary — but they're not sufficient. Compliance decisions require contextual reasoning: weighing evidence, applying judgement, and documenting why. We build agents that do this systematically, so every decision can be explained and defended.",
  },
  {
    icon: FileCheck,
    title: 'Auditability is non-negotiable',
    body: "If you can't trace why a decision was made, you can't defend it to a regulator, an auditor, or a court. Every agent we deploy produces outputs with full reasoning chains. Audit-ready isn't a feature — it's the baseline.",
  },
  {
    icon: ShieldCheck,
    title: 'Honest about limitations',
    body: "We name what our agents cannot do before we tell you what they can. Uncertainty is surfaced, not suppressed. We document failure modes, data dependencies, and edge cases — because hiding limitations creates liability.",
  },
  {
    icon: Users,
    title: 'People are part of the system',
    body: 'Human-in-the-loop is not a compliance checkbox. It is a design requirement. Escalation paths, override rights, and decision authority must be built into the workflow — not added as an afterthought once the AI is already running.',
  },
]

const whyCognitive = [
  {
    question: 'Why "Cognitive"?',
    answer:
      '"Cognitive" refers to the quality of the reasoning, not the novelty of the technology. A cognitive compliance system reasons from evidence and policy to defensible conclusions — consistently, traceably, at scale. The opposite of cognitive compliance is reflexive compliance: applying rules without reasoning, producing outputs nobody can explain.',
  },
  {
    question: 'Why "Compliance"?',
    answer:
      'We are squarely in the compliance domain. Not general-purpose AI. Not enterprise automation broadly. Financial crime compliance — KYC, AML, EDD — is where the regulatory stakes are highest, the reasoning requirements are most demanding, and the existing tooling is most inadequate. That is where we focus.',
  },
  {
    question: 'Why now?',
    answer:
      "Large language models and structured AI agents have reached a capability threshold where they can genuinely support complex, policy-driven reasoning tasks. But most financial institutions don't have the in-house expertise to deploy these safely in a regulated context. We bridge that gap — with domain knowledge, governance experience, and production engineering capability.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 pb-24 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="dark" className="mb-4">About us</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              We believe compliance systems should reason — not just react.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Cognitive Compliance is a specialist consulting firm. We design and implement AI agents
              for financial crime compliance — built for governance, auditability, and the regulatory
              environments our clients operate in.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Badge variant="default" className="mb-4">Our mission</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Make KYC compliance faster, safer, and explainable — without compromising controls.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                Financial crime compliance is under pressure from every direction: rising customer
                volumes, expanding regulatory scope, shortage of skilled analysts, and increasing
                scrutiny of decision quality. Many firms respond by hiring more people or deploying
                more rules — neither of which solves the underlying problem.
              </p>
              <p>
                The underlying problem is <strong className="text-slate-900">reasoning at scale</strong>. KYC decisions are complex judgement calls: weighing
                multiple risk signals, applying policy consistently across thousands of cases,
                documenting conclusions in a way that can withstand scrutiny. This is exactly what
                well-designed AI agents can support — when built correctly.
              </p>
              <p>
                "Built correctly" means: scoped clearly, governed properly, operated transparently,
                and continuously monitored. It means human review is embedded in the workflow, not
                wrapped around it. It means every output can be traced back to its inputs and the
                policy it applied.
              </p>
              <p>
                That is what we build.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy pillars */}
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionHeader
            eyebrow="Our philosophy"
            title="Four principles we will not compromise on"
            description="These aren't values statements. They're operating constraints that shape how we design, deploy, and document every engagement."
          />

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{pillar.body}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Why Cognitive */}
      <section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              align="left"
              eyebrow="The name"
              title="Why Cognitive Compliance?"
            />

            <div className="mt-12 space-y-10">
              {whyCognitive.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Founder section — placeholder */}
      <section className="bg-slate-50 py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Badge variant="default" className="mb-4">The team</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Built by practitioners.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Cognitive Compliance was founded by practitioners with deep experience in financial
              crime compliance, KYC operations, and AI systems engineering. We have operated inside
              the institutions we now serve: we understand the regulatory constraints, the
              operational pressures, and the governance requirements from the inside.
            </p>

            {/* Founder placeholder — fill in details */}
            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-8">
              <div className="flex items-start gap-6">
                <div className="h-16 w-16 shrink-0 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xl font-bold">
                  {/* Replace with next/image when photo available */}
                  ?
                </div>
                <div>
                  <div className="text-base font-semibold text-slate-900">[Founder name]</div>
                  <div className="mt-1 text-sm text-blue-700">[Title / role]</div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    [Founder biography — describe background in financial crime compliance, relevant
                    experience, and specific expertise. Avoid regulatory approval claims or specific
                    outcome guarantees.]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Work with a team that takes governance seriously.
            </h2>
            <p className="mt-3 text-blue-100">
              Start with a conversation. No pitch, no pressure — just an honest assessment of
              whether we can help.
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
