# AppGate Overnight Pack (redacted)

**SKU:** Overnight Pack  
**Prepared:** 2026-09-12  
**Window:** Tokyo night → US morning  
**App:** [APP_NAME] (`com.example.[redacted]`)  
**Version reviewed:** 1.0.3 (14)  
**Guideline cited:** 4.2 Minimum Functionality  
**Secondary risk:** metadata screenshots still show web chrome  

> Not legal advice. Not an approval guarantee. Buyer submits in Resolution Center. AppGate does not log into App Store Connect.

---

## 1. What Review said (redacted)

> We noticed that your app provides a limited set of features and content. Apps that primarily display web content and do not provide enough native iOS functionality are not appropriate for the App Store. Specifically, the app appeared to be a website bundled as an app.

Public listing: `https://apps.apple.com/app/id[redacted]` (pre-release / removed).

Stack from buyer notes: **Capacitor 6**, React web app, push **not** wired, share is a web dialog.

---

## 2. Guideline cite

[App Store Review Guidelines — 4.2 Minimum Functionality](https://developer.apple.com/app-store/review/guidelines/#minimum-functionality)

The binary, as described, is a WKWebView of `[APP_NAME]`’s production URL plus a splash screen. Capacitor itself is not evidence.

---

## 3. Fix vs appeal

**Fix first, then reply.** Do not appeal 1.0.3 as-is.

A Resolution Center letter that only says “we use Capacitor and native plugins” will not show the reviewer a tappable native job. Ship 1.1.0 with the surfaces below, then use the draft in §5.

If 1.1.0 still fails 4.2, a second reply can point at the new screenshots. That is a new cycle, not a guarantee.

---

## 4. Evidence checklist (buyer-filled targets)

Native surfaces to add before resubmit:

1. **Native tab bar: Home / Capture / Saved** — IA is not the website header. Screenshot: `[REDACTED_IMG_1]`
2. **iOS share sheet on a Saved item** — system `UIActivityViewController`. Screenshot: `[REDACTED_IMG_2]`
3. **Airplane Mode: Saved items still readable** — offline is not a spinner on the site. Screenshot: `[REDACTED_IMG_3]`

Out of scope for this pack: widgets, IAP, account deletion (no accounts).

**Do not screenshot:** the marketing homepage, cookie banner, or desktop web.

---

## 5. Paste-ready Resolution Center draft

```text
Hello App Review,

Thank you for the Guideline 4.2 feedback on [APP_NAME].

We treated this as a product gap. Binary 1.1.0 ([BUILD]) is no longer a bundled website:

1. Native tab navigation (Home, Capture, Saved) — not the website header.
2. The iOS share sheet from a Saved item (screenshot 2).
3. Saved items remain available in Airplane Mode via on-device storage (screenshot 3).

The WebView is limited to article bodies. Capture and Saved are native. Please review 1.1.0. We will upload from our own App Store Connect account.

[BUYER_NAME]
```

---

## 6. What not to claim

- “Capacitor is native iOS.”
- “Other wrapper apps are on the Store.”
- “Please approve because we already waited two weeks.”
- That push exists, until APNs is actually in the binary.

---

## 7. Resubmit notes

- Upload **1.1.0** with new screenshots that match the three rows above.
- Replace listing shots that show a URL bar (2.3 risk if left in).
- Reply in Resolution Center **after** the new build is processing, using §5 unchanged except brackets.
- AppGate will not be added as a user on the Apple Developer team.

---

## 8. Optional Cursor prompt

```text
Capacitor app rejected for 4.2. Add native tabs (Home, Capture, Saved),
@capacitor/share on Saved items, and Preferences-backed offline read for Saved.
Keep WebView for article HTML only. No fake push. No App Store Connect access.
```

---

*Redaction key: names, bundle suffix, screenshot binaries, and listing ID removed. Structure matches a paid Overnight Pack.*
