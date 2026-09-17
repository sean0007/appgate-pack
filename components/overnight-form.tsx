"use client";

import { useActionState } from "react";
import {
  submitOvernight,
  type OvernightState,
} from "@/app/overnight/actions";
import { CheckoutCta } from "@/components/checkout-cta";

const initial: OvernightState = { ok: false };

export function OvernightForm({ paymentConfigured }: { paymentConfigured: boolean }) {
  const [state, action, pending] = useActionState(submitOvernight, initial);

  if (state.ok) {
    return (
      <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Intake received
        </p>
        <h2 className="mt-2 font-serif text-3xl tracking-tight">
          Pack queued for the Tokyo overnight window.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          We stored your rejection notes{state.id ? ` as ${state.id}` : ""}.
          Delivery target is about 12 hours (US overnight). You submit the reply
          in Resolution Center yourself — we never log into App Store Connect.
        </p>
        <div className="mt-6 space-y-3">
          {paymentConfigured ? (
            <>
              <p className="text-sm text-ink">
                Next: pay the Overnight Pack via Stripe.
              </p>
              <CheckoutCta sku="overnight">Pay Overnight Pack · $149</CheckoutCta>
            </>
          ) : (
            <p className="rounded-md border border-dashed border-line bg-paper px-4 py-3 text-sm leading-6 text-muted">
              Checkout coming soon — leave email on overnight form. We have yours
              and will follow up with a Stripe Payment Link.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-xl border border-line bg-card p-6 sm:p-8">
      <div className="grid gap-5">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="rounded-md border border-line bg-paper px-3 py-2 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="rounded-md border border-line bg-paper px-3 py-2 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">
            Guideline code{" "}
            <span className="font-normal text-muted">(if known)</span>
          </span>
          <input
            name="guideline"
            placeholder="4.2, 4.3, 2.3.x, 5.1.1…"
            className="rounded-md border border-line bg-paper px-3 py-2 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">
            App Store listing URL{" "}
            <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            type="url"
            name="listingUrl"
            placeholder="https://apps.apple.com/…"
            className="rounded-md border border-line bg-paper px-3 py-2 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Rejection text</span>
          <textarea
            required
            name="rejectionText"
            rows={10}
            minLength={40}
            placeholder="Paste the full App Review / Resolution Center message."
            className="rounded-md border border-line bg-paper px-3 py-2 font-mono text-[13px] leading-6 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">
            Notes{" "}
            <span className="font-normal text-muted">
              (stack, native features, screenshot links)
            </span>
          </span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Capacitor / WKWebView / RN WebView, what you already shipped, links to 1–3 screenshots."
            className="rounded-md border border-line bg-paper px-3 py-2 text-ink outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <p className="sr-only">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        {state.error ? (
          <p className="text-sm text-accent-2" role="alert">
            {state.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:bg-accent/90 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Submit overnight intake"}
        </button>
        <p className="text-xs leading-5 text-muted">
          Do not send App Store Connect passwords, 2FA codes, or session cookies.
          We will refuse credential fields if they appear in the notes.
        </p>
      </div>
    </form>
  );
}
