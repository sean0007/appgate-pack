export const digestCopy = {
  stub: "Nothing was stored server-side. The weekly digest isn’t sending yet — this browser can remember your email locally.",
  saved: "Signed up. We’ll send the free weekly digest to this email. No payment. Not App Store Connect.",
  invalidEmail: "Please add a valid email.",
  webhookRejected:
    "The digest webhook did not accept the signup. Nothing was stored server-side.",
  webhookUnreachable:
    "Could not reach the digest webhook. Nothing was stored server-side.",
  unexpected: "Signup failed before anything was stored.",
} as const;

export type DigestWebhook =
  | { mode: "stub" }
  | { mode: "forward"; url: string };

/** https webhooks are forwarded. Missing or non-https values stay a local stub. */
export function digestWebhookTarget(
  raw = process.env.DIGEST_WEBHOOK_URL,
): DigestWebhook {
  const value = raw?.trim();
  if (!value) return { mode: "stub" };
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !url.hostname) return { mode: "stub" };
    return { mode: "forward", url: url.toString() };
  } catch {
    return { mode: "stub" };
  }
}
