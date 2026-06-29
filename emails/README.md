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

## Outstanding

- **Footer legal details** (company name, address, licence, helpline) are
  placeholders — growl.games was unreachable from the build environment. Provide
  the real values and they'll be applied to all 5 emails.
