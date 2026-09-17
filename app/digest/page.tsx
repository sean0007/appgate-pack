import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerCallout } from "@/components/disclaimer-callout";

export const metadata: Metadata = {
  title: "Weekly App Store rejection patterns",
  description:
    "Free weekly digest of 4.2 / 4.3 / metadata rejection patterns for wrapper and vibe-coded iOS apps. Sponsor slot open.",
};

export default async function DigestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const ok = params.ok === "1";
  const error = params.error === "email";

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
        {ok ? (
          <div className="rounded-xl border border-line bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You’re on the list
            </p>
            <h2 className="mt-2 font-serif text-2xl tracking-tight">
              Weekly patterns, free, when we send them.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              No payment. We’ll use this email for the digest only — not App
              Store Connect.
            </p>
          </div>
        ) : (
          <form
            action="/api/digest"
            method="POST"
            className="rounded-xl border border-line bg-card p-6"
          >
            <div className="grid gap-4">
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-ink">
                  Name <span className="font-normal text-muted">(optional)</span>
                </span>
                <input
                  name="name"
                  autoComplete="name"
                  className="rounded-md border border-line bg-paper px-3 py-2 outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-ink">Email</span>
                <input
                  required
                  id="digest-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="rounded-md border border-line bg-paper px-3 py-2 outline-none ring-accent/30 focus:ring-2"
                />
              </label>
              <p className="sr-only">
                <label>
                  Company
                  <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              {error ? (
                <p className="text-sm text-accent-2" role="alert">
                  Please add a valid email.
                </p>
              ) : null}
              <button
                type="submit"
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:bg-accent/90"
              >
                Get the free weekly digest
              </button>
            </div>
          </form>
        )}
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
