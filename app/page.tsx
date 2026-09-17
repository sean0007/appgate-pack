import Link from "next/link";
import { CheckoutCta } from "@/components/checkout-cta";
import { DisclaimerCallout } from "@/components/disclaimer-callout";
import { prices, stripeLink } from "@/lib/site";

const icp = [
  {
    title: "Solo founders after a wrapper bounce",
    body: "You shipped a Capacitor shell, PWA wrapper, React Native WebView, or a Lovable / Bolt / v0 / Cursor export and Review cited 4.2 or 4.3.",
  },
  {
    title: "Agencies who already pay for rescue",
    body: "You hire humans at $199+ to write the appeal. Overnight is the cheaper async packet: evidence, decision tree, paste-ready reply.",
  },
  {
    title: "Repeat micro-app shippers",
    body: "Same person, two to five iOS listings a year. Templates in the Kit; custom packs when the rejection text is messy.",
  },
];

const notIcp = [
  "Enterprise App Store teams with in-house review counsel",
  "Android-only / Play Console cases",
  "Anyone who wants us to log into App Store Connect",
];

const steps = [
  {
    n: "01",
    title: "Paste the rejection",
    body: "Overnight intake takes the Review message, listing URL, and optional guideline code. Kit buyers skip intake and download templates.",
  },
  {
    n: "02",
    title: "Get an evidence pack",
    body: "Guideline cite, fix-vs-appeal tree, native-feature screenshot checklist, Resolution Center draft, resubmit notes, and what not to claim.",
  },
  {
    n: "03",
    title: "You submit",
    body: "Paste into Resolution Center yourself. We never hold credentials and we never auto-post. Tokyo night → US morning on Overnight.",
  },
];

const faqs = [
  {
    q: "Do you log into App Store Connect?",
    a: "No. We never request Apple ID, 2FA, or API keys. You paste the draft reply in Resolution Center.",
  },
  {
    q: "Do you guarantee approval?",
    a: "No. Apple decides. The pack is an organizer and a draft. A wrapper with no native value still needs product work before resubmit.",
  },
  {
    q: "What is “US overnight”?",
    a: "Intake before evening US time is packed during the Tokyo night window, targeting delivery before the next US business morning (~12 hours).",
  },
  {
    q: "Kit vs Overnight?",
    a: `Kit ($${prices.kit}) is reusable markdown templates by guideline. Overnight ($${prices.overnight}) is a custom PDF-style + markdown pack from your rejection text.`,
  },
  {
    q: "Is this legal advice?",
    a: "No. Draft replies and checklists are not legal advice, not representation, and not a substitute for Apple’s guidelines or your own counsel.",
  },
  {
    q: "Which rejections do you cover?",
    a: "Guideline 4.2 Minimum Functionality (wrappers / WebView), 4.3 Spam (clone / template), metadata (2.3.x), and privacy label mismatches (5.1.1).",
  },
];

export default function HomePage() {
  const kitHref = stripeLink("kit");
  const overnightHref = stripeLink("overnight");

  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              US overnight Resolution Center pack
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
              Overnight App Store rejection evidence for vibe-coded and wrapper
              apps.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Capacitor, WebView, and “ship my Lovable–Bolt–Cursor app to iOS”
              builders hitting Guidelines 4.2, 4.3, or metadata. Packets and
              draft replies only — not a chatbot, not a login, not a guarantee
              of approval.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {kitHref ? (
                <a
                  href={kitHref}
                  className="inline-flex items-center justify-center rounded-md border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink hover:bg-paper"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Buy Kit · ${prices.kit}
                </a>
              ) : (
                <Link
                  href="/overnight"
                  className="inline-flex items-center justify-center rounded-md border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink hover:bg-paper"
                >
                  Checkout coming soon — leave email on overnight form.
                </Link>
              )}
              {overnightHref ? (
                <a
                  href={overnightHref}
                  className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:bg-accent/90"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Overnight Pack · ${prices.overnight}
                </a>
              ) : (
                <Link
                  href="/overnight"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:bg-accent/90"
                >
                  Start Overnight intake
                </Link>
              )}
            </div>
            <p className="mt-4 text-xs text-muted">
              You keep App Store Connect. We keep the packet.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="text-sm font-medium text-ink">What lands in the pack</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              <li>Guideline cite mapped to your rejection language</li>
              <li>Fix vs appeal decision tree (wrappers usually need a fix)</li>
              <li>Native-feature screenshot checklist — not “we use Capacitor”</li>
              <li>Paste-ready Resolution Center draft + “what not to claim”</li>
              <li>Optional Cursor prompt: implement these screens before resubmit</li>
            </ul>
            <Link
              href="/sample"
              className="mt-6 inline-block text-sm text-accent underline"
            >
              Read a redacted sample pack
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl tracking-tight">Who this is for</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {icp.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-line bg-card p-5"
            >
              <h3 className="font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Not for: {notIcp.join(" · ")}.
        </p>
      </section>

      <section className="border-y border-line bg-card/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-serif text-3xl tracking-tight">How overnight works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n}>
                <p className="font-mono text-xs text-accent">{step.n}</p>
                <h3 className="mt-2 font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl tracking-tight">Pricing</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Cheaper than a typical $199 human rescue, more “done-for-you packet”
          than a $29 guideline chatbot. Explicitly not a reinstatement
          guarantee.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-line bg-card p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              Self-serve
            </p>
            <h3 className="mt-2 font-serif text-2xl">AppGate Kit</h3>
            <p className="mt-1 font-serif text-4xl tracking-tight">${prices.kit}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
              <li>Templates for 4.2, 4.3, metadata, privacy</li>
              <li>Screenshot evidence checklists</li>
              <li>Six Resolution Center reply skeletons</li>
              <li>Pre-submit risk list + Cursor prompt</li>
            </ul>
            <div className="mt-6">
              <CheckoutCta sku="kit">Get the Kit · ${prices.kit}</CheckoutCta>
            </div>
            <Link href="/kit" className="mt-3 inline-block text-sm text-accent underline">
              Preview kit contents
            </Link>
          </article>
          <article className="rounded-xl border border-accent/30 bg-card p-6 shadow-[0_0_0_1px_rgba(27,74,67,0.12)]">
            <p className="text-xs uppercase tracking-[0.16em] text-accent">
              Custom packet
            </p>
            <h3 className="mt-2 font-serif text-2xl">AppGate Overnight Pack</h3>
            <p className="mt-1 font-serif text-4xl tracking-tight">
              ${prices.overnight}
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
              <li>Paste rejection + listing URL + notes</li>
              <li>Custom markdown / PDF-style pack within ~12h</li>
              <li>Guideline match, evidence list, paste-ready reply</li>
              <li>You resubmit. We do not touch App Store Connect.</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/overnight"
                className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:bg-accent/90"
              >
                Open overnight intake
              </Link>
              {!overnightHref ? (
                <p className="text-sm text-muted">
                  Checkout coming soon — leave email on overnight form.
                </p>
              ) : null}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="font-serif text-3xl tracking-tight">FAQ</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer list-none font-medium text-ink">
                {item.q}
              </summary>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <DisclaimerCallout />
      </section>
    </main>
  );
}
