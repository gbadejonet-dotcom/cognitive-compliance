import { test, expect } from '@playwright/test'

/**
 * Smoke tests — verify that all key pages load without errors
 * and contain expected content.
 *
 * Run with: npm run test:e2e
 * Requires a running Next.js server (or uses the webServer config in playwright.config.ts)
 */

const routes = [
  { path: '/', title: 'Cognitive Compliance', text: 'KYC compliance' },
  { path: '/services', title: 'Services', text: 'KYC / CDD / EDD' },
  { path: '/solutions', title: 'Solutions', text: 'Risk Interpreter' },
  { path: '/about', title: 'About', text: 'compliance systems' },
  { path: '/insights', title: 'Insights', text: 'Insights' },
  { path: '/case-studies', title: 'Case Studies', text: 'Case Studies' },
  { path: '/contact', title: 'Contact', text: 'discovery call' },
  { path: '/legal/privacy', title: 'Privacy', text: 'Privacy Policy' },
  { path: '/legal/terms', title: 'Terms', text: 'Terms of Use' },
  { path: '/legal/disclaimer', title: 'Disclaimer', text: 'Human review' },
]

for (const { path, title, text } of routes) {
  test(`Page: ${path}`, async ({ page }) => {
    const response = await page.goto(path)

    // Must return 200
    expect(response?.status()).toBe(200)

    // Title should contain expected text
    await expect(page).toHaveTitle(new RegExp(title, 'i'))

    // Body should contain expected text
    await expect(page.locator('body')).toContainText(text)

    // No unhandled JS errors (basic check via console)
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.waitForLoadState('networkidle')
    expect(errors).toHaveLength(0)
  })
}

test('Contact form renders required fields', async ({ page }) => {
  await page.goto('/contact')

  await expect(page.getByLabel('Full name')).toBeVisible()
  await expect(page.getByLabel('Email address')).toBeVisible()
  await expect(page.getByLabel('Company / organisation')).toBeVisible()
  await expect(page.getByLabel('Your role')).toBeVisible()
  await expect(page.getByLabel('How can we help?')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible()
})

test('Navigation links are present and keyboard accessible', async ({ page }) => {
  await page.goto('/')

  // Check main nav links
  for (const label of ['Services', 'Solutions', 'About', 'Insights']) {
    const link = page.getByRole('navigation').getByRole('link', { name: label }).first()
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href')
  }
})

test('Sitemap returns XML', async ({ page }) => {
  const response = await page.goto('/sitemap.xml')
  expect(response?.status()).toBe(200)
  const contentType = response?.headers()['content-type'] ?? ''
  expect(contentType).toContain('xml')
})

test('RSS feed returns XML', async ({ page }) => {
  const response = await page.goto('/api/rss')
  expect(response?.status()).toBe(200)
  const contentType = response?.headers()['content-type'] ?? ''
  expect(contentType).toContain('xml')
})
