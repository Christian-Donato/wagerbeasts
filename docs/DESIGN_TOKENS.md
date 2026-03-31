# Design Tokens (usage)

This document explains the canonical design tokens for WagerBeasts and how to consume the JSON / CSS variable files.

Files added:

- `design/tokens.json` — machine-readable token source for tools, design systems, and automated generation.
- `design/tokens.css` — ready-to-import CSS variables for the frontend build.

How to use

- Frontend (CSS / SCSS): import `design/tokens.css` near the top of your entry stylesheet and reference `var(--color-primary)` etc.

Example SCSS import:

```scss
@import '../design/tokens.css';

.action-button {
  background: linear-gradient(45deg, var(--color-primary), var(--color-primary-strong));
  color: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  transition: transform var(--motion-micro) ease;
}
```

- Tooling: the `design/tokens.json` file can be consumed by build scripts or a token pipeline (Style Dictionary, Theo) to generate platform-specific tokens.

Notes

- Keep `design/tokens.json` as the source-of-truth; update the CSS file or re-generate it from the JSON when tokens are changed.
- Color variables follow the names used in the Neon Kineticism spec; feel free to add aliases for legacy class names when migrating components.
