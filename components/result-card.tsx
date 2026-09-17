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

  return (
    <section
      id="result"
      className={`result-card overflow-hidden rounded-2xl ${tone[result.overall]}`}
    >
      <div className="px-6 py-7 sm:px-8 sm:py-9">
        <p
          className={`text-xs font-medium uppercase tracking-[0.2em] ${
            inverted ? "text-paper/70" : "text-muted"
          }`}
        >
          AppGate Pack · free wrapper precheck
        </p>
        <p className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl">
          {input.name}
        </p>
        <p
          className={`mt-1 text-sm ${inverted ? "text-paper/70" : "text-muted"}`}
        >
          {stackLabel(input.stack)} · {input.description}
        </p>
        <p
          className={`mt-8 font-serif text-[4.25rem] leading-none tracking-tight sm:text-[5.5rem] ${stamp[result.overall]}`}
        >
          {result.overall}
        </p>
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em]">
          Your wrapper risk
        </p>
        <p
          className={`mt-4 max-w-xl text-base leading-7 ${
            inverted ? "text-paper/85" : "text-muted"
          }`}
        >
          {result.blurb}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {(
            [
              ["4.2", result.flags["4.2"]],
              ["4.3", result.flags["4.3"]],
              ["Metadata", result.flags.metadata],
            ] as const
          ).map(([label, flag]) => (
            <div
              key={label}
              className={`rounded-lg px-3 py-3 ${
                inverted ? "bg-white/10" : "bg-paper"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.12em] opacity-70">
                {label}
              </p>
              <p
                className={`mt-1 font-serif text-2xl ${
                  result.overall === "LOW" ? "text-paper" : flagTone[flag.level]
                }`}
              >
                {flag.level}
              </p>
              <p
                className={`mt-2 text-xs leading-5 ${
                  inverted ? "text-paper/75" : "text-muted"
                }`}
              >
                {flag.reasons[0]}
              </p>
            </div>
          ))}
        </div>
        <ul
          className={`mt-6 space-y-1 text-sm ${
            inverted ? "text-paper/80" : "text-muted"
          }`}
        >
          {result.featureReads.map((item) => (
            <li key={item.text}>
              <span className="font-mono text-[11px] uppercase tracking-wide opacity-70">
                {item.signal}
              </span>
              {" — "}
              {item.text}
            </li>
          ))}
        </ul>
        <div className="no-print mt-8 flex flex-wrap gap-3">
          <CopyButton
            text={shareUrl}
            label="Copy link"
            className={`rounded-md px-4 py-2.5 text-sm font-medium ${
              inverted
                ? "bg-paper text-ink hover:bg-paper/90"
                : "bg-accent text-paper hover:bg-accent/90"
            }`}
          />
          <CopyButton
            text={`${input.name} wrapper risk: ${result.overall} — 4.2 ${result.flags["4.2"].level}, 4.3 ${result.flags["4.3"].level}, metadata ${result.flags.metadata.level}. ${shareUrl}`}
            label="Copy result"
            className={`rounded-md border px-4 py-2.5 text-sm font-medium ${
              inverted
                ? "border-paper/30 text-paper hover:bg-white/10"
                : "border-line text-ink hover:bg-paper"
            }`}
          />
        </div>
        <p
          className={`mt-5 text-xs ${inverted ? "text-paper/55" : "text-muted"}`}
        >
          Heuristic only. Not a review prediction. Apple decides. Screenshot this
          card if you want — that’s the point.
        </p>
      </div>
    </section>
  );
}
