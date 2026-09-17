# Evidence checklists and pre-submit risk list

Run this before every resubmit. Overnight packs use the same list, filled in from your rejection text.

Not legal advice. No approval guarantee.

## Screenshot evidence (all 4.2 / 4.3 / metadata cases)

- [ ] Captured from the **iOS binary**, not the website
- [ ] No Safari / Chrome URL bar
- [ ] No debug banners, Expo QR, “localhost”, or generator watermarks
- [ ] Personal data redacted
- [ ] At least one **system UI** (share sheet, permission dialog, keyboard, widget)
- [ ] First launch matches the App Store screenshots
- [ ] Filename or caption maps to a sentence in the Resolution Center reply

## Pre-submit risk list (wrapper / vibe-coded apps)

1. **Same URL as the marketing site, same nav, same cookie banner.** High 4.2 risk.
2. **Lovable / Bolt / v0 / Cursor default card layout still visible.** High 4.3 + metadata risk.
3. **Website checkout for digital goods.** StoreKit problem; do not hide it in a WebView.
4. **Analytics in the wrapped site, “Data Not Collected” in App Privacy.** 5.1.1 risk.
5. **Screenshots from Figma or Android.** 2.3 risk.
6. **Multiple listings with the same IA and icon family.** 4.3 risk.
7. **Reply that argues process (“other apps got through”) instead of evidence.** Wastes the review cycle.
8. **Credentials in a shared doc or a “rescue” vendor login.** Out of scope for AppGate; never do this.

## What to send in an Overnight Pack (you keep ASC)

Paste into `/overnight`:

- Full rejection email / Resolution Center text
- Guideline code if shown
- App Store listing URL if live
- Notes: stack (Capacitor, RN WebView, etc.), native features already shipped, links to 1–3 screenshots

Do **not** send: Apple ID, app-specific passwords, 2FA codes, `.p8` keys, or session cookies.

## Pack contents you should expect back

- Guideline cite and a fix-vs-appeal call
- Filled evidence checklist
- One paste-ready Resolution Center draft
- Resubmit notes (binary vs metadata-only)
- “What not to claim” for your case
- Optional agent prompt for native screens
