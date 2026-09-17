import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerCallout } from "@/components/disclaimer-callout";
import { MarkdownDoc } from "@/components/markdown-doc";
import { getSampleDoc } from "@/lib/kit";

export const metadata: Metadata = {
  title: "Redacted sample pack",
  description:
    "Preview a redacted AppGate Overnight Pack for a Capacitor Guideline 4.2 rejection.",
};

export default async function SamplePage() {
  const doc = await getSampleDoc();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Sample output
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">
        Redacted Overnight Pack
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">
        Names, bundle IDs, and screenshots are fictional or blacked out. The
        structure matches a paid pack: cite, decision tree, evidence, reply
        draft, resubmit notes.
      </p>
      <div className="no-print mt-5 flex gap-4 text-sm">
        <a href="/api/sample" className="text-accent underline">
          Download markdown
        </a>
        <Link href="/overnight" className="text-accent underline">
          Start overnight intake
        </Link>
      </div>
      <div className="mt-8">
        <MarkdownDoc markdown={doc.body} />
      </div>
      <div className="mt-10">
        <DisclaimerCallout />
      </div>
    </main>
  );
}
