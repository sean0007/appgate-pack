import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "AppGate Pack is not legal advice and does not guarantee App Store approval.",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Legal
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">Disclaimer</h1>
      <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
        <p>
          AppGate Pack provides informational packets: guideline citations,
          checklists, evidence organizers, and draft Resolution Center replies.
          This is not legal advice, not attorney-client work, and not a filing
          service.
        </p>
        <p>
          Apple Inc. decides App Store review outcomes. Buying a kit or an
          overnight pack does not guarantee approval, faster review, or
          reinstatement. Many Guideline 4.2 cases require product changes, not
          a better letter.
        </p>
        <p>
          We never log into App Store Connect, never request Apple ID passwords
          or 2FA codes, never store session cookies, and never post to
          Resolution Center on your behalf. You remain the account holder.
        </p>
        <p>
          Review Guidelines and Resolution Center are Apple products. Links to
          Apple documentation are for reference only. AppGate Pack is not
          affiliated with Apple.
        </p>
        <p>
          Do not send credentials in the overnight form. If notes appear to
          contain secrets, we will ask you to resubmit without them.
        </p>
      </div>
      <p className="mt-8 text-sm">
        <Link href="/" className="text-accent underline">
          Back to home
        </Link>
      </p>
    </main>
  );
}
