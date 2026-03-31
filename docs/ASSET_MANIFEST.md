# Asset & Icon Inventory (UI)

Purpose

This manifest lists the UI assets required to implement the blackjack screen and general app chrome. It specifies filenames, recommended formats, pixel sizes (1x/2x), export settings, and suggested folder structure so frontend, design, and QA teams have a single source of truth.

Folder structure (recommended)

- assets/
  - ui/
    - cards/
      - card_face_*.png (or svg for vector pips)
      - card_back.png
      - card_back@2x.png
    - icons/
      - luckychip.svg
      - icon_hit.svg
      - icon_stand.svg
      - icon_double.svg
      - icon_split.svg
      - paw.svg (card back motif)
    - nav/
      - nav_beasts.svg
      - nav_games.svg
      - nav_shop.svg
      - nav_rankings.svg
    - avatars/
      - avatar_placeholder.png
      - avatar_placeholder@2x.png
  - beasts/
    - [species_id]/
      - portrait_square.png
      - portrait_square@2x.png
      - portrait_full.png
      - portrait_full@2x.png
      - thumbnail.png
  - logos/
    - wagerbeasts_wordmark.svg
    - wagerbeasts_wordmark@2x.png

Naming conventions

- Use lowercase, hyphen-delimited filenames.
- Append `@2x` for retina (2x) raster exports.
- Prefer `svg` for icons and wordmarks. Use `png` (or WebP) for rasterized portraits and complex art.

Card assets

- `assets/ui/cards/card_face_{rank}_{suit}.png`
  - Example: `card_face_A_hearts.png`, `card_face_10_diamonds.png`.
  - Sizes: base width 96 px (mobile player cards) and corresponding `@2x` at 192 px. Provide vector suit glyphs where possible.
- `assets/ui/cards/card_back.png` & `card_back@2x.png` — branded backplate with micro-dot pattern and paw glyph. Provide a vector `card_back.svg` if usable.

Icons & action glyphs

- Provide monochrome SVG icons with optional colored fills.
- Files:
  - `icon_hit.svg` (plus symbol)
  - `icon_stand.svg` (raised hand)
  - `icon_double.svg` (double-chevron or up-arrow)
  - `icon_split.svg` (split arrows)
  - `luckychip.svg` (token glyph)
  - `paw.svg` (card back motif)

Sizes & variants

- Icons: SVG primary; export PNG fallbacks at 24px, 32px, 48px with `@2x` for raster consumption.
- Nav icons: SVG, 28–36 px visual weight depending on placement; include an active/filled and inactive/outline variant.

Beast portraits

- Each beast must include:
  - `portrait_square.png` — square-cropped art used in center portrait (recommended 160 px base, 320 px @2x)
  - `portrait_full.png` — larger art for modals or profile (512 px base, 1024 px @2x)
  - `thumbnail.png` — small thumbnail (64 px base, 128 px @2x)
- Provide transparent PNGs (RGBA) with safe inner composition so aura glows can be rendered behind.
- Filenames should contain `species_id` to map to DB entries, e.g. `beasts/fire-dragon/portrait_square.png`.

Avatar placeholders

- `avatar_placeholder.png` and `@2x` — circular framed avatar at 48 px base.

Wordmark & logo

- `logos/wagerbeasts_wordmark.svg` — primary wordmark in green-ready variant.
- Also provide a full-color PNG fallback at 2x for email or other raster contexts.

Bottom navigation icons

- `nav_beasts.svg`, `nav_games.svg`, `nav_shop.svg`, `nav_rankings.svg` — provide active (filled) and inactive (outline) variants. Keep stroke weight consistent with UI icon set.

Other UI assets

- Passive status chip background: provide a small rounded pill PNG or SVG (`chip_passive.svg`) sized at ~160×56 px base for composition.
- Currency pill background: `pill_currency.svg` (or CSS-only using tokens). Provide raster alternative at 84×64 px.

Export settings & optimization

- SVG: Clean paths, no embedded raster images, keep viewBox and minimal metadata. Provide `id` attributes for icons if animated.
- PNGs: sRGB, 8-bit PNG with alpha, optimized (pngquant or ImageOptim). Provide WebP versions for web delivery where supported.
- Filenames: avoid spaces and special characters; prefer percent-encoding in any links.

Responsive and density guidelines

- Provide `1x` and `2x` raster variants for all critical UI images.
- For portrait art and large illustrations, consider providing `3x` assets if expecting large-screen usage.

Placeholder & designer handoff

- If final assets are not ready, include visually representative placeholders named `placeholder_card_back.png`, `placeholder_beast_fire-dragon.png` etc. Mark placeholders clearly in filenames.
- Designers should export assets into the `assets/` tree and attach the original Figma/Sketch/PSD file path in the manifest entry.

Mapping to frontend

- Frontend should implement an `AssetLoader` utility that resolves `species_id` → `assets/beasts/{species_id}/portrait_square@2x.png` with fallback to placeholder.
- Use CSS variables and tokenized sizes for responsive scaling.

Acceptance checklist for assets

- All icons available as SVG + PNG fallbacks.
- All cards provided (face/back) at 1x and 2x.
- Beast portraits available for every species in DB or have placeholder entry.
- Wordmark and nav icons provided in vector form.
- Assets optimized and added to `assets/` with correct filenames.

Next steps for design handoff

1. Designer: Export assets into `assets/` following the manifest structure.
2. Developer: Implement `AssetLoader` and update references in components.
3. QA: Verify pixel assets on 1x, 2x devices and run a visual checklist (contrast, alpha edges, cropping).
