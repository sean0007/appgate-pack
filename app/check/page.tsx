import type { Metadata } from "next";
import Link from "next/link";
import { CheckForm } from "@/components/check-form";
import { DisclaimerCallout } from "@/components/disclaimer-callout";
import { ResultCard } from "@/components/result-card";
import {
  parseCheckInput,
  scorePrecheck,
  toCheckQuery,
} from "@/lib/precheck";
import { siteUrl } from "@/lib/site";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "AppGate Pack free wrapper precheck scorecard: HIGH wrapper risk for a Capacitor app, with 4.2, 4.3, and metadata flags. Not a review prediction.",
} as const;

function checkShareMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const input = parseCheckInput(await searchParams);
  if (!input) {
    return checkShareMetadata(
      "Free App Store wrapper precheck",
      "Paste your stack and three native features. Get a shareable HIGH / MED / LOW card for Guidelines 4.2, 4.3, and metadata. No login. No payment. Not a guarantee — Apple decides.",
      "/check",
    );
  }
  const result = scorePrecheck(input);
  return checkShareMetadata(
    `${input.name}: wrapper risk ${result.overall}`,
    `${result.blurb} 4.2 ${result.flags["4.2"].level}, 4.3 ${result.flags["4.3"].level}, metadata ${result.flags.metadata.level}. Not a guarantee — Apple decides.`,
    `/check?${toCheckQuery(input)}`,
  );
}

export default async function CheckPage({ searchParams }: Props) {
  const input = parseCheckInput(await searchParams);
  const result = input ? scorePrecheck(input) : null;
  const shareUrl = input
    ? `${siteUrl()}/check?${toCheckQuery(input)}`
    : `${siteUrl()}/check`;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Free · no login · no payment
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        Will Apple bounce this wrapper?
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Instant 4.2 / 4.3 / metadata heuristic for Capacitor, WebView, PWA, and
        vibe-coded iOS shells. The result is the product — screenshot it, copy
        the link, send it to the group chat.
      </p>

      {input && result ? (
        <div className="mt-10">
          <ResultCard input={input} result={result} shareUrl={shareUrl} />
          <div className="mt-6 space-y-3 text-sm leading-6 text-muted">
            {result.flags["4.2"].reasons.slice(1).map((reason) => (
              <p key={reason}>4.2 — {reason}</p>
            ))}
            {result.flags["4.3"].reasons.map((reason) => (
              <p key={reason}>4.3 — {reason}</p>
            ))}
            {result.flags.metadata.reasons.map((reason) => (
              <p key={reason}>Metadata — {reason}</p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10">
        <h2 className="font-serif text-2xl tracking-tight">
          {result ? "Run another app" : "Paste the app"}
        </h2>
        <p className="mt-2 mb-5 text-sm text-muted">
          Three claimed native features. Reviewers tap; they do not read your repo.
        </p>
        <CheckForm initial={input} />
      </div>

      {result ? (
        <aside className="mt-12 rounded-xl border border-dashed border-line bg-card px-5 py-5">
          <p className="text-sm font-medium text-ink">If this stung</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Grab the free Capacitor evidence checklist, or browse pack templates.
            Paid checkout stays optional / later.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/free/4-2-capacitor" className="text-accent underline">
              Free 4.2 Capacitor checklist
            </Link>
            <Link href="/kit" className="text-accent underline">
              Kit templates
            </Link>
            <Link href="/overnight" className="text-accent underline">
              Overnight pack (later)
            </Link>
          </div>
        </aside>
      ) : (
        <p className="mt-6 text-sm text-muted">
          Prefer a list you can print?{" "}
          <Link href="/free/4-2-capacitor" className="text-accent underline">
            Guideline 4.2 Capacitor checklist
          </Link>
          .
        </p>
      )}

      <div className="mt-12">
        <DisclaimerCallout />
      </div>
    </main>
  );
}
