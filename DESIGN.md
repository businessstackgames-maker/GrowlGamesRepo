# DESIGN.md — NodeRoll design system

Single source of truth for tokens and component rules. Implemented as CSS custom
properties in `assets/css/styles.css`.

## Color

Base is the darkest brand color; neons are **accents only** (product register:
accents carry actions/state, not decoration).

| Token | Value | Role |
|---|---|---|
| `--bg` | `#1C1C1C` | Page base (brand requirement) |
| `--surface-1` | `#242424` | Cards, sidebar, top bar |
| `--surface-2` | `#2C2C2C` | Raised panels, inputs, hover fills |
| `--surface-3` | `#383838` | Borders-as-fill, dividers |
| `--line` | `rgba(255,255,255,.08)` | Hairline borders |
| `--ink` | `#FFFFFF` | Headings, logo, primary text |
| `--text` | `#ECECEC` | Body |
| `--muted` | `#A6A6A6` | Secondary text (7:1 on `--bg`, AA pass) |
| `--violet` | `#5D31FF` | **Primary** action / brand |
| `--purple` | `#8303F9` | Secondary brand / gradients |
| `--sky` | `#6DCAFD` | Highlights, info, links |
| `--magenta` | `#FF00FF` | Live / hot / alerts |
| `--lime` | `#DBEE42` | Wins, money, deposit CTA (ink: `#1C1C1C`) |

Contrast: body/muted verified ≥4.5:1 on `--bg`. Text on `--lime` and on light
fills is always `#1C1C1C`. No gradient text. Glow is shadow, never text fill.

## Type — Bebas Neue only

Bebas Neue is a single-weight condensed display caps face. Hierarchy comes from
**size, color, opacity, and letter-spacing**, not weight. Small text gets
positive tracking + tabular figures so balances stay legible.

| Token | Size | Tracking | Use |
|---|---|---|---|
| `--fs-logo` | 28px | .10em | Wordmark |
| `--fs-display` | clamp(40px,6vw,72px) | -.01em | Hero headline |
| `--fs-h2` | 26px | .01em | Section titles |
| `--fs-lg` | 20px | .02em | Banner subhead, prices |
| `--fs-base` | 18px | .02em | Body, nav, buttons |
| `--fs-sm` | 15px | .04em | Meta, balances (tabular-nums) |
| `--fs-xs` | 13px | .06em | Badges, labels |

Loaded via Google Fonts `<link>` with fallback `'Oswald','Anton','Arial Narrow'`.
(Production follow-up: self-host the woff2.)

## Space / radius / z

- Spacing scale: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 (`--s-1`…`--s-8`).
- Radius: `--r-sm` 8, `--r-md` 12, `--r-lg` 16, `--r-xl` 22, `--r-pill` 999.
- Z-scale (semantic, no magic 9999): sidebar 20 · topbar 30 · drawer-backdrop 40 · drawer 45 · dropdown 50 · modal-backdrop 60 · modal 65 · toast 70.

## Elevation & glow
Shadows tinted toward the brand, not pure black. Neon "glow" = colored box-shadow
on hover/active only. Glassmorphism is not a default.

## Motion (Emil Kowalski / review-animations)
- 120–220ms, `--ease-out: cubic-bezier(.22,1,.36,1)`. No bounce/elastic.
- Animate `transform`/`opacity`/`filter` only. Hovers use transitions (interruptible), not keyframes.
- Popover/dropdown scales from its trigger origin; never `scale(0)` (start .96 + opacity).
- `prefers-reduced-motion`: drop movement + autoplay, keep opacity/color.
- Product register: no orchestrated page-load sequence; motion conveys state.

## Signature components
- **Hero promo banner:** 570×265 unit (`aspect-ratio:570/265`), brand-gradient, in a snap carousel.
- **Game tile:** colored art + provider label + Bebas title + tag; states: default / hover (lift+glow+play) / locked (region) / badges (HOT/NEW).
- **Wallet dropdown:** balance pill → currency list, "Hide 0 balances" / "Display in fiat".
- **Mobile bottom nav:** Menu · Search · Deposit (raised) · Lobby · Spin.
