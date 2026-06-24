# Google + MetaMask SSO logos

Drop the two SSO button icons here for the **Create your account / Login** modal.

| File | Used by | Format | Recommended size |
|---|---|---|---|
| `google.svg` | "Google" button | SVG (transparent) | ~24×24, square |
| `metamask.svg` | "Metamask" button | SVG (transparent) | ~24×24, square |

PNGs also work — just keep the filenames `google.svg` and `metamask.svg`,
or rename inside `assets/js/app.js` (search for `assets/img/register/google.svg`
and `assets/img/register/metamask.svg` in the `authHTML` function).

- They render at **18×18** in the button row.
- If a file is missing, the button falls back to the colored "G" monogram
  for Google or the 🦊 emoji for Metamask, so nothing breaks.
- Background-transparent SVGs are recommended so they read well on the
  dark button surface.
