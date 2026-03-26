# XP Scaling System Plan

## 1. Vision & Goals
- **Vision:** Dual-stage progression (1–35: evolution, 36–99: prestige).
- **Goals:**
  1. Provide a compelling mid-game progression through evolution based on mechanics and growth.
  2. Maintain long-term grind with meaningful rewards past evolution.
  3. Avoid potential pay-to-grind exploitation by balancing XP earnings to session time and engagement.
  4. Ensure XP progression supports both casual and dedicated players.

---

## 2. Core Progression Overview
- **Primary Progression (1–35):** Evolution, power, archetype growth.
- **Prestige Progression (36–99):** Status, rare unlocks, endgame, max prestige.
- Level 99 = ultimate prestige with an exclusive maxed beast skin and permanent title.

---

## 3. XP Sources
- Blackjack hands and win streaks
- Daily missions and wheel
- Feeding, toys, activities
- Capsule completions
- Evolutions
- (Prestige) Competitive ranking, events, staked challenges, bet volume

---

## 4. XP Formula & Wager Cap
### 4.1. XP Formula
- `XP = 40 + (bet/100) * multiplier`
- Multiplier sources: evolution, feeding, items (see Section 8)

### 4.2. Wager Cap
- **Definition:** The wager cap is the maximum number of chips a player can bet in a single hand of blackjack with a specific beast. This cap directly limits the maximum XP a player can earn per hand, since XP is partially calculated based on the bet size.
- **Per-beast:** Each beast’s cap is tracked and increased independently as it evolves.
- **Stages:**
  - Stage 1: 5,000 chips (base)
  - Stage 2: 10,000 chips (+5,000)
  - Stage 3: 20,000 chips (+10,000)

---

## 5. Progression Curve & XP Table
- **Curve:** Smooth, gentle increase, ~2M XP for 99.
- **Level 1–35:** ~25–30% of total XP, 2–3 weeks.
- **Level 36–99:** ~70–75% of total XP, 2 months.
- **Full XP Table:** See `docs/XP_PER_LEVEL_TABLE.md`.

---

## 6. Evolution & Rewards
- **Stages:**
  - 1–12: Base form
  - 13–22: Evolution stage 2
  - 23–35: Evolution stage 3
- **Rewards:**
  - Increased XP multiplier (12–13% per tier, compounding)
  - Wager cap increases
  - Unlock/upgrade archetype abilities
  - Beast role/skill prefixes in leaderboard display

---

## 7. Prestige & Milestones
- **Milestones:** Titles, cosmetics, XP boosts, player-wide rewards
- **Per-beast vs. player-wide:**
  - Per-beast: titles, XP multipliers, beast skins
  - Player-wide: food, capsules, toys, mission slots, wheel spins, icons, frames
- **Prestige-specific perks:**
  - 35+ XP multiplier increases slowly (ex. +0.01 per level)
  - Season pass/treasure track increases with level
  - Cosmetics, animations, emotes, and special effects unlock
  - Player-specific token pool or access to premium offers
- **Milestone unlocks:**
  - Level 40: Veteran title, consumables
  - Level 45: Elite title, consumables
  - Level 50: +2% XP gain, daily mission slot, wheel spin, consumables
  - Level 55: +2% XP gain, consumables
  - Level 60: Champion title, battle event access, consumables
  - Level 70: Vanity badge, fast-track arena, consumables
  - Level 80: +5% legendary drop chance, consumables
  - Level 90: Global icon, consumables
  - Level 99: Max Prestige skin, gallery frame, top-tier title, consumables

---

## 8. XP Multiplier System
- **Sources:** Evolution, feeding, items
- **Stacking:** Multiplicative, capped at 2.0x
- **Diminishing returns:** Optional, after 1.5x total multiplier
- **Anti-abuse:** Session caps, item cooldowns, feeding decay
- **Example:**
  - Typical: Stage 2 (1.13x), Good Feeding (1.08x), Common XP Item (1.10x) → 1.34x
  - Optimized: Stage 3 (1.28x), Max Feeding (1.10x), Rare XP Item (1.50x) → 2.0x (capped)

---

## 9. Burn/Earn Balance & Fairness
- Chips as currency vs. progress resource
- Non-bet XP routes
- Time-played XP
- Anti-abuse and fairness: avoid pay-for-play abuse, active moderation, track XP/chip flow

---

## 10. Implementation & Balancing Notes
- Config-driven constants
- Telemetry and validation
- Smoothing curve after 35
- Table and config references
- Start with 1–35 as core MVP; 36–99 perks can be completed incrementally

---

## 11. UI/UX Considerations
- Progress bars, tooltips, milestone cards
- Clear display of evolution breakpoints and prestige milestones

---

## 12. Appendix
- Reference to full XP table: See `docs/XP_PER_LEVEL_TABLE.md`
- Example calculations

---