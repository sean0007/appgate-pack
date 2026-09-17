import { cache } from "react";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type MarkdownDoc = {
  slug: string;
  title: string;
  summary: string;
  body: string;
};

const KIT_DIR = path.join(process.cwd(), "content", "kit");
const SAMPLE_PATH = path.join(
  process.cwd(),
  "content",
  "sample",
  "redacted-pack.md",
);

function titleFrom(body: string, fallback: string) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function summaryFrom(body: string) {
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    return trimmed
      .replace(/^>\s*/, "")
      .replaceAll("**", "")
      .replaceAll("`", "")
      .replaceAll("*", "");
  }
  return "";
}

function toDoc(slug: string, body: string): MarkdownDoc {
  return {
    slug,
    title: titleFrom(body, slug),
    summary: summaryFrom(body),
    body,
  };
}

export const getKitDocs = cache(async (): Promise<MarkdownDoc[]> => {
  const files = (await readdir(KIT_DIR))
    .filter((file) => file.endsWith(".md"))
    .sort();

  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const body = await readFile(path.join(KIT_DIR, file), "utf8");
      return toDoc(slug, body);
    }),
  );
});

export async function getKitDoc(slug: string) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,80}$/.test(slug)) return null;
  const docs = await getKitDocs();
  return docs.find((doc) => doc.slug === slug) ?? null;
}

export const getSampleDoc = cache(async (): Promise<MarkdownDoc> => {
  const body = await readFile(SAMPLE_PATH, "utf8");
  return toDoc("redacted-pack", body);
});
