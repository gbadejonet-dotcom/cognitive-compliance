# Cognitive Compliance — Marketing Website

Production-ready Next.js 14 marketing website for Cognitive Compliance Limited.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui primitives · React Hook Form · Zod · Resend · MDX · Playwright

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values (see Environment Variables below)

# 3. Run development server
npm run dev
# → http://localhost:3000
```

---

## Project structure

```
cognitive-compliance-web/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout (fonts, metadata, analytics)
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles + Tailwind
│   ├── sitemap.ts             # Auto-generated sitemap
│   ├── robots.ts              # robots.txt
│   ├── actions/
│   │   └── contact.ts         # Server action: contact form submit
│   ├── api/
│   │   └── rss/route.ts       # RSS feed endpoint
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── services/page.tsx
│   ├── solutions/page.tsx
│   ├── insights/
│   │   ├── page.tsx           # Insights index
│   │   └── [slug]/page.tsx    # Individual insight post
│   ├── case-studies/
│   │   ├── page.tsx           # Case studies index
│   │   └── [slug]/page.tsx    # Individual case study
│   └── legal/
│       ├── privacy/page.tsx
│       ├── terms/page.tsx
│       └── disclaimer/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Sticky nav with mobile menu
│   │   └── Footer.tsx         # Site footer
│   ├── ui/                    # shadcn-style primitives
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── label.tsx
│   ├── shared/
│   │   ├── Container.tsx      # Max-width layout wrapper
│   │   └── SectionHeader.tsx  # Eyebrow + title + description
│   └── contact/
│       └── ContactForm.tsx    # Client-side form with useActionState
│
├── content/
│   ├── insights/              # MDX insight posts
│   │   ├── complexity-risk-signal.mdx
│   │   ├── human-in-the-loop.mdx
│   │   └── policy-to-rationale.mdx
│   └── case-studies/          # MDX case studies
│       ├── kyc-remediation-acceleration.mdx
│       └── ownership-mapping-multilayer.mdx
│
├── lib/
│   ├── mdx.ts                 # MDX file reading utilities
│   ├── email.ts               # Resend email helper (swappable)
│   ├── metadata.ts            # Per-page SEO metadata builder
│   └── utils.ts               # cn(), formatDate(), constants
│
├── tests/
│   └── smoke.spec.ts          # Playwright smoke tests
│
├── public/                    # Static assets
│   └── og-default.png         # ← Add your OG image here (1200×630)
│
├── .env.example               # Environment variable template
├── next.config.mjs
├── tailwind.config.ts
├── playwright.config.ts
└── tsconfig.json
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full site URL, no trailing slash |
| `RESEND_API_KEY` | For email | Your Resend API key |
| `CONTACT_TO_EMAIL` | For email | Where contact submissions are sent |
| `CONTACT_FROM_EMAIL` | For email | Sender address (must be verified in Resend) |
| `HEYGEN_API_KEY` | For video generation | HeyGen API key used only by server-side API routes |
| `HEYGEN_AVATAR_ID` | For video generation | HeyGen avatar ID for `/video-generator` |
| `HEYGEN_VOICE_ID` | For video generation | HeyGen voice ID for `/video-generator` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Enables Plausible analytics |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | Enables PostHog analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | PostHog host URL |

> **Without a `RESEND_API_KEY`** the contact form will log submissions to the console instead of sending an email. This is safe for development.

---

## Adding content

### New insight post

1. Create a new `.mdx` file in `content/insights/`:

```mdx
---
title: "Your post title"
description: "A concise description (used for SEO and cards)"
date: "2025-03-01"
tags: ["KYC", "AI governance"]
author: "Cognitive Compliance"
---

Your MDX content here...
```

2. The post will automatically appear on `/insights` and in the RSS feed.

**Available tags:** `KYC`, `EDD`, `AI governance`, `sanctions`, `operating model`

### New case study

1. Create a new `.mdx` file in `content/case-studies/`:

```mdx
---
title: "Case study title"
description: "Brief description"
date: "2025-03-01"
client: "Tier-1 bank (UK)"
sector: "Retail Banking"
outcome: "Key outcome summary (one sentence)"
tags: ["KYC"]
---

Your content here...
```

2. The study will appear automatically on `/case-studies`.

