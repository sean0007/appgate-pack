# AppGate Pack

Overnight **App Store rejection evidence + Resolution Center reply packs** for vibe-coded, Capacitor, and WebView apps hitting Guidelines **4.2**, **4.3**, and metadata.

Packets, checklists, and draft replies only. **Not legal advice. No approval guarantee. We never log into App Store Connect.**

## Pages

| Path | What it is |
|------|------------|
| `/` | Landing, ICP, pricing ($39 Kit / $149 Overnight), FAQ, disclaimer |
| `/kit` | Self-serve templates from `content/kit/` (markdown + PDF-style view) |
| `/overnight` | Intake form → JSON under `data/submissions/` (or email webhook) |
| `/sample` | Redacted pack preview (`content/sample/redacted-pack.md`) |
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

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Recommended in production | Canonical site URL for metadata (e.g. `https://your-domain.vercel.app`) |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_KIT` | For Kit checkout | Stripe Payment Link URL for the $39 Kit |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_OVERNIGHT` | For Overnight checkout | Stripe Payment Link URL for the $149 Overnight Pack |
| `SUBMISSION_WEBHOOK_URL` | Optional | If set, overnight intake POSTs JSON here (email provider, Zapier, Make, etc.) |

When a Payment Link env is **unset**, CTAs show: **Checkout coming soon — leave email on overnight form.** Overnight submit still stores the intake and shows that message plus a pay placeholder.

Create Payment Links in [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links). This repo does not use a Stripe SDK and does not mention other storefronts.

Overnight JSON is written to `data/submissions/` when the filesystem allows it, otherwise `/tmp/appgate-submissions`. On Vercel that write is ephemeral; set `SUBMISSION_WEBHOOK_URL` for durable email delivery.

## Deploy to Vercel (Hobby) from GitHub

1. Push this repo to GitHub: `https://github.com/sean0007/appgate-pack`.
2. In Vercel: **Add New… → Project → Import** that GitHub repository (Hobby is enough).
3. Framework preset: **Next.js**. Build command `npm run build`, output detected automatically.
4. Set environment variables (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-project>.vercel.app` (or your domain)
   - `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_KIT`
   - `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_OVERNIGHT`
   - `SUBMISSION_WEBHOOK_URL` (optional, recommended so intake survives serverless)
5. Deploy. Confirm `/`, `/kit`, `/overnight`, `/sample`, and `/legal/disclaimer`.

No App Store Connect OAuth, no Apple keys, no customer Apple ID.

## Kit content

Editable markdown (rendered on `/kit`, downloadable as `.md`):

- `content/kit/4.2-capacitor-checklist.md`
- `content/kit/4.3-spam-clone-reply.md`
- `content/kit/metadata-reply.md`
- `content/kit/privacy-reply.md`
- `content/kit/resolution-center-skeletons.md`
- `content/kit/evidence-checklists.md`

Sample output: `content/sample/redacted-pack.md`.
