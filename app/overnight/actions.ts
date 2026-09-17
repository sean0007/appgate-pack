"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type OvernightState = {
  ok: boolean;
  error?: string;
  id?: string;
};

function read(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function looksLikeCredential(value: string) {
  return /(app store connect|apple id password|2fa code|session cookie|asc[_-]?key|issuer id)/i.test(
    value,
  );
}

export async function submitOvernight(
  _prev: OvernightState,
  formData: FormData,
): Promise<OvernightState> {
  if (read(formData, "company")) {
    return { ok: true, id: "ignored" };
  }

  const name = read(formData, "name");
  const email = read(formData, "email");
  const guideline = read(formData, "guideline");
  const listingUrl = read(formData, "listingUrl");
  const rejectionText = read(formData, "rejectionText");
  const notes = read(formData, "notes");

  if (!name || name.length > 120) {
    return { ok: false, error: "Please add your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please add a valid email." };
  }
  if (rejectionText.length < 40) {
    return {
      ok: false,
      error: "Paste the full rejection text (at least a few sentences).",
    };
  }
  if (listingUrl && !/^https?:\/\//i.test(listingUrl)) {
    return { ok: false, error: "Listing URL must start with https://." };
  }
  if (looksLikeCredential(`${notes}\n${rejectionText}`)) {
    return {
      ok: false,
      error:
        "Remove App Store Connect credentials or 2FA codes. We never log into your account.",
    };
  }

  const id = `${new Date().toISOString().replaceAll(":", "-")}-${email
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 48)}`;

  const payload = {
    id,
    createdAt: new Date().toISOString(),
    sku: "overnight",
    name,
    email,
    guideline: guideline || null,
    listingUrl: listingUrl || null,
    rejectionText,
    notes: notes || null,
  };

  const dirs = [
    path.join(process.cwd(), "data", "submissions"),
    "/tmp/appgate-submissions",
  ];

  let stored = false;
  for (const dir of dirs) {
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(
        path.join(dir, `${id}.json`),
        `${JSON.stringify(payload, null, 2)}\n`,
        "utf8",
      );
      stored = true;
      break;
    } catch {
      // Serverless filesystems may be read-only except /tmp.
    }
  }

  const webhook = process.env.SUBMISSION_WEBHOOK_URL?.trim();
  let hooked = false;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      hooked = response.ok;
    } catch {
      hooked = false;
    }
  }

  if (!stored && !hooked && webhook) {
    return {
      ok: false,
      error: "Could not store or forward this intake. Try again in a minute.",
    };
  }

  if (!stored && !webhook) {
    // Still acknowledge: local write can fail on some hosts; payload is
    // returned so the operator can recover from logs if needed.
    console.info("appgate.submission", JSON.stringify(payload));
  }

  return { ok: true, id };
}
