# Bag (Inventory) Design & Implementation Plan

Purpose

The Bag is the player's inventory view: a single place to see owned items (consumables, skins, crafted items, XP packs), manage quantities, use or sell items, and inspect item details. The Bag is distinct from the Bestiary (which lists beasts and their state).

Design Goals

- Fast scanning and action on mobile: surface most-used items first.
- Clear affordances for `Use`, `Equip`, `Sell`, and `Inspect`.
- Respect tokens in `design/tokens.css` and follow accessibility/touch target rules.

Primary Screens & Flows

1) Bag Grid / List
- Default view: compact grid (3 columns on mobile) of `InventoryItemCard` showing thumbnail, qty badge, and primary action icon.
- Toggle to List view to see larger descriptions and secondary actions.

2) Item Detail / Action Sheet
- Tapping an item opens Detail sheet: large image, full description, quantity selector (if stackable), actions: `Use`, `Equip` (if applicable), `Sell`, `Discard`.
- Confirm destructive actions with a small modal (with cost/return info for sell/discard).

3) Quick Actions & Bulk
- Allow long-press to open quick action menu (use, equip, sell).
- Provide a bulk select mode to sell or use multiple items.

Component Mapping

- Atomic: `ActionButton`, `QuantitySelector`, `PillBadge`.
- Composite: `InventoryItemCard` (thumbnail + qty), `InventoryGrid` / `InventoryList`, `ItemDetailSheet`, `BulkActionsBar`.
- Page: `BagScreen` with header (search + filters), sort, and optional nested modal flows.

Data Model

- BagItem {
  id: string
  itemId: string
  type: 'consumable'|'skin'|'xp'|'material'|'other'
  title: string
  description?: string
  qty: number
  thumbnailUrl?: string
  metadata?: object
}

API Endpoints (suggested)

- GET `/api/bag?userId=` — returns list of BagItem
- POST `/api/bag/use` { userId, itemId, qty } — returns updated bag + effects
- POST `/api/bag/sell` { userId, itemId, qty } — returns updated bag + balance
- POST `/api/bag/discard` { userId, itemId, qty }

Offline & Caching

- Bag must be fetched fresh on load (inventory changes are critical). Cache for a short TTL (e.g., 15s) for navigation performance but always reconcile after actions.

Assets

- Item thumbnails (square), `qty_badge.svg`, `icon_use.svg`, `icon_sell.svg`, `icon_equip.svg` in `assets/bag/` with `@2x` raster fallbacks.

Storybook Stories (minimum)

- `Bag/InventoryItemCard/Default`
- `Bag/InventoryGrid/MultipleItems`
- `Bag/ItemDetail/Consumable` `Bag/ItemDetail/Skin`
- `Bag/BulkSell/Confirm`

Accessibility

- Large tap targets (>=44px), clear aria labels on actions, keyboard-accessible list and modal, proper focus trapping for detail sheet.

Testing

- Visual snapshots for `InventoryItemCard` and `ItemDetailSheet`.
- E2E flows: use consumable, equip skin, sell item and verify server responses and balance updates.

Acceptance Criteria

- Inventory loads and displays items with correct quantities.
- Using or selling an item updates server state and UI immediately after confirmation.
- Destructive actions prompt confirmation and have undo where possible.
