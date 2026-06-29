# Growl Games — Email Newsletter Series

A set of **5 HTML email newsletters** for bulk marketing of Growl Games.
Email-safe (table-based layout, inline styles, mobile-responsive) and modelled on
the bold, single-offer casino-promo style from the Behance reference set.

## The 6 offers promoted across the series

1. 100% deposit bonus up to **$2,000**
2. **$5** bonus on each referral
3. **13,000+** casino games, **16+** sports + biggest esports betting library
4. **20+** cryptocurrencies accepted
5. Daily spin bonuses
6. Daily, weekly & monthly login rewards

Each email **leads** with one hero offer and teases the rest, so the full set
covers everything.

| # | File | Lead offer | Status |
|---|------|-----------|--------|
| 01 | `newsletter-01-welcome-bonus.html` | 100% deposit bonus up to $2,000 | ✅ Draft |
| 02 | _tbd_ | Referral / $5 per friend | ⏳ |
| 03 | _tbd_ | 13,000+ games · sports · esports | ⏳ |
| 04 | _tbd_ | 20+ crypto + daily spins | ⏳ |
| 05 | _tbd_ | Login rewards (daily/weekly/monthly) | ⏳ |

> Lead-offer split above is a proposal — we'll confirm per email as we go.

## How images work

- HTML uses **relative paths** (`assets/...`) so you can open the file locally
  next to `/assets` and preview it.
- **Placeholder PNGs** (labeled with filename + size) ship in `/assets` so the
  layout is visible now. Overwrite them with real artwork using the same names.
- **Before sending:** host `/assets` on your CDN and find-and-replace
  `src="assets/` with your hosted base URL.
- Per-email image specs live in `ASSETS-newsletter-01.md` (and the equivalent for
  each future email).

## Folder structure

```
emails/
├── README.md
├── newsletter-01-welcome-bonus.html
├── ASSETS-newsletter-01.md
└── assets/
    ├── brand/      logo (header + footer)
    ├── newsletter-01/  hero artwork
    ├── icons/      offer/feature icons
    ├── badges/     18+ / secure badges
    └── social/     footer social icons
```

## Brand system (applies to all 5 emails)

- **Font:** Exo 2 (loaded via `<link>`/`@import`, applied everywhere; Gmail/Outlook
  fall back to Trebuchet/Arial).
- **Palette:** navy `#0a1430`, blue `#1f7ae0`, gold `#ffd21e`, purple `#6d3bf5`,
  cyan `#19c3f3` (from the Growl swatches).
- **Footer:** matches growl.games — cert row, gorilla logo + description, contact
  emails, socials, Growl Games / Resources / Legal columns, operator + Gaming
  Curaçao logos, the Stack Games Limited / Anjouan licence text, `©2025 growl.games`.
- **Headlines:** heavy italic uppercase with navy outline + 3D extrude (reference style).
- **Structure:** hero (character 1) → offer + CTA → second banner (character 2) →
  feature grid → secondary CTA → footer → end-of-email art strip.

## Outstanding

- Replace placeholder artwork (hero, second banner, end-art, certification &
  operator logos) — see `ASSETS-newsletter-01.md`.
- Confirm/adjust the icon→offer mapping if desired.
