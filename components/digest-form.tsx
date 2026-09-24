"use client";

import { useEffect, useState, type FormEvent } from "react";
import { digestCopy } from "@/lib/digest";

const STORAGE_KEY = "appgate.digest.local";

type Notice = "local" | "saved" | "email" | "forward";

type ApiBody = {
  ok?: boolean;
  stored?: boolean;
  message?: string;
};

const noticeCopy: Record<Notice, { ok: boolean; message: string }> = {
  local: { ok: true, message: digestCopy.stub },
  saved: { ok: true, message: digestCopy.saved },
  email: { ok: false, message: digestCopy.invalidEmail },
  forward: { ok: false, message: digestCopy.webhookRejected },
};

function rememberLocally(email: string, name: string) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        email,
        name,
        savedAt: new Date().toISOString(),
      }),
    );
  } catch {
    // Private mode and locked-down browsers can refuse storage. The API
    // response is still the source of truth: nothing was stored server-side.
  }
}

export function DigestForm({ initialNotice }: { initialNotice?: Notice | null }) {
  const initial = initialNotice ? noticeCopy[initialNotice] : null;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ stored: boolean; message: string } | null>(
    initial?.ok
      ? { stored: initialNotice === "saved", message: initial.message }
      : null,
  );
  const [error, setError] = useState<string | null>(
    initial && !initial.ok ? initial.message : null,
  );
  const [localEmail, setLocalEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { email?: unknown; name?: unknown };
      if (typeof parsed.email !== "string" || !parsed.email) return;
      const savedEmail = parsed.email;
      const savedName = typeof parsed.name === "string" ? parsed.name : "";
      setLocalEmail(savedEmail);
      setEmail((current) => current || savedEmail);
      if (savedName) setName((current) => current || savedName);
    } catch {
      // Ignore unreadable local notes. Nothing is stored server-side either way.
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/digest", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          company: String(formData.get("company") ?? ""),
        }),
      });

      let body: ApiBody = {};
      try {
        body = (await response.json()) as ApiBody;
      } catch {
        body = {};
      }

      const message =
        body.message ||
        (response.ok ? digestCopy.stub : digestCopy.unexpected);

      if (body.ok) {
        if (body.stored === false) rememberLocally(email, name);
        setResult({ stored: body.stored === true, message });
        return;
      }

      setError(message);
    } catch {
      setError("Couldn’t reach signup. Nothing was stored server-side.");
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-xl border border-line bg-card p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {result.stored ? "You’re on the list" : "Noted locally"}
        </p>
        <h2 className="mt-2 font-serif text-2xl tracking-tight">
          {result.stored
            ? "Weekly patterns, when we send them."
            : "Nothing was stored on the server."}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted" role="status">
          {result.message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-line bg-card p-6"
    >
      <div className="grid gap-4">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">
            Name <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            maxLength={120}
            className="rounded-md border border-line bg-paper px-3 py-2 outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-ink">Email</span>
          <input
            required
            id="digest-email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            maxLength={254}
            className="rounded-md border border-line bg-paper px-3 py-2 outline-none ring-accent/30 focus:ring-2"
          />
        </label>
        <p className="sr-only" aria-hidden="true">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <p className="text-xs leading-5 text-muted">
          No payment. If a digest webhook isn’t configured, we don’t store this
          email on the server.
        </p>
        {localEmail ? (
          <p className="text-xs leading-5 text-muted" role="status">
            This browser already has {localEmail} noted locally. Nothing from
            that note is stored on the server.
          </p>
        ) : null}
        {error ? (
          <p className="text-sm text-accent-2" role="alert">
            {error}
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
