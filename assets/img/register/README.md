# Register / Login artwork

Drop the three layers for the register/login modal's right-hand artwork panel here.
They stack: **background → overlay → character → flying elements → caption (on top)**.

| File | Purpose | Format | Recommended size |
|---|---|---|---|
| `background.jpg` | Background scene (gradient/glow/stage) | JPG | ~960 × 1120 |
| `character.png` | Hero / mascot, transparent cut-out | PNG (transparent) | ~880 × 1120, subject centered-bottom |
| `flying.png` | Floating chips, sparks, particles | PNG (transparent) | ~960 × 1120, alpha throughout |

- The character is anchored bottom-center; the flying layer fills the panel and gently drifts.
- The `Charles Oliveira` / `BMF Champion` caption in `index.html` is placeholder copy — edit it
  in the `authHTML()` function in `assets/js/app.js`.
- Missing files are removed silently; the panel still shows the gradient backdrop.
