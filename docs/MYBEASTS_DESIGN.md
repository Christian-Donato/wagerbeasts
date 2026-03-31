# MyBeasts — Player Beast Management Design & Plan

Purpose

`MyBeasts` is the player-facing area that lists the player's owned beast instances, their current status (active/inactive), equipment (skins), level/Xp, passives, and quick actions (set active, feed XP, equip skin, send to battle). This document defines UX flows, components, API contracts, telemetry, assets, accessibility, testing, and acceptance criteria required for implementing `MyBeasts`.

Design Goals

- Make it fast to find and prepare a beast for play (set active, equip, feed).  
- Surface key metadata at a glance: level, XP progress, rarity, current HP/status, equipped skin.  
- Support bulk operations (mass feed, mass sell if allowed) and safe destructive confirmations.

Target Platforms

- Mobile-first (320px), responsive to tablet and desktop. Prioritize single-column scannability and large touch targets.

Primary Screens & Flows

1) MyBeasts Index
- Header: back/nav, search by name/species, active beast indicator, `CurrencyPill` for XP packs or LuckyChips.  
- Beast list: vertical list of `BeastCard` rows showing portrait, nickname/species, level, small XP bar, and a context overflow menu (⋯) for actions.  
- Sorting & Filters: sort by Level, XP, Recently Acquired, Rarity; filter by Type/Rarity/Active.

2) Beast Detail / Management
- Tap a `BeastCard` to open `BeastDetailPanel`: large portrait, stats, passives, equipped skin, action row (`Set Active`, `Feed`, `Equip Skin`, `Inspect History`).  
- `Feed` opens `FeedModal` (select XP pack from Bag, quantity, preview level gains).  
- `Equip Skin` shows available skins (from Bag or shop-owned) with preview and confirm.

3) Quick Actions
- Long-press or use overflow menu for quick actions: `Set Active`, `Feed 1 XP Pack`, `Equip Last Used Skin`, `View Profile`.  
- Support multi-select mode for bulk feed (select beasts → apply XP pack across selection) and bulk transfer/sell if policy allows.

Component Mapping

- Atomic: `ActionButton`, `XPBar`, `StatChip`, `SmallPill` (rarity), `Portrait`.
- Composite: `BeastCard` (row), `BeastList`, `BeastDetailPanel`, `FeedModal`, `EquipSkinPicker`, `BulkActionsBar`.
- Page: `MyBeastsScreen` composing header, filters, list, and modals.

Data Model

- BeastInstance {
  id: string
  speciesId: string
  nickname?: string
  level: number
  xp: number
  hp?: number
  status?: 'idle'|'in_battle'|'resting'
  equippedSkinId?: string
  rarity: 'common'|'rare'|'epic'|'legendary'
  acquiredAt: ISODate
}

- FeedRequest { beastId: string, xpItemId: string, qty: number }

API Endpoints (suggested)

- GET `/api/mybeasts?userId=&sort=&filter=` — paged list of owned beasts (includes minimal instance data)
- GET `/api/mybeasts/:id` — beast instance detail (full stats, history)
- POST `/api/mybeasts/setActive` { userId, beastId } — sets active beast
- POST `/api/mybeasts/feed` { beastId, xpItemId, qty } — returns updated BeastInstance and transactions (xp gained, level changes)
- POST `/api/mybeasts/equipSkin` { beastId, skinId } — returns updated instance

Client Behavior & State

- Show optimistic UI for `setActive` locally but reconcile with server response.  
- For `feed` and `equipSkin`, wait for server confirmation before showing final state (these may alter level/stats).  
- Handle `in_battle` or locked states: disable management actions with tooltip explaining why.

Storybook Stories (minimum)

- `MyBeasts/BeastCard/Default`  
- `MyBeasts/BeastCard/LowXP`  
- `MyBeasts/BeastDetail/LevelUp`  
- `MyBeasts/FeedModal/PreviewLevelGain`  

Telemetry & Events

- `mybeasts_view` {screen, countVisible}  
- `mybeast_select` {beastId}  
- `mybeast_set_active` {fromBeastId?, toBeastId}  
- `mybeast_feed_attempt` {beastId, xpItemId, qty}  
- `mybeast_feed_result` {success, beastId, xpGained, levelChange}

Assets Required

- Portraits and thumbnails (from Bestiary assets), rarity badges, level-up Lottie or sprite, `icon_equip.svg`, `icon_feed.svg`, `icon_active.svg` in `assets/mybeasts/`.

Accessibility

- Ensure `BeastCard` rows are keyboard focusable with descriptive ARIA labels summarizing name, level, and actions.  
- FeedModal: focus trap, accessible number input for quantity, clear success/failure announcement for screen readers.

Testing

- Visual regression for `BeastCard`, `BeastDetailPanel` and `FeedModal` in multiple states (near-level, leveled-up).  
- E2E: feed XP pack happy path, set active beast, equip skin. Validate server responses and UI reconciliation.

Acceptance Criteria

- MyBeasts index loads and displays owned beasts with accurate levels and XP bars.  
- Feeding an XP pack updates beast XP and level according to server response; level-up animates and notifies player.  
- Setting active beast updates player state and is reflected in header/other screens.

Implementation Notes

- Reuse `BeastCard` and portrait assets from Bestiary; ensure single source of truth for species metadata.  
- Prioritize `FeedModal` and `Set Active` flows for first pass — they have highest player-impact.  

Delivery Estimate (rough)

- Atomic + stories: 1 day  
- Composite + stories + E2E: 1–2 days  

Next Steps

- I can scaffold `BeastCard` and `FeedModal` Storybook stubs next, or create API request/response JSON examples for the endpoints above. Which do you prefer I do now?
