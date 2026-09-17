# Resolution Center reply skeletons

Six paste-ready drafts. Replace every `[BRACKET]`. Keep replies short, factual, and tied to what a reviewer can tap. Do not attach Apple ID passwords. Do not promise that Apple must approve.

Not legal advice. No approval guarantee.

---

## 1. 4.2 — native features added after rejection

```text
Hello App Review,

Thank you for the Guideline 4.2 feedback on [APP_NAME] ([BUNDLE_ID]).

We treated this as a product gap, not a wording gap. Binary [VERSION] ([BUILD]) adds native iOS surfaces that are not available on [WEBSITE_URL]:

1. [FEATURE_1 — e.g. native tabs + Share sheet on saved items]
2. [FEATURE_2 — e.g. APNs alerts for [EVENT]]
3. [FEATURE_3 — e.g. offline library via on-device storage]

Attached screenshots were taken from this build on [DEVICE], including Airplane Mode for the offline path. The WebView remains for [LIMITED_CONTENT_AREA] only.

We are not requesting an exception to 4.2. Please review the new binary. We will submit from our own App Store Connect account.

[NAME]
```

---

## 2. 4.2 — native features already existed; evidence was unclear

```text
Hello App Review,

Thank you for the 4.2 note. We believe the rejection reflects what was easy to miss on first launch, not the absence of native functionality.

Without creating an account, a reviewer can:
1. Open [SCREEN] from the native tab bar (not the website header)
2. Trigger [SYSTEM_SHEET: share / camera / Face ID]
3. Use [OFFLINE_OR_PUSH_FLOW]

Screenshots [A–C] show those paths on binary [VERSION]. The marketing website does not include [FEATURE].

If a specific screen still looks web-only, it is [CONTENT_VIEW]; chrome and [CORE_JOB] are native. Happy to point to a hidden gesture / debug screen if useful: [HOW].

[NAME]
```

---

## 3. 4.3 — not a clone of another product

```text
Hello App Review,

Thank you for the Guideline 4.3 feedback on [APP_NAME].

This app’s job is [ONE_SENTENCE], for [AUDIENCE]. It is not a duplicate of [INCUMBENT_OR_TEMPLATE]. On first launch the reviewer can see:

1. [UNIQUE_WORKFLOW]
2. [UNIQUE_DATA_SOURCE]
3. [UI that is not a color-swap of our other listings / of a public starter]

Name, screenshots, and the binary now show this job only. We are not arguing that category similarity is enough; we are showing a different product. Screenshots attached.

[NAME]
```

---

## 4. 4.3 — not spam from a multi-app account

```text
Hello App Review,

Thank you for the 4.3 spam note.

[APP_NAME] is the only listing we intend for [JOB]. Our other apps (if any) serve [OTHER_JOBS] with separate binaries, data, and UI. This submission is not a keyword variant of those apps.

Differentiation visible in this binary:
- [BUNDLE_ID / name]
- [FIRST_RUN]
- [FEATURE unique to this listing]

We removed shared template assets and aligned metadata so the apps cannot be mistaken for a farm. Please review [VERSION].

[NAME]
```

---

## 5. Metadata (2.3.x) — listing now matches the binary

```text
Hello App Review,

Thank you for the metadata feedback.

We corrected the listing for [APP_NAME] so it matches binary [VERSION]:
- Replaced website / mockup screenshots with device captures of [SCREENS]
- Rewrote the description to remove [PLACEHOLDERS / UNSUPPORTED CLAIMS]
- Matched IAP / support URL / privacy policy to what the app actually does

We will not ship aspirational screenshots. Please review the updated metadata and build.

[NAME]
```

---

## 6. Privacy (5.1.1) — labels, policy, and binary aligned

```text
Hello App Review,

Thank you for the privacy / 5.1.1 feedback.

We aligned three things: the binary, App Privacy answers, and [POLICY_URL].
- Collected data: [CATEGORIES] for [PURPOSE]
- WebView third parties: [REMOVED or DISCLOSED]
- Permission strings: [KEYS] used only for [FEATURES]
- Account deletion: [PATH] if accounts exist

Please review the resubmitted build and labels. We are not providing App Store Connect access.

[NAME]
```
