# Shop Design & Implementation Plan

Purpose

This document defines the mobile-first visual design, UX flows, data model, API contracts, components, assets, accessibility, testing, and acceptance criteria required to implement the in-app Shop (purchase skins, consumables, beasts, XP packs, and cosmetics).

Goals

- Allow players to browse and search purchasable items quickly on mobile.
- Make purchases frictionless and auditable (server-authoritative purchases and wallet updates).
- Surface relevant filters and promotions (featured, bundles, limited time).
- Ensure designs use `design/tokens.css` for consistent theming and accessibility.

Scope

- Catalog listing (grid + list), product card, product detail modal, purchase flow, purchase confirmation, error states, empty states, promo banners, sorting & filtering, and basic shop admin flags (featured, limited).

Target Platforms

- Mobile-first (320px min width), responsive up to desktop (1200px). Support portrait-primary UX.

Key Metrics

- Conversion rate (view → add to cart → purchase)
- Time-to-purchase (seconds)
- Failed-purchase rate (errors)

UX Flows

1) Browse Catalog
- Header: back/nav, search input, balance pill (use `CurrencyPill`).
- Promo carousel (optional) below header — horizontal swipe, uses `--motion-carousel`.
- Filters row: categories (All, Beasts, Skins, Consumables, XP), sort menu.
- Catalog grid: 2 columns at 320px (card size responsive), 4 columns on wide screens.

2) Product Card -> Quick Purchase
- Product card shows thumbnail, title, short description, price (LuckyChips), small badge for `featured` or `limited`.
- Tapping card opens Product Detail modal.
- Quick buy affordance: long-press or `Buy` CTA on card (configurable by A/B).

3) Product Detail Modal
- Large hero image, full description, tags, quantity selector (if applicable), `Buy` primary CTA, `Preview` secondary.
- Show ownership state (Owned, Equipped) and inventory change notes.

4) Purchase Flow
- When `Buy` tapped:
  - Validate wallet balance client-side and server-side.
  - POST `/api/shop/purchase` with itemId, qty, walletId, clientTimestamp.
  - Show modal progress state (spinner + description).
  - On success: show animated confetti modal with updated balance (server returns new balance and transaction id).
  - On failure: show clear error (insufficient funds, rate limit, validation) with retry and contact support options.

Component Mapping (priority)

- Atomic (priority 1): `ActionButton`, `CurrencyPill`, `Card` (product thumbnail), `PillBadge` (featured/limited), `QuantitySelector`.
- Composite (priority 2): `ProductCard`, `ProductGrid`, `FiltersRow`, `PromoCarousel`, `ProductDetailModal`, `PurchaseToast` / `PurchaseModal`.
- Page (priority 3): `ShopScreen` container that composes header, carousel, filters, grid, and bottomsheets.

Design Tokens & Accessibility

- Use tokens: `--color-surface`, `--color-primary`, `--color-on-primary`, `--type-ui`, `--space-xs|sm|md`, `--radius-sm|md`, `--motion-card-deal` for micro-animations.
- Contrast: ensure CTAs meet WCAG AA (4.5:1 for normal text) and large text meets 3:1 where applicable.
- Touch targets: minimum 44x44dp for interactive elements.
- Reduced motion: respect `prefers-reduced-motion` and a token toggle in Storybook.

Data Model

- ShopItem {
  id: string
  type: 'beast'|'skin'|'consumable'|'xp'|'bundle'
  title: string
  description: string
  price: { amount: number, currency: 'LuckyChips' }
  thumbnailUrl: string
  heroUrl?: string
  tags?: string[]
  featured?: boolean
  limitedUntil?: ISODate | null
  purchasableQuantity?: number | null
  metadata?: object
}

- PurchaseRequest {
  userId: string
  itemId: string
  qty: number
  clientNonce?: string
}

- PurchaseResult {
  success: boolean
  transactionId?: string
  newBalance?: { amount:number, currency:string }
  errors?: { code:string, message:string }[]
}

API Endpoints (suggested)

- GET `/api/shop/items?category=&q=&page=&limit=&sort=` — returns paged list
- GET `/api/shop/items/:id` — item detail
- POST `/api/shop/purchase` — body PurchaseRequest, returns PurchaseResult
- GET `/api/wallet` — returns user balance

Client Behavior & Offline

- Cache catalog for 60s; show stale-while-revalidate UX.
- For purchases: require online; if offline show a clear CTA to reconnect.

Promotions & Bundles

- Support flags: `featured`, `discount` (percentage or flat), `bundle` with included item IDs and bundle price.
- Display original price struck-through when discount applies and show savings percentage badge.

Assets Required

- Product thumbnails (square PNG or SVG), hero images (2:1), `badge_featured.svg`, `badge_limited.svg`, `confetti.json` or Lottie for success animation.
- Use `assets/shop/` naming convention; provide `@2x` PNGs for raster images.

Storybook Stories (minimum)

- `Shop/ProductCard/Default`
- `Shop/ProductCard/Featured`
- `Shop/ProductGrid/2ColMobile`
- `Shop/ProductDetailModal/Default`
- `Shop/PurchaseFlow/Success` `Shop/PurchaseFlow/Failure`

Telemetry & Events

- `shop_view` {screen, referrer}
- `shop_item_view` {itemId}
- `shop_add_to_cart` {itemId, qty}
- `shop_purchase_attempt` {itemId, qty, clientNonce}
- `shop_purchase_result` {success, transactionId?, errors?}

Testing

- Visual regression: snapshot `ProductCard`, `ProductDetailModal`, `ProductGrid`.
- E2E: simulate purchase happy path, insufficient funds, network failure.
- Contract tests: validate `/api/shop/purchase` success and error schemas.

Acceptance Criteria

- Browse: catalog renders in 2-column grid at 320px with readable title and price.
- Detail: product modal displays hero, description, price, and Buy CTA.
- Purchase: server returns success and wallet updates; UI shows confirmation with transactionId.
- Accessibility: keyboard navigable, focusable modals, ARIA labels, contrast passes.

Implementation Notes

- Implement components using tokens from `design/tokens.css`.
- Prioritize atomic components in Storybook before composing `ShopScreen`.
- Use optimistic UI only for balance updates after server success (no client-only acceptance).

Delivery Estimate (rough)

- Atomic components + stories: 1–2 days
- Composite components + stories: 1–2 days
- API examples + E2E tests: 1–2 days

Next steps

- I can scaffold Storybook TSX stories for the atomic shop components (`ProductCard`, `ActionButton`, `CurrencyPill`) next. Proceed to scaffold these files now?  
