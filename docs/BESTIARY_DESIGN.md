# Bestiary Design & Implementation Plan

Purpose

The Bestiary is a catalog of all beast species and the player's owned beasts. It focuses on creature profiles, stats, progression (level / XP), passives, and evolution/rarity. The Bestiary is separate from the Bag — it represents living assets (beasts) rather than inventory items.

Design Goals

- Present species discovery and owned beasts in an engaging, scannable layout.
- Make it easy to view beast stats, equip skins, view passives, and navigate evolution or fusion paths.
- Reuse tokens from `design/tokens.css` and ensure accessible interactions.

Primary Screens & Flows

1) Bestiary Index
- Split view: top section shows featured / newly acquired beasts; below a searchable list of species and owned beasts.
- Filters: Owned / All / By Rarity / By Type.

2) Beast Card & Detail
- Beast card shows portrait, name, level, small XP bar, and quick action (View / Equip / Set Active).
- Beast detail screen shows full portrait, stats (attack/defense/skill), passive description, possible evolutions, equipped skin, and action buttons (`Set Active`, `Feed (XP)`, `Sell` if allowed).

3) Progression & XP
- Provide `Feed` flow: apply XP packs from Bag to a selected beast; show animated XP increment and level-up animation.

Component Mapping

- Atomic: `StatChip`, `XPBar`, `ActionButton`, `Portrait`.
- Composite: `BeastCard`, `BeastList`, `BeastDetailPanel`, `EvolutionRow`, `FeedModal`.

Data Model

- Species {
  speciesId: string
  name: string
  rarity: 'common'|'rare'|'epic'|'legendary'
  baseStats: { hp:number, attack:number, defense:number }
  passive?: { id:string, name:string, description:string }
  portraitUrl: string
}

- BeastInstance {
  id: string
  speciesId: string
  nickname?: string
  level: number
  xp: number
  stats: { hp:number, attack:number, defense:number }
  equippedSkinId?: string
  acquiredAt: ISODate
}

API Endpoints (suggested)

- GET `/api/bestiary?ownedOnly=&q=&page=` — list of species and owned beasts
- GET `/api/bestiary/:id` — beast instance detail
- POST `/api/bestiary/feed` { beastId, xpItemId, qty } — returns updated beast instance
- POST `/api/bestiary/setActive` { beastId } — sets player's active beast

Assets

- Portraits (`assets/bestiary/`), species icons, rarity badges, evolution arrow assets, level-up Lottie animation for XP/level progress.

Storybook Stories (minimum)

- `Bestiary/BeastCard/Default`
- `Bestiary/BeastDetail/LevelUp`
- `Bestiary/FeedModal/ApplyXP`

Accessibility

- Ensure readable stat labels, contrast for rarity badges, keyboard focus for list navigation and modals, and descriptive ARIA labels for portrait and stats.

Testing

- Visual snapshots for `BeastCard` and `BeastDetailPanel` in multiple states (low XP, near-level, leveled).
- E2E: feed XP pack and assert level/xp updated from API response.

Acceptance Criteria

- Bestiary lists species and owned beasts with accurate level/xp and correct portraits.
- Feeding XP triggers server call and updates UI to reflect new XP/level.
- Evolution paths and passive descriptions are visible and accessible.
