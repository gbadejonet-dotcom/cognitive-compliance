import { Container } from '@/components/shared/Container'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for the Cognitive Compliance website.',
  path: '/legal/terms',
})

export default function TermsPage() {
  return (
    <section className="bg-white py-16 pt-24">
      <Container size="narrow">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Terms of Use</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: January 2025</p>

        <div className="prose prose-slate mt-10 max-w-none">
          <p>
            These Terms of Use govern your access to and use of the Cognitive Compliance Limited
            website at cognitivecompliance.co.uk. By accessing this website, you agree to these
            terms.
          </p>

          <h2>1. Website use</h2>
          <p>
            This website is provided for informational purposes only. The content describes the
            services and solutions offered by Cognitive Compliance Limited. Nothing on this website
            constitutes a contractual offer, legal advice, regulatory guidance, or compliance
            determination.
          </p>

          <h2>2. Intellectual property</h2>
          <p>
            All content on this website — including text, design, code, graphics, and insights
            articles — is the intellectual property of Cognitive Compliance Limited or its licensors,
            unless otherwise stated. You may not reproduce, distribute, or adapt our content without
            prior written permission.
          </p>

          <h2>3. Accuracy of information</h2>
          <p>
            We take reasonable care to ensure the accuracy of information on this website. However,
            we make no warranties (express or implied) about completeness, accuracy, or fitness for
            purpose. Regulatory requirements, legislation, and guidance change; information on this
            website may not reflect the most current position. You should seek appropriate
            professional advice before acting on anything you read here.
          </p>

          <h2>4. External links</h2>
          <p>
            This website may contain links to third-party websites. We are not responsible for the
            content or privacy practices of those sites. The inclusion of a link does not constitute
            an endorsement.
          </p>

          <h2>5. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Cognitive Compliance Limited shall not be liable
            for any loss or damage (including indirect, consequential, or loss of profit) arising
            from your use of, or inability to use, this website or its content.
          </p>

          <h2>6. AI content disclaimer</h2>
          <p>
            Some content on this website relates to AI-assisted compliance tools and processes. Such
            content is informational only. AI tools described on this site support human analysts and
            do not constitute regulatory determinations, legal advice, or compliance guarantees. The
            client organisation remains responsible for its regulatory obligations at all times.
          </p>

          <h2>7. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes shall be subject
            to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <h2>8. Changes</h2>
          <p>
            We may update these terms at any time. Continued use of the website after changes
            constitutes acceptance of the revised terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms:{' '}
            <a href="mailto:hello@cognitivecompliance.co.uk">hello@cognitivecompliance.co.uk</a>
          </p>
        </div>
      </Container>
    </section>
  )
}
