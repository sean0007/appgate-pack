import Link from "next/link";

const nav = [
  { href: "/check", label: "Precheck" },
  { href: "/free/4-2-capacitor", label: "4.2 list" },
  { href: "/digest", label: "Digest" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md bg-accent text-sm font-semibold text-paper"
          >
            A
          </span>
          <span className="font-serif text-lg tracking-tight text-ink">
            AppGate Pack
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted sm:gap-6">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/check"
          className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-paper hover:bg-accent/90"
        >
          Free precheck
        </Link>
      </div>
    </header>
  );
}
