# SatoshiSpin brand mark

Drop your **SatoshiSpin** logo icon here and it replaces the placeholder mark
in the sidebar (top-left) and the footer.

| File | Format | Recommended size |
|---|---|---|
| `logo.svg` | SVG (preferred) | square, viewBox `0 0 24 24` or similar |

PNG also works — just keep the filename `logo.svg`, **or** rename the file
extension in the two `<img class="logo__img" src="assets/img/brand/logo.svg" …>`
references in `index.html` (one in the sidebar `.sidebar__top`, one in
the footer `.footer__brand`).

- **Size on screen:** 22×22 in the sidebar, 24×24 in the footer.
- **Aspect:** square or roughly square — taller logos get letter-boxed via `object-fit: contain`.
- **Color:** the SVG sprite fallback (a stylized "S") shows automatically if the file is missing.

If you have separate marks for sidebar vs. footer, drop both here and edit
the `src` values in `index.html` to point at each one (e.g., `logo-sidebar.svg`
and `logo-footer.svg`).
