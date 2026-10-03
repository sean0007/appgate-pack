import { scorePrecheck, stacks, type StackId } from "./precheck";
import { InputError, oneOf, str, type Endpoint, type Input } from "./agent-api";
import { site } from "./site";

export const PUBLIC_URL = "https://appgate-pack.vercel.app";
export const API_DISCLAIMER =
  "Not legal advice. Apple decides. Heuristic precheck only; no App Store approval or reinstatement guarantee. We never log into App Store Connect or ask for Apple ID credentials.";
export const API_INFO = { title: `${site.name} API`, description: site.description };

const STACK_IDS = stacks.map((s) => s.id) as unknown as readonly StackId[];

function readFeatures(i: Input): [string, string, string] {
  let list: string[] = [];
  const raw = i.features;
  if (Array.isArray(raw)) list = raw.map(String);
  else if (typeof raw === "string" && raw.trim()) list = raw.split(/[|\n;]/);
  if (!list.length) list = ["f1", "f2", "f3"].map((k) => (i[k] === undefined ? "" : String(i[k])));
  list = list.map((s) => s.trim()).filter(Boolean);
  if (list.length < 1) throw new InputError("Give up to three key native features: features (array, or a string separated by |) or f1, f2, f3.");
  while (list.length < 3) list.push("");
  return [list[0], list[1], list[2]];
}

export const ENDPOINTS: Record<"precheck", Endpoint> = {
  precheck: {
    path: "/api/precheck",
    operationId: "appStoreWrapperPrecheck",
    summary: "Precheck an iOS app for App Store Guideline 4.2 (minimum functionality / web wrapper), 4.3 (spam / clone), and metadata rejection risk",
    description:
      "For Capacitor, WebView, PWA-shell, React Native, or vibe-coded apps. Give the app name, a one-line description, the stack, and up to three key features. Returns an overall HIGH / MED / LOW risk, per-guideline scores (0-100) with reasons, and how strongly each feature reads as native (high / medium / low signal).",
    params: [
      { name: "name", type: "string", required: true, description: "App name as it would appear on the App Store." },
      { name: "description", type: "string", required: true, description: "One-line description of what the app does." },
      { name: "stack", type: "string", required: true, enum: STACK_IDS, description: "How the app is built." },
      { name: "features", type: "array", items: { type: "string" }, description: "Up to three key features, e.g. [\"Home screen widget\", \"iOS share sheet\", \"Face ID lock\"]. For GET use f1, f2, f3 or features=a|b|c." },
      { name: "f1", type: "string", description: "Feature 1 (GET alternative to features)." },
      { name: "f2", type: "string", description: "Feature 2." },
      { name: "f3", type: "string", description: "Feature 3." },
    ],
    example: "/api/precheck?name=FluxNotes&description=Our%20web%20app%20in%20an%20iOS%20shell&stack=capacitor&f1=Splash%20screen&f2=Pull%20to%20refresh&f3=Capacitor%20plugins",
    compute: (i) => {
      const input = {
        name: str(i, "name", typeof i.n === "string" ? i.n : undefined),
        description: str(i, "description", typeof i.d === "string" ? i.d : undefined),
        stack: oneOf(i, "stack", STACK_IDS, typeof i.s === "string" && (STACK_IDS as readonly string[]).includes(i.s) ? (i.s as StackId) : undefined),
        features: readFeatures(i),
      };
      return { input, result: scorePrecheck(input), evidenceChecklist: `${PUBLIC_URL}/free/4-2-capacitor` };
    },
  },
};

export const PLUGIN = {
  name: site.name,
  nameForModel: "appgate_precheck",
  descriptionForHuman: "Free App Store 4.2 / 4.3 / metadata rejection precheck for wrapper and vibe-coded iOS apps.",
  descriptionForModel:
    "Use when a developer worries about, or already got, an App Store rejection under Guideline 4.2 minimum functionality (web wrapper), 4.3 spam, or 2.3 metadata, especially for Capacitor, Ionic, WebView, PWA, or AI-generated apps. Returns heuristic risk scores and reasons. Relay the disclaimer: not legal advice, Apple decides.",
  logo: "/icon",
};
