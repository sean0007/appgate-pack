import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerCallout } from "@/components/disclaimer-callout";
import { ResultCard } from "@/components/result-card";
import {
  demoHigh,
  demoLow,
  scorePrecheck,
  toCheckQuery,
} from "@/lib/precheck";
import { siteUrl } from "@/lib/site";

const shareTitle = "Will Apple bounce your Capacitor app?";
const shareDescription =
  "Free App Store wrapper precheck. Paste a stack and three native features and get a shareable HIGH / MED / LOW card for Guidelines 4.2, 4.3, and metadata. No login. No payment. Not legal advice — Apple decides.";

export const metadata: Metadata = {
  title: { absolute: `${shareTitle} · AppGate Pack` },
  description: shareDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
};

const magnets = [
  {
    href: "/check",
    kicker: "01 · Viral",
    title: "Free wrapper precheck",
    body: "Paste stack + three “native” features. Get a HIGH / MED / LOW card people actually screenshot.",
  },
  {
    href: "/free/4-2-capacitor",
    kicker: "02 · SEO + share",
    title: "4.2 Capacitor checklist",
    body: "The one freebie: evidence Apple can tap, what not to claim, copy/print in one pass.",
  },
  {
    href: "/digest",
    kicker: "03 · Habit",
    title: "Weekly rejection patterns",
    body: "Free digest stub. Email in, patterns out. Sponsor tile is still “Your ad here.”",
  },
];

const faqs = [
  {
    q: "Is the precheck a prediction of approval?",
    a: "No. It is a heuristic for 4.2 / 4.3 / metadata wrapper tells. Apple decides. No login, no payment, no guarantee.",
  },
  {
    q: "Do you log into App Store Connect?",
    a: "No. We never request Apple ID, 2FA, or API keys.",
  },
  {
    q: "Where is pricing?",
    a: "Muted on purpose. Kit and Overnight packs may come later. The point this week is something people click and share.",
  },
  {
    q: "Is this legal advice?",
    a: "No. Checklists and drafts are not legal advice and not a substitute for Apple’s guidelines.",
  },
];

export default function HomePage() {
  const high = scorePrecheck(demoHigh);
  const shareHigh = `${siteUrl()}/check?${toCheckQuery(demoHigh)}`;

  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Free precheck · no login
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
              Will Apple bounce your Capacitor app?
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Instant wrapper risk for vibe-coded, WebView, and PWA shells
              hitting Guidelines 4.2 / 4.3 / metadata. The card is the product.
              Packets exist in the background. Checkout can wait.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/check"
                className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:bg-accent/90"
              >
                Run the free precheck
              </Link>
              <Link
                href="/free/4-2-capacitor"
                className="inline-flex items-center justify-center rounded-md border border-line bg-card px-4 py-2.5 text-sm font-medium text-ink hover:bg-paper"
              >
                Free 4.2 checklist
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted">
              Not legal advice. Not a review prediction. You keep App Store
              Connect.
            </p>
          </div>
          <div>
            <ResultCard input={demoHigh} result={high} shareUrl={shareHigh} />
            <p className="mt-3 text-center text-xs text-muted">
              Sample HIGH —{" "}
              <Link href={`/check?${toCheckQuery(demoHigh)}#result`} className="underline">
                open this result
              </Link>
              {" · "}
              <Link href={`/check?${toCheckQuery(demoLow)}#result`} className="underline">
                see a LOW
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl tracking-tight">Click these first</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {magnets.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-line bg-card p-5 hover:border-accent/40"
            >
              <p className="font-mono text-xs text-accent">{item.kicker}</p>
              <h3 className="mt-2 font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-card/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-serif text-3xl tracking-tight">Who this is for</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Solo founders who shipped a Capacitor / PWA / RN WebView / Lovable–
            Bolt–Cursor export. Repeat micro-app shippers. Not enterprise review
            counsel. Not Play Console. Not anyone who wants us to log into App
            Store Connect.
          </p>
        </div>
      </section>

      <section id="later" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-serif text-3xl tracking-tight">Packs — coming later</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Kit templates and Overnight reply packs are in the repo if you want
          them. Pricing is not the point yet. Stripe Payment Links stay optional
          stubs.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/kit" className="text-accent underline">
            Browse kit templates
          </Link>
          <Link href="/sample" className="text-accent underline">
            Redacted sample pack
          </Link>
          <Link href="/overnight" className="text-accent underline">
            Overnight intake (optional)
          </Link>
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
