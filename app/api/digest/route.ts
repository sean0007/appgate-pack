import { NextResponse } from "next/server";
import { persistJson, recordId } from "@/lib/persist";

export async function POST(request: Request) {
  const formData = await request.formData();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const origin = new URL(request.url).origin;

  if (company) {
    return NextResponse.redirect(new URL("/digest?ok=1", origin), 303);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.redirect(new URL("/digest?error=email", origin), 303);
  }

  const id = recordId(email);
  await persistJson({
    id,
    createdAt: new Date().toISOString(),
    sku: "digest",
    email,
    name: name || null,
  });

  return NextResponse.redirect(new URL("/digest?ok=1", origin), 303);
}
