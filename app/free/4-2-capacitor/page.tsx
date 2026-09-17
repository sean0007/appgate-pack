import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { DisclaimerCallout } from "@/components/disclaimer-callout";
import { PrintButton } from "@/components/print-button";
import {
  capacitorChecklistPlain,
  capacitorFreebie,
} from "@/lib/capacitor-freebie";

export const metadata: Metadata = {
  title: "Free Guideline 4.2 Capacitor evidence checklist",
  description:
    "Printable Guideline 4.2 evidence checklist for Capacitor / WebView apps. Copy it. Screenshot it. Apple still decides.",
};

const btn =
  "rounded-md px-4 py-2.5 text-sm font-medium";

export default function CapacitorFreebiePage() {
  const copyText = capacitorChecklistPlain();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {capacitorFreebie.kicker}
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        {capacitorFreebie.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">{capacitorFreebie.lede}</p>

      <div className="no-print mt-6 flex flex-wrap gap-3">
        <CopyButton
          text={copyText}
          label="Copy checklist"
          className={`${btn} bg-accent text-paper hover:bg-accent/90`}
        />
        <PrintButton
          className={`${btn} border border-line bg-card text-ink hover:bg-paper`}
        />
        <Link
          href="/check"
          className={`${btn} border border-line text-ink hover:bg-card`}
        >
          Run the free precheck
        </Link>
      </div>

      <article className="doc-sheet mt-10 print:border-0 print:shadow-none">
        {capacitorFreebie.sections.map((section) => (
          <section key={section.heading} className="mt-8 first:mt-0">
            <h2 className="font-serif text-2xl tracking-tight text-ink">
              {section.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                  <span
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-line bg-paper"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </article>

      <aside className="no-print mt-10 rounded-xl border border-dashed border-line bg-card px-5 py-5 text-sm leading-6 text-muted">
        Wondering if your binary even gets this far?{" "}
        <Link href="/check" className="text-accent underline">
          Free wrapper precheck
        </Link>{" "}
        — shareable HIGH / MED / LOW card. Packs and Stripe stay later.
      </aside>

      <div className="mt-10">
        <DisclaimerCallout />
      </div>
    </main>
  );
}
