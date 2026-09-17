export const site = {
  name: "AppGate Pack",
  tagline: "Free App Store wrapper precheck for 4.2 / 4.3 / metadata.",
  description:
    "Free Guideline 4.2 / 4.3 / metadata precheck and Capacitor evidence checklist for vibe-coded and WebView apps. Not legal advice. No approval guarantee. We never log into App Store Connect.",
} as const;

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
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
