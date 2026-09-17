import { renderMarkdown } from "@/lib/markdown";

export function MarkdownDoc({
  markdown,
  className = "",
}: {
  markdown: string;
  className?: string;
}) {
  return (
    <article
      className={`doc-sheet ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  );
}
