import Link from "next/link";

export function DisclaimerCallout({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="rounded-lg border border-line bg-card px-5 py-4 text-sm leading-6 text-muted">
      <p className="font-medium text-ink">Not legal advice. Apple decides.</p>
      <p className="mt-1">
        AppGate Pack sells evidence organizers, checklists, and draft Resolution
        Center replies. We do not guarantee App Store approval or reinstatement.
        We never log into App Store Connect, never ask for Apple ID credentials,
        and never post to Resolution Center on your behalf.{" "}
        {!compact ? (
          <Link href="/legal/disclaimer" className="text-accent underline">
            Full disclaimer
          </Link>
        ) : null}
      </p>
    </aside>
  );
}
