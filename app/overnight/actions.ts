"use server";

import { persistJson, recordId } from "@/lib/persist";

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

  const id = recordId(email);
  const result = await persistJson({
    id,
    createdAt: new Date().toISOString(),
    sku: "overnight",
    name,
    email,
    guideline: guideline || null,
    listingUrl: listingUrl || null,
    rejectionText,
    notes: notes || null,
  });

  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, id: result.id };
}
