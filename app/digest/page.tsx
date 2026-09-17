import type { Metadata } from "next";
import Link from "next/link";
import { DigestForm } from "@/components/digest-form";
import { DisclaimerCallout } from "@/components/disclaimer-callout";

export const metadata: Metadata = {
  title: "Weekly App Store rejection patterns",
  description:
    "Free weekly digest of 4.2 / 4.3 / metadata rejection patterns for wrapper and vibe-coded iOS apps. Sponsor slot open.",
};

export default function DigestPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Free weekly · stub
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          App Store rejection patterns, once a week.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Public 4.2 / 4.3 / metadata tells from forums, Review language, and
          wrapper post-mortems — not a newsletter that asks you to pay first.
          Tokyo night research window. You keep App Store Connect.
        </p>
        <ul className="mt-6 space-y-2 text-sm leading-6 text-muted">
          <li>What bounced this week (redacted, public patterns only)</li>
          <li>One Capacitor / WebView evidence note</li>
          <li>What not to claim in Resolution Center</li>
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/check" className="text-accent underline">
            Don’t wait for Friday — run the free precheck
          </Link>
        </p>
      </div>
      <div className="space-y-6">
        <DigestForm />
        <aside className="rounded-xl border border-dashed border-line bg-paper px-5 py-6 text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            Sponsor slot
          </p>
          <p className="mt-2 font-serif text-2xl tracking-tight text-ink">
            Your ad here
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
            Placeholder for a future digest sponsor. Ads and Stripe stay stubs
            until the clicks are real.
          </p>
        </aside>
        <DisclaimerCallout compact />
      </div>
    </main>
  );
}
