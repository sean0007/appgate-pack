import type { PrecheckInput, PrecheckResult, RiskLevel } from "@/lib/precheck";
import { stacks } from "@/lib/precheck";
import { CopyButton } from "@/components/copy-button";

const tone: Record<RiskLevel, string> = {
  HIGH: "bg-ink text-paper",
  MED: "bg-card text-ink border border-line",
  LOW: "bg-accent text-paper",
};

const stamp: Record<RiskLevel, string> = {
  HIGH: "text-risk-high",
  MED: "text-risk-med",
  LOW: "text-paper",
};

const flagTone: Record<RiskLevel, string> = {
  HIGH: "text-risk-high",
  MED: "text-risk-med",
  LOW: "text-accent",
};

function stackLabel(id: PrecheckInput["stack"]) {
  return stacks.find((item) => item.id === id)?.label ?? id;
}

export function ResultCard({
  input,
  result,
  shareUrl,
}: {
  input: PrecheckInput;
  result: PrecheckResult;
  shareUrl: string;
}) {
  const inverted = result.overall === "HIGH" || result.overall === "LOW";
  const shareText = `${input.name} wrapper risk: ${result.overall} — 4.2 ${result.flags["4.2"].level}, 4.3 ${result.flags["4.3"].level}, metadata ${result.flags.metadata.level}. ${shareUrl}`;

  return (
    <section
      id="result"
      className={`result-card overflow-hidden rounded-2xl ${tone[result.overall]}`}
    >
      <div className="px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p
            className={`text-xs font-medium uppercase tracking-[0.2em] ${
              inverted ? "text-paper/70" : "text-muted"
            }`}
          >
            AppGate Pack · free wrapper precheck
          </p>
          <div className="no-print flex flex-wrap gap-2">
            <CopyButton
              text={shareUrl}
              label="Copy link"
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                inverted
                  ? "bg-paper text-ink hover:bg-paper/90"
                  : "bg-accent text-paper hover:bg-accent/90"
              }`}
            />
            <CopyButton
              text={shareText}
              label="Copy result"
              className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
                inverted
                  ? "border-paper/30 text-paper hover:bg-white/10"
                  : "border-line text-ink hover:bg-paper"
              }`}
            />
          </div>
        </div>
        <p className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl">
          {input.name}
        </p>
        <p
          className={`mt-1 line-clamp-2 text-sm ${inverted ? "text-paper/70" : "text-muted"}`}
        >
          {stackLabel(input.stack)} · {input.description}
        </p>
        <p
          className={`mt-4 font-serif text-6xl leading-none tracking-tight sm:text-7xl ${stamp[result.overall]}`}
        >
          {result.overall}
        </p>
        <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em]">
          Your wrapper risk
        </p>
        <p
          className={`mt-3 max-w-xl text-sm leading-6 ${
            inverted ? "text-paper/85" : "text-muted"
          }`}
        >
          {result.blurb}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {(
            [
              ["4.2", result.flags["4.2"]],
              ["4.3", result.flags["4.3"]],
              ["Metadata", result.flags.metadata],
            ] as const
          ).map(([label, flag]) => (
            <div
              key={label}
              className={`rounded-lg px-3 py-2.5 ${
                inverted ? "bg-white/10" : "bg-paper"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.12em] opacity-70">
                {label}
              </p>
              <p
                className={`mt-0.5 font-serif text-xl ${
                  result.overall === "LOW" ? "text-paper" : flagTone[flag.level]
                }`}
              >
                {flag.level}
              </p>
              <p
                className={`mt-1 line-clamp-3 text-xs leading-5 ${
                  inverted ? "text-paper/75" : "text-muted"
                }`}
              >
                {flag.reasons[0]}
              </p>
            </div>
          ))}
        </div>
        <p
          className={`mt-4 text-xs ${inverted ? "text-paper/55" : "text-muted"}`}
        >
          Heuristic only. Not a review prediction. Apple decides. Screenshot this
          card.
        </p>
      </div>
    </section>
  );
}
