import { NextResponse } from "next/server";
import { digestCopy, digestWebhookTarget } from "@/lib/digest";
import { recordId } from "@/lib/persist";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DigestBody = {
  ok: boolean;
  stored: boolean;
  message: string;
};

function stringField(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).trim();
  }
  return "";
}

async function readSignup(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body: unknown = await request.json();
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        return { email: "", name: "", company: "" };
      }
      const record = body as Record<string, unknown>;
      return {
        email: stringField(record.email),
        name: stringField(record.name),
        company: stringField(record.company),
      };
    }

    const formData = await request.formData();
    return {
      email: stringField(formData.get("email")),
      name: stringField(formData.get("name")),
      company: stringField(formData.get("company")),
    };
  } catch {
    return { email: "", name: "", company: "" };
  }
}

function prefersHtmlNavigation(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("application/json")) return false;
  return accept.includes("text/html");
}

function reply(
  request: Request,
  body: DigestBody,
  status: number,
  notice: string,
) {
  if (prefersHtmlNavigation(request)) {
    const origin = new URL(request.url).origin;
    const target = new URL("/digest", origin);
    if (body.ok) target.searchParams.set("notice", notice);
    else target.searchParams.set("error", notice);
    return NextResponse.redirect(target, 303);
  }
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  try {
    const { email, name, company } = await readSignup(request);

    if (company) {
      return reply(
        request,
        { ok: true, stored: false, message: digestCopy.stub },
        200,
        "local",
      );
    }

    if (!EMAIL.test(email) || email.length > 254) {
      return reply(
        request,
        { ok: false, stored: false, message: digestCopy.invalidEmail },
        400,
        "email",
      );
    }

    const webhook = digestWebhookTarget();
    if (webhook.mode === "stub") {
      return reply(
        request,
        { ok: true, stored: false, message: digestCopy.stub },
        200,
        "local",
      );
    }

    const payload = {
      id: recordId(email),
      createdAt: new Date().toISOString(),
      sku: "digest",
      email,
      name: name.slice(0, 120) || null,
      source: "appgate-pack",
    };

    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        return reply(
          request,
          { ok: false, stored: false, message: digestCopy.webhookRejected },
          502,
          "forward",
        );
      }
    } catch {
      return reply(
        request,
        { ok: false, stored: false, message: digestCopy.webhookUnreachable },
        502,
        "forward",
      );
    }

    return reply(
      request,
      { ok: true, stored: true, message: digestCopy.saved },
      200,
      "saved",
    );
  } catch (error) {
    console.error(
      "digest.unexpected",
      error instanceof Error ? error.name : "error",
    );
    return NextResponse.json(
      { ok: false, stored: false, message: digestCopy.unexpected },
      { status: 500 },
    );
  }
}
