# Newsletter #01 — Asset Manifest (Welcome / 100% Deposit Bonus up to $2,000)

Drop your final artwork into the folders below using these **exact filenames** so
the HTML picks them up with no edits. Placeholder PNGs are already in place so you
can preview the layout — just overwrite them.

> **Before sending:** host the whole `emails/assets/` folder on your CDN and
> find-and-replace `src="assets/` → `src="https://YOUR-CDN/email/welcome/`
> in `newsletter-01-welcome-bonus.html` (keep the sub-paths identical).

## Folder: `emails/assets/`

| # | File path | Pixel size (export @2x as shown) | Displayed | Purpose / notes |
|---|-----------|----------------------------------|-----------|-----------------|
| 1 | `assets/brand/growl-logo-white.png` | 360 × 96 | 180 × 48 | Header logo. White/light version on dark header. Transparent PNG. |
| 2 | `assets/brand/growl-logo-mark.png` | 220 × 64 | 120 × 35 | Small footer logo/wordmark. Transparent PNG. |
| 3 | `assets/newsletter-01/hero-welcome.png` | 1200 × 1240 | 600 wide | **Hero artwork.** Bake the themed background + Growl mascot/character into one image (like the reference emails). Keep any baked-in text minimal — the headline below is live HTML. |
| 4 | `assets/icons/icon-games.png` | 112 × 112 | 56 × 56 | "13,000+ games / sports / esports" row icon. |
| 5 | `assets/icons/icon-crypto.png` | 112 × 112 | 56 × 56 | "20+ cryptocurrencies" row icon. |
| 6 | `assets/icons/icon-referral.png` | 112 × 112 | 56 × 56 | "$5 per referral" row icon. |
| 7 | `assets/icons/icon-spin.png` | 112 × 112 | 56 × 56 | "Daily spin bonuses" row icon. |
| 8 | `assets/icons/icon-rewards.png` | 112 × 112 | 56 × 56 | "Login rewards" row icon. |
| 9 | `assets/badges/badge-18plus.png` | 88 × 88 | 44 × 44 | Responsible-gaming 18+ badge (footer). |
| 10 | `assets/badges/badge-secure.png` | 88 × 88 | 44 × 44 | Optional SSL/secure badge (not yet placed in HTML; available if you want it). |
| 11 | `assets/social/facebook.png` | 64 × 64 | 32 × 32 | Footer social icon. |
| 12 | `assets/social/instagram.png` | 64 × 64 | 32 × 32 | Footer social icon. |
| 13 | `assets/social/x.png` | 64 × 64 | 32 × 32 | Footer social icon (Twitter/X). |
| 14 | `assets/social/telegram.png` | 64 × 64 | 32 × 32 | Footer social icon. |
| 15 | `assets/social/youtube.png` | 64 × 64 | 32 × 32 | Footer social icon. |

## Copy in this email (live HTML text — written for you, edit freely)

- **Preheader:** Welcome to the pack — your first deposit doubles, up to $2,000. Plus daily spins, login rewards & 13,000+ games.
- **Kicker:** NEW PLAYER WELCOME OFFER
- **Headline (H1):** Double Your First Deposit
- **Offer:** 100% Deposit Bonus / UP TO $2,000
- **Body:** Join the pack, make your first deposit, and we'll match it dollar-for-dollar — so you start with twice the firepower.
- **Primary CTA:** Claim My 100% Bonus →
- **Secondary CTA:** Join Growl Games
- **Tagline:** Growl Games — Play Bigger

## Merge tags / links to fill in (ESP variables)

`{{cta_url}}` `{{site_url}}` `{{view_in_browser_url}}` `{{casino_url}}`
`{{sports_url}}` `{{esports_url}}` `{{promotions_url}}` `{{vip_url}}`
`{{facebook_url}}` `{{instagram_url}}` `{{x_url}}` `{{telegram_url}}` `{{youtube_url}}`
`{{unsubscribe_url}}` `{{preferences_url}}` `{{email}}`
`{{helpline_number}}` `{{company_legal_name}}` `{{company_address}}`
`{{licensing_authority}}` `{{licence_number}}`

> ⚠️ **Footer legal block:** I couldn't reach https://growl.games (it's blocked by
> this environment's network policy), so the company name, address, licence and
> helpline are placeholders. Send me the real footer text (or paste your site
> footer) and I'll lock it in across all 5 newsletters.
