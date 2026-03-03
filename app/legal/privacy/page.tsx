import { Container } from '@/components/shared/Container'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Cognitive Compliance collects, uses, and protects your personal information.',
  path: '/legal/privacy',
})

export default function PrivacyPage() {
  return (
    <section className="bg-white py-16 pt-24">
      <Container size="narrow">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: January 2025</p>

        <div className="prose prose-slate mt-10 max-w-none">
          <h2>1. Who we are</h2>
          <p>
            Cognitive Compliance Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
            is a company registered in England and Wales. We operate this website at
            cognitivecompliance.co.uk and provide AI-assisted compliance consulting services to
            financial institutions.
          </p>
          <p>
            For questions about this policy, contact us at:{' '}
            <a href="mailto:hello@cognitivecompliance.co.uk">hello@cognitivecompliance.co.uk</a>
          </p>

          <h2>2. What information we collect</h2>
          <h3>Information you provide directly</h3>
          <ul>
            <li>
              <strong>Contact form:</strong> name, email address, company name, role, message content,
              and optional budget range.
            </li>
            <li>
              <strong>Email correspondence:</strong> content of messages you send to our email
              addresses.
            </li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li>
              <strong>Analytics:</strong> if enabled, we use Plausible Analytics or PostHog to
              collect anonymised usage data (pages visited, referrer, browser type, country). These
              tools do not use cookies and do not collect personal identifiers. No data is sold or
              shared with advertising networks.
            </li>
            <li>
              <strong>Server logs:</strong> our hosting provider (Vercel) may log IP addresses and
              request metadata for security and performance purposes, in accordance with their own
              privacy policy.
            </li>
          </ul>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To respond to your enquiry or contact form submission</li>
            <li>To provide and improve our services</li>
            <li>To understand how visitors use our website (analytics)</li>
            <li>To comply with applicable legal and regulatory obligations</li>
          </ul>
          <p>
            We do not use your personal information for automated decision-making or profiling. We
            do not send marketing emails without your explicit consent.
          </p>

          <h2>4. Legal basis for processing (UK GDPR)</h2>
          <ul>
            <li>
              <strong>Legitimate interests:</strong> responding to enquiries, maintaining website
              security, anonymised analytics.
            </li>
            <li>
              <strong>Contract performance:</strong> providing services to clients who engage us.
            </li>
            <li>
              <strong>Legal obligation:</strong> compliance with applicable UK law.
            </li>
          </ul>

          <h2>5. How long we keep your data</h2>
          <ul>
            <li>Contact form submissions: up to 24 months, or until you ask us to delete them</li>
            <li>Client engagement records: in accordance with our statutory retention obligations</li>
            <li>Anonymised analytics data: aggregated data has no defined retention limit</li>
          </ul>

          <h2>6. Sharing your information</h2>
          <p>We do not sell, rent, or trade your personal information. We may share data with:</p>
          <ul>
            <li>
              <strong>Resend</strong> (email delivery): to send and receive emails. Their privacy
              policy applies.
            </li>
            <li>
              <strong>Vercel</strong> (website hosting): our hosting provider. Their privacy policy
              applies.
            </li>
            <li>
              <strong>Law enforcement or regulators:</strong> where required by law or court order.
            </li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            This website does not use advertising or tracking cookies. If analytics is enabled,
            Plausible Analytics operates without cookies entirely. PostHog may use a single
            first-party cookie for session identification only. You can disable this in your browser
            settings.
          </p>

          <h2>8. Your rights (UK GDPR)</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal retention obligations)</li>
            <li>Object to processing based on legitimate interests</li>
            <li>Request restriction of processing</li>
            <li>Lodge a complaint with the ICO (ico.org.uk)</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href="mailto:hello@cognitivecompliance.co.uk">hello@cognitivecompliance.co.uk</a>.
          </p>

          <h2>9. Security</h2>
          <p>
            We implement reasonable technical and organisational measures to protect your personal
            data. However, no method of internet transmission is 100% secure.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be noted with an
            updated date at the top of this page.
          </p>
        </div>
      </Container>
    </section>
  )
}
