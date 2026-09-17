# Metadata reply skeleton (Guideline 2.3.x)

Use this when Review cites **2.3 Accurate Metadata**, screenshot mismatch, keyword stuffing, placeholder copy, or “the app is not as advertised.”

Common with vibe-coded exports: marketing site screenshots, desktop web captures, lorem in the description, or AI chrome that is not in the binary.

Not legal advice. No approval guarantee.

## What to fix before you write

Metadata must match **this** binary, **this** locale, **this** device class.

- [ ] App name and subtitle describe the actual job (not a keyword list)
- [ ] Description has no “Lorem,” “TODO,” competitor names used as keywords, or “ChatGPT-powered” claims you cannot show
- [ ] Screenshots are from the iOS app, not the website or Figma
- [ ] 5.5" / 6.7" sets are not stretched Android captures
- [ ] In-app purchases match StoreKit products, not a website price table
- [ ] Support URL and privacy policy load, are app-specific, and match the privacy nutrition labels
- [ ] Preview video, if any, does not show features behind a web paywall Apple cannot purchase in-app

If screenshots still show a browser URL bar, fix the build first (see the 4.2 checklist).

## Paste-ready skeleton

```text
Hello App Review,

Thank you for the metadata feedback on [APP_NAME].

We updated the listing so it matches binary [VERSION] ([BUILD]):
- Name / subtitle: [ACCURATE_PHRASE]
- Description: removed [PLACEHOLDER / KEYWORD_LIST / UNSUPPORTED_CLAIM]
- Screenshots: captured on [DEVICE] from the iOS app, showing [SCREENS]. They no longer use website or mockup frames.
- Support URL and privacy policy: [URLS], aligned with the privacy labels in App Store Connect.

The binary behavior has not been oversold. If any screenshot still looks like web content, it is because [BRIEF_NATIVE_CONTEXT]; the 4.2 notes (if any) are addressed separately.

We will upload the corrected metadata / new build from our own App Store Connect account.

[NAME]
```

## What not to claim

- “Screenshots are aspirational / coming next sprint.”
- “The website is more up to date than the app.”
- Keyword stuffing as “ASO best practice.”
- Another team’s screenshots or stock UI kits as if they were your app.
