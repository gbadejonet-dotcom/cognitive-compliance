import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  GitBranch,
  ClipboardCheck,
  FileSearch,
  Brain,
  CheckCircle2,
  Users,
  Building2,
  Landmark,
  Coins,
  Globe,
  Lock,
  Eye,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Container } from '@/components/shared/Container'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { getAllContent } from '@/lib/mdx'
import { formatDate, SITE_URL } from '@/lib/utils'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'AI Agents for KYC Compliance',
  description:
    'Cognitive Compliance designs and deploys AI agents that support CDD, EDD, and KYC remediation workflows — with audit trails, human oversight, and governance built in from day one.',
  path: '/',
})

const agents = [
  {
    icon: Brain,
    name: 'Risk Interpreter Agent',
    description:
      'Transforms customer data and internal policy into consistent, explainable risk rationale. Supports analysts in producing defensible ratings — every time.',
    href: '/solutions#risk-interpreter',
  },
  {
    icon: ClipboardCheck,
    name: 'Remediation Workbench',
    description:
      'Queue management, evidence checklisting, and QA scoring for remediation programmes. Reduces inconsistency and supports traceable defect root-cause analysis.',
    href: '/solutions#remediation-workbench',
  },
  {
    icon: GitBranch,
    name: 'Ownership Mapper',
    description:
      'Accelerates UBO identification across multi-layer, multi-jurisdiction structures. Generates analyst-ready ownership maps with documented uncertainty flags.',
    href: '/solutions#ownership-mapper',
  },
  {
    icon: FileSearch,
    name: 'PEP / Sanctions Triage Assistant',
    description:
      'Supports analysts reviewing PEP and sanctions alerts. Produces research summaries and escalation-ready notes — analyst always decides, always.',
    href: '/solutions#pep-sanctions',
  },
]

const industries = [
  { icon: Landmark, label: 'Banks & Building Societies' },
  { icon: Coins, label: 'Fintechs & Payments' },
  { icon: Building2, label: 'Wealth & Asset Managers' },
  { icon: Globe, label: 'Trust & Corporate Service Providers' },
  { icon: ShieldCheck, label: 'Crypto Asset Businesses' },
  { icon: Users, label: 'Compliance Consultancies' },
]

const governancePillars = [
  {
    icon: Eye,
    title: 'Human-in-the-loop by design',
    body: 'Every agent output is a support to analysts — not a replacement. Decision authority remains with your team. We design workflows where escalation and override are built-in, not bolted on.',
  },
  {
    icon: ClipboardCheck,
    title: 'Audit-ready outputs',
    body: 'Every step is logged, timestamped, and traceable. Your QA team and regulators can follow the reasoning chain from data input to output — no black boxes.',
  },
  {
    icon: Lock,
    title: 'Model risk alignment',
    body: 'We document agent capabilities, limitations, and failure modes. Our governance packages align with SR 11-7 principles and FCA model risk expectations — giving your team the artefacts they need.',
  },
  {
    icon: AlertTriangle,
    title: 'Explicit limitations',
    body: 'We name what our agents cannot do. Uncertainty is surfaced, not suppressed. Where data quality or jurisdictional complexity limits confidence, agents say so — and flag for human review.',
  },
]

export default function HomePage() {
  let allInsights
  try {
    allInsights = getAllContent('insights')
  } catch {
    allInsights = []
  }
  const featuredInsights = allInsights.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 pb-24 pt-28 sm:pt-36 lg:pt-44">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="dark" className="mb-6">
              AI-native compliance consulting
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              KYC compliance that{' '}
              <span className="text-blue-400">reasons,</span>
              <br className="hidden sm:block" />
              not just rules.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Cognitive Compliance designs and deploys AI agents that support your team through CDD,
              EDD, and KYC remediation workflows — with audit trails, human oversight, and
              governance built in from day one.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="xl" variant="default">
                <Link href="/contact">
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-white">
                <Link href="/services">See our services</Link>
              </Button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {[
                  { value: 'End-to-end', label: 'KYC workflow coverage' },
                  { value: 'Full', label: 'Audit trail on every decision' },
                  { value: 'Human-first', label: 'Oversight architecture' },
                  { value: 'UK-aligned', label: 'Regulatory framing' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Proof / How we work ──────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title="Complexity without control is liability"
            description="Most KYC failures aren't data problems — they're reasoning problems. Inconsistent judgements, undocumented decisions, and unscalable processes. We build agents that address each one systematically."
          />

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Diagnose the workflow',
                body: 'We map your current KYC process — decision points, data flows, policy gaps — to identify where inconsistency and opacity create risk.',
              },
              {
                step: '02',
                title: 'Design the agent layer',
                body: 'Agents are designed to a specific scope, with explicit inputs, outputs, confidence signals, and escalation paths. No general-purpose AI deployed without controls.',
              },
              {
                step: '03',
                title: 'Deploy with governance',
                body: 'Every deployment includes operator documentation, QA sampling plans, model-risk artefacts, and a human-in-the-loop checkpoint architecture.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-black text-slate-100 select-none">{item.step}</div>
                <div className="-mt-4">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What we build ────────────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <SectionHeader
            eyebrow="Our agent solutions"
            title="What we build"
            description="Four production-grade agent solutions, each scoped to a specific KYC workflow challenge. Each includes controls documentation, human override paths, and QA frameworks."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => {
              const Icon = agent.icon
              return (
                <Card key={agent.name} className="flex flex-col">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4">{agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between">
                    <CardDescription>{agent.description}</CardDescription>
                    <Link
                      href={agent.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Industries ───────────────────────────────────────── */}
      <section className="bg-slate-900 py-24">
        <Container>
          <SectionHeader
            eyebrow="Who we serve"
            title="Built for regulated industries"
            description="Our solutions are designed around the regulatory frameworks, operating models, and data environments of firms subject to MLRO obligations, FCA/HMRC supervision, or equivalent regimes."
            dark
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <div
                  key={industry.label}
                  className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-5 text-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-6 w-6 text-blue-400" aria-hidden="true" />
                  <span className="mt-3 text-xs font-medium leading-snug text-slate-300">
                    {industry.label}
                  </span>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Governance by design ─────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <SectionHeader
              align="left"
              eyebrow="Governance by design"
              title="Controls first. Capability second."
              description="Every agent we deploy is accompanied by governance artefacts. We don't treat oversight as an afterthought — it's part of the delivery definition from day one."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {governancePillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{pillar.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Insights preview ─────────────────────────────────── */}
      {featuredInsights.length > 0 && (
        <section className="bg-slate-50 py-24">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <SectionHeader
                align="left"
                eyebrow="Insights"
                title="Perspectives on compliance transformation"
                className="max-w-xl"
              />
              <Button asChild variant="outline" size="default">
                <Link href="/insights">
                  All insights
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredInsights.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
                >
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="bg-blue-700 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your KYC operating model?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
              Book a 30-minute discovery call. No sales pitch — we'll listen first, then tell you
              honestly whether we can help.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="xl" variant="solid-white">
                <Link href="/contact">
                  Book a discovery call
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-white">
                <Link href="/services">Explore our services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
