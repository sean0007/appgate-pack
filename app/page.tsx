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

const shareTitle = "Free App Store Guideline 4.2 checker for Capacitor and WebView apps";
const shareDescription =
  "Will Apple reject your Capacitor, Ionic, WebView, PWA, or Lovable / Bolt app under Guideline 4.2 (minimum functionality) or 4.3 (spam)? Paste your stack and three native features for a free HIGH / MED / LOW card with reasons and fixes. No login. Apple decides.";

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
    kicker: "01 · 30 seconds",
    title: "Free 4.2 / 4.3 precheck",
    body: "Paste your stack and three native features. Get a shareable HIGH / MED / LOW card with the reasons a reviewer would see.",
  },
  {
    href: "/free/4-2-capacitor",
    kicker: "02 · Printable",
    title: "Guideline 4.2 Capacitor checklist",
    body: "Evidence Apple can tap, what not to claim, and how to reply. Copy it or print it.",
  },
  {
    href: "https://free-agent-tools.vercel.app",
    kicker: "03 · For AI agents",
    title: "Free API and MCP tool",
    body: "GET /api/precheck returns the same card as JSON with no key. It is also a tool on the free Free Agent Tools MCP server.",
  },
];

const faqs = [
  {
    q: "Is there a free tool to check if my app will be rejected under Guideline 4.2?",
    a: "Yes. AppGate Pack's precheck is free with no login. Paste your app name, a one-line description, your stack (Capacitor, WebView, React Native, or PWA shell), and the three native features you would show a reviewer. It returns a HIGH, MED, or LOW card for Guideline 4.2 (minimum functionality), 4.3 (spam), and metadata, with the reasons. No tool can predict Apple's decision; this one flags the wrapper signs reviewers commonly cite.",
  },
  {
    q: "What is App Store Guideline 4.2 (Minimum Functionality)?",
    a: "Apple's guideline 4.2 says an app should include features, content, and UI that lift it beyond a repackaged website, and that apps which are not useful, unique, or app-like don't belong on the App Store. Guideline 4.2.2 adds that apps shouldn't mainly be marketing material, web clippings, content aggregators, or a collection of links.",
  },
  {
    q: "Will Apple reject a Capacitor or Ionic app?",
    a: "Not automatically. Capacitor and Ionic apps are approved all the time. The risk rises when the app looks like a website in a frame: browser-style navigation, nothing that works offline, a login wall with nothing native behind it, or listed features like a splash screen or pull to refresh that every app has.",
  },
  {
    q: "What native features help a WebView app pass Guideline 4.2?",
    a: "Features a reviewer can tap in the first minute and that serve the app's main job: push notifications they can trigger, offline or saved content, native tabs and navigation, the camera, share sheet, or haptics tied to a core task, and home-screen widgets. Splash screens, plugins, and \"we use Capacitor\" don't count as evidence.",
  },
  {
    q: "What's the difference between Guideline 4.2 and 4.3?",
    a: "4.2 is about minimum functionality: is this a real app or a website in a shell? 4.3 is about spam: many near-identical apps, template clones, or several bundle IDs for the same app. A wrapper app built from a template can trigger both.",
  },
  {
    q: "How should I reply in Resolution Center after a 4.2 rejection?",
    a: "If the binary hasn't changed, a better letter rarely wins. Add native features first, then resubmit and tell the reviewer exactly where to tap to find them, with screenshots or a short screen recording. The free Capacitor checklist on this site has an evidence list and a reply outline.",
  },
  {
    q: "Does it work for Lovable, Bolt, v0, Cursor, or PWA exports?",
    a: "Yes. Choose the closest stack (WebView or PWA shell for most exports) and list the three features you would show a reviewer. The precheck scores what a reviewer would see, not how the app was built.",
  },
  {
    q: "Is there an API or MCP server for AI agents?",
    a: "Yes. GET or POST https://appgate-pack.vercel.app/api/precheck with name, description, stack, and f1 to f3 returns the card as JSON, with no key. The same precheck is a tool on the free Free Agent Tools MCP server at https://free-agent-tools.vercel.app/mcp.",
  },
  {
    q: "Do you log into App Store Connect?",
    a: "No. We never ask for an Apple ID, 2FA codes, or API keys, and we never submit anything for you.",
  },
  {
    q: "Is this legal advice or an approval guarantee?",
    a: "No. It is an educational heuristic. Apple's App Review decides, and its guidelines change. Read the current App Store Review Guidelines before you resubmit.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AppGate Pack: free App Store Guideline 4.2 precheck",
  url: "https://appgate-pack.vercel.app/check",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any (web browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: shareDescription,
};

export default function HomePage() {
  const high = scorePrecheck(demoHigh);
  const shareHigh = `${siteUrl()}/check?${toCheckQuery(demoHigh)}`;

  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Free Guideline 4.2 / 4.3 checker · no login
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
              Will Apple reject your Capacitor app under Guideline 4.2?
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Paste your stack and the three native features you would show a
              reviewer. Get an instant HIGH / MED / LOW read on Guideline 4.2
              (minimum functionality), 4.3 (spam), and metadata, with what to
              fix before you resubmit. For Capacitor, Ionic, WebView, PWA, and
              Lovable / Bolt / v0 / Cursor exports.
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
        <h2 className="font-serif text-3xl tracking-tight">Start here</h2>
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
        <h2 className="font-serif text-3xl tracking-tight">Reply templates and a sample pack</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Free to read: reply templates by guideline (4.2, 4.3, metadata) and
          a redacted example of a full rejection-response pack. Nothing here is
          for sale yet.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/kit" className="text-accent underline">
            Browse reply templates
          </Link>
          <Link href="/sample" className="text-accent underline">
            Redacted sample pack
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="font-serif text-3xl tracking-tight">
          Guideline 4.2 questions people ask
        </h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group py-4" open>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
