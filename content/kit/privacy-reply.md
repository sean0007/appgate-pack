# Privacy reply skeleton (Guideline 5.1.1)

Use this when Review cites **5.1.1** (privacy policy, data collection, permission strings), nutrition label mismatch, or tracking that the WebView does without declaring it.

Wrapper apps fail this when the website’s analytics SDK loads inside WKWebView while App Privacy says “Data Not Collected.”

Not legal advice. No approval guarantee. This is not a DPIA and not counsel.

## Align three sources of truth

1. **What the binary does** (native plugins + WebView third parties)
2. **App Privacy answers** in App Store Connect
3. **Privacy policy** at the public URL

If any of the three disagrees, fix the product or the answers before arguing.

## Wrapper-specific traps

- Google Analytics / Meta pixel / session replay in the wrapped site
- Third-party fonts and CDNs that set cookies
- Sign-in with a website that collects email while the label says no contact info
- Capacitor plugins: camera, geolocation, contacts, tracking ATT
- Missing `NSCameraUsageDescription` (and friends) when a plugin can trigger the prompt
- “Sign in with Apple” required if you offer other third-party logins

## Evidence checklist

- [ ] Privacy policy names the iOS app, data categories, and retention in plain language
- [ ] App Privacy labels match actual SDKs (including those injected by the website)
- [ ] Permission strings describe a real in-app use, not “for better experience”
- [ ] Tracking vs not tracking matches ATT if you use advertising identifiers
- [ ] Account deletion path exists if you create accounts
- [ ] You can screenshot Settings → Privacy disclosures or the in-app policy screen

## Paste-ready skeleton

```text
Hello App Review,

Thank you for the 5.1.1 / privacy note on [APP_NAME].

We aligned the binary, App Privacy answers, and the policy at [POLICY_URL]:
- Data we collect: [CATEGORIES], used for [PURPOSE], linked to identity: [YES/NO].
- Third parties in the WebView: [LIST OR “none after this build”]. We [removed / disclosed] [SDK].
- Permission strings: [CAMERA / LOCATION / …] fire only when the user starts [FEATURE].
- Account deletion: [PATH], documented in the policy.

We do not ask you to ignore undeclared collection. The resubmitted build and labels match. We will upload from our own App Store Connect account; we are not providing credentials.

[NAME]
```

## What not to claim

- “It’s just a WebView so Apple’s privacy labels do not apply.”
- “Analytics is anonymized” without checking the actual SDK.
- Copy-pasted privacy policies that name the wrong company or only GDPR for a different product.
