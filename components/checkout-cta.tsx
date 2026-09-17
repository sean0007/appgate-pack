import Link from "next/link";
import { stripeLink } from "@/lib/site";

type Props = {
  sku: "kit" | "overnight";
  children: React.ReactNode;
  className?: string;
  fallbackHref?: string;
};

const base =
  "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors";

export function CheckoutCta({
  sku,
  children,
  className = "",
  fallbackHref = "/overnight",
}: Props) {
  const href = stripeLink(sku);

  if (href) {
    return (
      <a
        href={href}
        className={`${base} bg-accent text-paper hover:bg-accent/90 ${className}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  if (sku === "overnight") {
    return (
      <p className={`text-sm leading-6 text-muted ${className}`}>
        Checkout coming soon — leave email on overnight form.
      </p>
    );
  }

  return (
    <Link
      href={fallbackHref}
      className={`${base} border border-line bg-card text-ink hover:bg-paper ${className}`}
    >
      Checkout coming soon — leave email on overnight form.
    </Link>
  );
}
