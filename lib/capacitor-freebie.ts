export type ChecklistSection = {
  heading: string;
  intro?: string;
  items: string[];
};

export const capacitorFreebie = {
  kicker: "Free · Guideline 4.2 · Capacitor / WebView",
  title: "Evidence checklist for Capacitor apps",
  lede: "Apple is not asking whether Capacitor can call native APIs. Apple is asking whether this binary is more than a website in a frame. Print this. Check boxes. Screenshot the native stuff. Not legal advice. No approval guarantee.",
  sections: [
    {
      heading: "Fix vs appeal",
      items: [
        "If the iOS app is the website plus a splash screen: do not appeal yet. Add native surfaces, rebuild, then reply with evidence.",
        "If native features exist but Review only saw the WebView: reply with dated screenshots of native-only flows.",
        "If 4.2 plus 4.3: uniqueness is a separate argument. Native chrome on a template clone still looks like spam.",
        "If screenshots show native and the binary does not: that is metadata (2.3). Fix the listing or the binary first.",
      ],
    },
    {
      heading: "High-signal native evidence (lead with these)",
      items: [
        "Native tab bar / navigation that is not the website header",
        "iOS share sheet from in-app content (not a web share dialog)",
        "Camera, Photos, document picker, or Files with a system sheet",
        "Push via APNs (not browser web push) with a lock-screen screenshot",
        "Offline mode with a native empty/error state in Airplane Mode",
        "Face ID / Touch ID / passkeys for an in-app lock",
        "StoreKit if you sell digital goods (never website checkout)",
        "Widgets, Live Activities, App Intents, or Spotlight — only if real",
      ],
    },
    {
      heading: "Low-signal (do not lead with these)",
      items: [
        "“We use Capacitor / Swift / Xcode”",
        "A native splash screen or launch storyboard",
        "App icons",
        "Pull-to-refresh on a WebView",
        "“Other Capacitor apps are on the Store”",
        "A settings page that is still HTML",
      ],
    },
    {
      heading: "Screenshots to capture",
      items: [
        "Home: native chrome visible (tabs, native title, no browser URL bar)",
        "One feature that does not exist on the website (annotate the difference)",
        "A system sheet: share, camera, document picker, or biometric prompt",
        "Airplane Mode: app still useful or a native fallback",
        "Push: Notification Center from APNs",
        "Before/after if you just shipped native work (two builds, two dates)",
      ],
    },
    {
      heading: "What not to claim in Resolution Center",
      items: [
        "“Capacitor is native, therefore 4.2 does not apply.”",
        "“Please approve, we are a small indie / we already paid $99.”",
        "“Competitors with wrappers were approved.”",
        "“The website is the product and users prefer it.”",
        "Fake native screenshots or metadata that oversells.",
      ],
    },
  ] satisfies ChecklistSection[],
};

export function capacitorChecklistPlain() {
  const lines = [
    `${capacitorFreebie.title}`,
    "",
    capacitorFreebie.lede,
    "",
  ];
  for (const section of capacitorFreebie.sections) {
    lines.push(`## ${section.heading}`);
    for (const item of section.items) {
      lines.push(`- [ ] ${item}`);
    }
    lines.push("");
  }
  lines.push(
    "Not legal advice. Apple decides. AppGate Pack never logs into App Store Connect.",
  );
  return lines.join("\n");
}
