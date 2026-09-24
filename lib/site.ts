export const site = {
  name: "AppGate Pack",
  tagline: "Free App Store wrapper precheck for 4.2 / 4.3 / metadata.",
  description:
    "Free Guideline 4.2 / 4.3 / metadata precheck and Capacitor evidence checklist for vibe-coded and WebView apps. Not legal advice. No approval guarantee. We never log into App Store Connect.",
} as const;

/** Used when NEXT_PUBLIC_SITE_URL is unset, invalid, or a localhost value on Vercel. */
export const defaultSiteUrl = "https://appgate-pack.vercel.app";

function isLocalHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

export function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return defaultSiteUrl;

  try {
    const url = new URL(configured);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return defaultSiteUrl;
    }
    // A copied .env with localhost must not ship in production share cards.
    if (process.env.VERCEL === "1" && isLocalHost(url.hostname)) {
      return defaultSiteUrl;
    }
    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}

export function stripeLink(sku: "kit" | "overnight") {
  const raw =
    sku === "kit"
      ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_KIT
      : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_OVERNIGHT;
  const value = raw?.trim();
  return value ? value : undefined;
}

export const prices = {
  kit: 39,
  overnight: 149,
} as const;
