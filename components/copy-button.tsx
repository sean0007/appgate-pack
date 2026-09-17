"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label,
  copiedLabel = "Copied",
  className = "",
}: {
  text: string;
  label: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={onCopy} className={className}>
      {copied ? copiedLabel : label}
    </button>
  );
}
