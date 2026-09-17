import { getSampleDoc } from "@/lib/kit";

export async function GET() {
  const doc = await getSampleDoc();
  return new Response(doc.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="redacted-pack.md"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
