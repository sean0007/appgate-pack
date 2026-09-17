import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutCta } from "@/components/checkout-cta";
import { DisclaimerCallout } from "@/components/disclaimer-callout";
import { MarkdownDoc } from "@/components/markdown-doc";
import { getKitDocs } from "@/lib/kit";
import { prices } from "@/lib/site";

export const metadata: Metadata = {
  title: "AppGate Kit",
  description:
    "Self-serve Guideline 4.2 / 4.3 / metadata / privacy reply skeletons and evidence checklists.",
};

export default async function KitPage() {
  const docs = await getKitDocs();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Self-serve · ${prices.kit}
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight">
        AppGate Kit — paste-ready skeletons for wrapper rejections.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Downloadable markdown, formatted like a print-to-PDF brief. Use the
        checklists before you resubmit; use the skeletons in Resolution Center.
        Apple still decides.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <CheckoutCta sku="kit">Buy Kit · ${prices.kit}</CheckoutCta>
        <Link href="/overnight" className="text-sm text-accent underline">
          Need a custom overnight pack instead?
        </Link>
      </div>

      <ol className="mt-10 grid gap-3 md:grid-cols-2">
        {docs.map((doc, index) => (
          <li key={doc.slug}>
            <a
              href={`#${doc.slug}`}
              className="block rounded-lg border border-line bg-card px-4 py-3 hover:border-accent/40"
            >
              <p className="font-mono text-xs text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-medium text-ink">{doc.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {doc.summary}
              </p>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-12 space-y-14">
        {docs.map((doc) => (
          <section key={doc.slug} id={doc.slug} className="scroll-mt-24">
            <div className="no-print mb-3 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {doc.slug}.md
              </p>
              <a
                href={`/api/kit/${doc.slug}`}
                className="text-sm text-accent underline"
              >
                Download markdown
              </a>
            </div>
            <MarkdownDoc markdown={doc.body} />
          </section>
        ))}
      </div>

      <div className="mt-12">
        <DisclaimerCallout />
      </div>
    </main>
  );
}
