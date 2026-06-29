# Newsletter #01 — Asset Manifest (Welcome / 100% Deposit Bonus up to $2,000)

All images live under `emails/assets/`. The HTML uses **relative paths** so you
can preview locally. **Before sending:** host `/assets` on your CDN and
find-and-replace `src="assets/` → `src="https://YOUR-CDN/email/welcome/`.

> ⚠️ Two uploaded files were renamed for URL/ESP safety: `gg logo.png` → **`gg-logo.png`**,
> and `18+.png` → **`18plus.png`** (a white version `18plus-white.png` is auto-derived for the blue footer).

## ✅ Your uploaded assets — already hooked up

| File | Used for |
|------|----------|
| `brand/gg-logo.png` | Header logo **and** footer logo |
| `badges/18plus.png` / `badges/18plus-white.png` | 18+ badge (white version sits on the blue footer) |
| `badges/ssl.png` | "Secure / SSL" badge in footer |
| `icons/casino.png` | Feature row → **13,000+ casino games** |
| `icons/games.png` | Feature row → **16+ sports & biggest esports** |
| `icons/slots.png` | Feature row → **20+ cryptocurrencies** |
| `icons/most-played.png` | Feature row → **$5 per referral** |
| `icons/vipclub.png` | Feature row → **login rewards** |

> Icon→offer mapping is by best visual fit. To reassign, just swap which file a
> row points to (or rename files) — say the word and I'll re-map.

## 🟨 Placeholders to replace with real artwork (same filenames)

| File | Pixel size | Displayed | Purpose |
|------|-----------|-----------|---------|
| `newsletter-01/hero-welcome.png` | 1200 × 1240 | 600 wide | **Hero — character 1** + themed background (welcome/deposit). |
| `newsletter-01/banner-daily-spins.png` | 1200 × 720 | 600 wide | **Second banner — character 2** + background (Daily Spins / bonus wheel). |
| `newsletter-01/footer-decoration.png` | 1200 × 200 | 600 wide | **End-of-email art strip** (e.g. coins/treasure band, like the reference). |
| `badges/sigma.png` | ~200 × 60 | h 22 | Footer certification logo. |
| `badges/responsible-gambling.png` | ~200 × 60 | h 22 | Footer certification logo. |
| `badges/gamcare.png` | ~200 × 60 | h 22 | Footer certification logo. |
| `badges/betblocker.png` | ~200 × 60 | h 22 | Footer certification logo. |
| `badges/cloud9.png` | ~200 × 60 | h 22 | Footer certification logo. |
| `footer/operator-mark.png` | ~150 × 70 | h 34 | Operator logo (the colourful mark on growl.games). |
| `footer/gaming-curacao.png` | ~180 × 70 | h 34 | Gaming Curaçao logo. |
| `social/*.png` | 64 × 64 | 34 × 34 | **Real social icons** (Instagram, YouTube, TikTok, Facebook, X, Telegram) drawn in Growl yellow. Swap for official brand icons anytime. |

## Design notes (your 8 points)

1. **Real social icons** — generated as recognizable glyphs in Growl-yellow circles.
2. **Footer** — rebuilt to match growl.games: cert row, gorilla logo + description, `Admin@`/`Support@growl.games`, socials, Growl Games / Resources / Legal columns, operator + Gaming Curaçao logos, the full Stack Games Limited / Anjouan licence text, and `©2025 growl.games`.
3. **Two characters** — character 1 in the hero; character 2 in the new **Daily Spins** banner directly under the offer (own bg, headline, subhead, CTA).
4. **Uploaded assets hooked up** — see table above.
5. **End art** — `footer-decoration.png` added at the very bottom.
6. **Font** — **Exo 2** loaded via `<link>`/`@import` and applied everywhere (Gmail/Outlook fall back to Trebuchet/Arial — unavoidable in those clients).
7. **Palette** — navy `#0a1430` / blue `#1f7ae0` / gold `#ffd21e` / purple `#6d3bf5` / cyan `#19c3f3`, per the Growl swatches.
8. **Hero headline** — heavy italic uppercase with navy outline + purple/blue 3D extrude to echo the reference style.

## Copy (live HTML text — edit freely)
- **Hero headline:** Double Your First Deposit · **100% Deposit Bonus · UP TO $2,000**
- **Hero CTA:** Claim My 100% Bonus → · **Body:** Join the pack, make your first deposit, and we'll match it dollar-for-dollar…
- **Banner headline:** Spin To Win, Daily · **CTA:** Spin The Wheel →
- **Secondary CTA:** Join Growl Games

## Merge tags to fill in (ESP)
`{{cta_url}}` `{{site_url}}` `{{view_in_browser_url}}` `{{email}}`
`{{instagram_url}}` `{{youtube_url}}` `{{tiktok_url}}` `{{facebook_url}}` `{{x_url}}` `{{telegram_url}}`
`{{about_url}}` `{{faqs_url}}` `{{contact_url}}` `{{responsible_gaming_url}}` `{{terms_url}}` `{{privacy_url}}` `{{cookie_url}}`
`{{unsubscribe_url}}` `{{preferences_url}}`
