import { Container } from '@/components/shared/Container'
import { buildMetadata } from '@/lib/metadata'
import { AlertTriangle } from 'lucide-react'

export const metadata = buildMetadata({
  title: 'Disclaimer',
  description: 'Important disclaimers regarding AI outputs, compliance, and professional advice.',
  path: '/legal/disclaimer',
})

export default function DisclaimerPage() {
  return (
    <section className="bg-white py-16 pt-24">
      <Container size="narrow">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600" aria-hidden="true" />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Disclaimer</h1>
        </div>
        <p className="mt-2 text-sm text-slate-500">Last updated: January 2025</p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-amber-900">
            Please read this disclaimer carefully. It applies to all content on this website and to
            all services and AI-assisted tools provided by Cognitive Compliance Limited.
          </p>
        </div>

        <div className="prose prose-slate mt-10 max-w-none">
          <h2>Not legal or regulatory advice</h2>
          <p>
            Nothing on this website, and nothing produced by Cognitive Compliance Limited or its AI
            agent solutions, constitutes legal advice, regulatory advice, or legal compliance
            determination. You must seek qualified legal and compliance counsel for decisions
            affecting your regulatory obligations.
          </p>

          <h2>Human review is required</h2>
          <p>
            All outputs produced by AI agents designed, built, or operated by Cognitive Compliance
            Limited require human review before being relied upon. AI outputs are inputs to human
            decision-making — they are not autonomous compliance determinations. No AI output should
            be treated as a final decision without qualified human review.
          </p>

          <h2>No guarantees</h2>
          <p>
            We make no guarantee — express or implied — that any tool, agent, workflow, or solution
            we provide will:
          </p>
          <ul>
            <li>Detect all instances of financial crime, money laundering, or sanctions violations</li>
            <li>Satisfy any specific regulatory requirement or standard</li>
            <li>Prevent regulatory enforcement action or fines</li>
            <li>Be free from errors, omissions, or inaccuracies</li>
            <li>Perform consistently across all data environments and jurisdictions</li>
          </ul>

          <h2>Models can err</h2>
          <p>
            AI and machine learning models, including large language models, can produce incorrect,
            incomplete, or misleading outputs. This is a known and documented characteristic of the
            technology. Our agents are designed with explicit uncertainty signals, escalation paths,
            and human override mechanisms — but no design eliminates the possibility of error.
          </p>

          <h2>Client remains responsible</h2>
          <p>
            The client organisation remains fully and solely responsible for its regulatory
            compliance obligations at all times, regardless of any AI tool, agent, or advisory
            service provided by Cognitive Compliance Limited. Use of our services does not transfer,
            reduce, or limit any compliance obligation that rests with the client.
          </p>

          <h2>Illustrative figures</h2>
          <p>
            Where this website or our materials reference performance indicators (e.g., processing
            time reductions, efficiency improvements) these figures are illustrative examples only.
            They do not represent guaranteed, typical, or average outcomes. Actual results depend
            entirely on the client&apos;s operating environment, data quality, team capability, and
            programme design.
          </p>

          <h2>Regulatory status</h2>
          <p>
            Cognitive Compliance Limited is a consulting firm. We are not regulated by the Financial
            Conduct Authority (FCA), the Prudential Regulation Authority (PRA), or any other
            financial services regulator as a principal firm. We provide consulting and technology
            services to regulated firms. We do not provide regulated financial services.
          </p>

          <h2>Third-party data and services</h2>
          <p>
            Some of our solutions may incorporate data from third-party sources (e.g., corporate
            registries, sanctions lists, open-source databases). We do not warrant the accuracy,
            completeness, or currency of any third-party data. Clients must maintain their own
            screening and data quality controls.
          </p>

          <h2>Jurisdictional limitations</h2>
          <p>
            Our solutions are designed primarily for use in UK-regulated environments. Application
            in other jurisdictions requires review against applicable local law and regulation. We do
            not represent that our tools meet the requirements of any specific non-UK jurisdiction.
          </p>
        </div>
      </Container>
    </section>
  )
}
