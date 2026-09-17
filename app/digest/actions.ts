"use server";

import { persistJson, recordId } from "@/lib/persist";

export type DigestState = { ok: boolean; error?: string; id?: string };

function read(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitDigest(
  _prev: DigestState,
  formData: FormData,
): Promise<DigestState> {
  if (read(formData, "company")) {
    return { ok: true, id: "ignored" };
  }

  const email = read(formData, "email");
  const name = read(formData, "name");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please add a valid email." };
  }

  const id = recordId(email);
  const payload = {
    id,
    createdAt: new Date().toISOString(),
    sku: "digest",
    email,
    name: name || null,
  };

  const result = await persistJson(payload);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true, id: result.id };
}
