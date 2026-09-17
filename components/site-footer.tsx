import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md">
          <p className="font-serif text-lg text-ink">AppGate Pack</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Free precheck and checklists first. Packets later. Not legal advice.
            Apple decides. No approval guarantee. We never log into App Store
            Connect and we never ask for your Apple ID.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/check" className="hover:text-ink">
            Precheck
          </Link>
          <Link href="/free/4-2-capacitor" className="hover:text-ink">
            4.2 checklist
          </Link>
          <Link href="/digest" className="hover:text-ink">
            Digest
          </Link>
          <Link href="/kit" className="hover:text-ink">
            Kit
          </Link>
          <Link href="/sample" className="hover:text-ink">
            Sample
          </Link>
          <Link href="/legal/disclaimer" className="hover:text-ink">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
