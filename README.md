# AppGate Pack

**Live:** [https://appgate-pack.vercel.app](https://appgate-pack.vercel.app) — start at [/check](https://appgate-pack.vercel.app/check), the free wrapper scorecard.

Free **click magnets** for vibe-coded / Capacitor / WebView App Store rejections (Guidelines 4.2 / 4.3 / metadata). Packets exist; **click magnets first, Stripe optional.**

Not legal advice. No approval guarantee. We never log into App Store Connect.

## Pages

| Path | What it is |
|------|------------|
| `/` | Landing that leads with the free precheck |
| `/check` | Viral wrapper precheck — shareable HIGH / MED / LOW card, no login, no payment |
| `/free/4-2-capacitor` | Standalone printable Guideline 4.2 Capacitor evidence checklist |
| `/digest` | Stub: free weekly rejection-pattern signup + “Your ad here” sponsor slot |
| `/kit` | Self-serve templates from `content/kit/` |
| `/overnight` | Intake form (optional; checkout later) |
| `/sample` | Redacted pack preview |
| `/legal/disclaimer` | Short disclaimer |

## Run locally

Requires Node 20+.

```bash
git clone https://github.com/sean0007/appgate-pack.git
cd appgate-pack
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and hit `/check` first.

```bash
npm run build
npm start
```

## Environment variables

Click magnets work with **no env vars**. Stripe and ads are stubs.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical origin for `og:url`, canonical, and copied `/check` links. Defaults to `https://appgate-pack.vercel.app`. Localhost is ignored on Vercel. |
| `DIGEST_WEBHOOK_URL` | Optional | `https` endpoint for digest signups. If unset or not `https`, `POST /api/digest` returns 200 and stores nothing server-side. |
| `SUBMISSION_WEBHOOK_URL` | Optional | POST JSON for overnight intake |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_KIT` | Optional stub | Kit Payment Link if/when charging |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_OVERNIGHT` | Optional stub | Overnight Payment Link if/when charging |

When Payment Links are unset, paid CTAs stay “coming later.” Overnight intake still writes JSON under `data/submissions/` (or `/tmp` on serverless) and can forward to `SUBMISSION_WEBHOOK_URL`. Digest signups are not stored server-side unless `DIGEST_WEBHOOK_URL` is an `https` URL.

## Deploy to Vercel (Hobby) from GitHub

1. Import `https://github.com/sean0007/appgate-pack`.
2. Framework: **Next.js**. Build: `npm run build`.
3. Set `NEXT_PUBLIC_SITE_URL` to `https://appgate-pack.vercel.app` (or your domain). If unset, metadata uses that origin. Leave Stripe blank until you care about charging. Digest stays a local stub until `DIGEST_WEBHOOK_URL` is `https`.
4. Confirm `/`, `/check`, `/free/4-2-capacitor`, `/digest`.

## Kit content

- `content/kit/4.2-capacitor-checklist.md`
- `content/kit/4.3-spam-clone-reply.md`
- `content/kit/metadata-reply.md`
- `content/kit/privacy-reply.md`
- `content/kit/resolution-center-skeletons.md`
- `content/kit/evidence-checklists.md`

Sample output: `content/sample/redacted-pack.md`.
