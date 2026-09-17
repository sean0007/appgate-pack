"use client";

import { useActionState } from "react";
import { submitDigest, type DigestState } from "@/app/digest/actions";

const initial: DigestState = { ok: false };

export function DigestForm() {
  const [state, action, pending] = useActionState(submitDigest, initial);

  if (state.ok) {
    return (
      <div className="rounded-xl border border-line bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          You’re on the list
        </p>
        <h2 className="mt-2 font-serif text-2xl tracking-tight">
          Weekly patterns, free, when we send them.
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          No payment. We’ll use this email for the digest only — not App Store
          Connect, not a sales sequence by default.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-xl border border-line bg-card p-6">
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
          {pending ? "Saving…" : "Get the free weekly digest"}
        </button>
      </div>
    </form>
  );
}
