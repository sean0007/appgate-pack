import { getKitDoc } from "@/lib/kit";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = await getKitDoc(slug);
  if (!doc) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(doc.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${doc.slug}.md"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
