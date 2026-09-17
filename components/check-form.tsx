"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  parseCheckInput,
  stacks,
  toCheckQuery,
  type PrecheckInput,
  type StackId,
} from "@/lib/precheck";

const empty: PrecheckInput = {
  name: "",
  description: "",
  stack: "capacitor",
  features: ["", "", ""],
};

export function CheckForm({
  initial,
  submitLabel = "See my wrapper risk",
}: {
  initial?: PrecheckInput | null;
  submitLabel?: string;
}) {
  const router = useRouter();
  const starting = initial ?? empty;
  const [name, setName] = useState(starting.name);
  const [description, setDescription] = useState(starting.description);
  const [stack, setStack] = useState<StackId>(starting.stack);
  const [features, setFeatures] = useState<[string, string, string]>(
    starting.features,
  );

  const query = useMemo(
    () =>
      toCheckQuery({
        name,
        description,
        stack,
        features,
      }),
    [name, description, stack, features],
  );

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseCheckInput(new URLSearchParams(query));
    if (!parsed) return;
    router.push(`/check?${query}#result`);
  }

  return (
    <form
      action="/check"
      method="GET"
      onSubmit={onSubmit}
      className="grid gap-5 rounded-xl border border-line bg-card p-6 sm:p-8"
    >
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">App name</span>
        <input
          required
          name="n"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="FluxNotes"
          className="rounded-md border border-line bg-paper px-3 py-2 text-ink outline-none ring-accent/30 focus:ring-2"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium text-ink">One-line description</span>
        <input
          required
          name="d"
          minLength={8}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Wrapped marketing site for our notes product"
          className="rounded-md border border-line bg-paper px-3 py-2 text-ink outline-none ring-accent/30 focus:ring-2"
        />
      </label>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium text-ink">Stack</legend>
        <div className="flex flex-wrap gap-2">
          {stacks.map((item) => (
            <label
              key={item.id}
              className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm ${
                stack === item.id
                  ? "border-accent bg-accent text-paper"
                  : "border-line bg-paper text-ink"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="s"
                value={item.id}
                checked={stack === item.id}
                onChange={() => setStack(item.id)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-3">
        <p className="text-sm font-medium text-ink">
          Three “native” features you would claim
        </p>
        {features.map((feature, index) => (
          <input
            key={index}
            required
            name={`f${index + 1}`}
            value={feature}
            onChange={(event) => {
              const next: [string, string, string] = [
                features[0],
                features[1],
                features[2],
              ];
              next[index] = event.target.value;
              setFeatures(next);
            }}
            placeholder={
              index === 0
                ? "Splash screen"
                : index === 1
                  ? "iOS share sheet"
                  : "APNs push"
            }
            className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink outline-none ring-accent/30 focus:ring-2"
          />
        ))}
        <p className="text-xs leading-5 text-muted">
          Be honest. “Capacitor plugins” scores worse than “share sheet.” Heuristic
          only — Apple still decides.
        </p>
      </div>
      <button
        type="submit"
        className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-paper hover:bg-accent/90"
      >
        {submitLabel}
      </button>
    </form>
  );
}