---

## Video production assets

Production-ready creative prompts and scripts for external video generation workflows live in `content/video/`. The current HeyGen-ready documentary package is `content/video/ownership-structures-documentary-heygen.md`.

---

## HeyGen video generator setup

The `/video-generator` page provides an internal production workflow for the ownership-structures documentary script stored at `content/video/ownership-structures-documentary-heygen.md`. It loads the Markdown script on the server, extracts the spoken narration into HeyGen scenes, and calls HeyGen through server-side API routes so the API key is never exposed to the browser.

### Required environment variables

Add these values to `.env.local` for local development and to your deployment provider for production:

```bash
HEYGEN_API_KEY=hg_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
HEYGEN_AVATAR_ID=your_heygen_avatar_id
HEYGEN_VOICE_ID=your_heygen_voice_id
```

Do **not** prefix these variables with `NEXT_PUBLIC_`. They are read only by the server routes at `/api/heygen/generate` and `/api/heygen/status`.

### Workflow

1. Start the app with `npm run dev`.
2. Open `http://localhost:3000/video-generator`.
3. Confirm the script preview and scene count.
4. Click **Generate in HeyGen**.
5. The app calls `POST https://api.heygen.com/v2/video/generate` from the server and saves the returned `video_id` in the browser for later status checks.
6. The page polls `/api/heygen/status`, which securely calls HeyGen's status endpoint, until HeyGen reports `completed`.
7. When ready, the final `video_url` is displayed on the page.

> Note: HeyGen plan limits, per-scene text limits, and rendering duration limits may affect whether a full 60-minute documentary can be generated in one request. The app splits the spoken script into multiple scenes and keeps API credentials server-side.

---

## Deployment (Vercel)

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Option B: Vercel Dashboard

1. Push to GitHub (create a new repo)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables in the Vercel dashboard (Settings → Environment Variables)
5. Deploy

### Environment variables on Vercel

Add all variables from `.env.example` in Vercel dashboard → Settings → Environment Variables. Set scope to **Production** (and **Preview** if desired).

---

## Email setup (Resend)

1. Create account at [resend.com](https://resend.com)
2. Add and verify your sending domain (e.g., `cognitivecompliance.co.uk`)
3. Create an API key with **Send** permission
4. Set `RESEND_API_KEY` in your environment
5. Set `CONTACT_FROM_EMAIL` to an address at your verified domain
6. Set `CONTACT_TO_EMAIL` to where you want to receive enquiries

> To swap email providers, edit `lib/email.ts` — the interface is simple: one `sendContactEmail` function that takes a `ContactPayload`.

---

## Analytics setup

**Plausible (recommended — no cookies):**
1. Create account at [plausible.io](https://plausible.io)
2. Add your domain
3. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.co.uk`

**PostHog:**
1. Create account at [posthog.com](https://posthog.com)
2. Get your project API key
3. Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`

---

## Running tests

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Run smoke tests (builds + starts server automatically)
npm run test:e2e

# Run against already-running dev server
PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test --no-server
```

---

## Customisation checklist

Before going live:

- [ ] Replace placeholder founder section in `/app/about/page.tsx` with real content
- [ ] Add `public/og-default.png` (1200×630px OG image)
- [ ] Update `SITE_URL` in `.env.local` / Vercel
- [ ] Verify `CONTACT_FROM_EMAIL` domain in Resend
- [ ] Set company registration number in `Footer.tsx`
- [ ] Review and update `Privacy Policy` dates and contact details
- [ ] Configure analytics (Plausible or PostHog)
- [ ] Run Playwright smoke tests against staging before production

---

## Development commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run format     # Prettier
npm run test:e2e   # Playwright tests
```

---

## Key design decisions

- **Server Components by default** — pages fetch MDX content at request time with no client-side JS overhead
- **Server Actions for the contact form** — no separate API route; form submission handled directly
- **MDX via `next-mdx-remote/rsc`** — RSC-compatible, no webpack plugin needed
- **No hard analytics dependency** — analytics only loads when env vars are set
- **Email stub mode** — contact form works in development without Resend credentials
- **Anti-spam** — honeypot field in contact form; no external CAPTCHA dependency

---

*Cognitive Compliance Limited · cognitivecompliance.co.uk*
