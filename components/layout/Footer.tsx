import Link from 'next/link'
import { Shield } from 'lucide-react'

const footerNav = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Insights', href: '/insights' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'KYC / CDD / EDD Automation', href: '/services#kyc-automation' },
    { label: 'Remediation & QA', href: '/services#remediation-qa' },
    { label: 'Ownership & Control Analysis', href: '/services#ownership-control' },
    { label: 'TM Decision Support', href: '/services#tm-decision-support' },
    { label: 'AI Governance', href: '/services#ai-governance' },
  ],
  solutions: [
    { label: 'Risk Interpreter Agent', href: '/solutions#risk-interpreter' },
    { label: 'Remediation Workbench', href: '/solutions#remediation-workbench' },
    { label: 'Ownership Mapper', href: '/solutions#ownership-mapper' },
    { label: 'PEP/Sanctions Triage', href: '/solutions#pep-sanctions' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Use', href: '/legal/terms' },
    { label: 'Disclaimer', href: '/legal/disclaimer' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
                <Shield className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-base font-semibold text-white">Cognitive Compliance</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              AI agents that make KYC faster, safer, and auditable. Designed for financial
              institutions that take governance seriously.
            </p>
            <p className="text-xs text-slate-500">
              Cognitive Compliance Limited
              <br />
              Registered in England &amp; Wales
            </p>
          </div>

          {/* Nav columns */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNav.company.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Solutions</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNav.solutions.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Services</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNav.services.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNav.legal.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Cognitive Compliance Limited. All rights reserved.
          </p>
          <p className="mt-4 text-xs text-slate-500 sm:mt-0">
            AI outputs require human review. Nothing on this site constitutes legal or regulatory
            advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
