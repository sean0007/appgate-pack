import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export function recordId(email: string) {
  return `${new Date().toISOString().replaceAll(":", "-")}-${email
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 48)}`;
}

export async function persistJson(payload: { id: string } & Record<string, unknown>) {
  const dirs = [
    path.join(process.cwd(), "data", "submissions"),
    "/tmp/appgate-submissions",
  ];

  let stored = false;
  for (const dir of dirs) {
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(
        path.join(dir, `${payload.id}.json`),
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
    return { ok: false as const, error: "Could not store or forward this." };
  }

  if (!stored && !webhook) {
    console.info("appgate.submission", JSON.stringify(payload));
  }

  return { ok: true as const, id: payload.id };
}
