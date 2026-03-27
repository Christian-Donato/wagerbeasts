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
 - The XP awarded for a single hand is composed of a fixed base and a bet-proportional term. We define the formula unambiguously as:

  - Base XP: `40`
  - Bet term: `(bet / 100) * M`

  Final per-hand XP:

  `XP = BaseXP + (bet / 100) * M`

  Where `M` is the combined XP multiplier (see Section 8). In words: the multiplier scales only the bet-based portion of the award (not the base 40).

  Example (numeric): betting 5,000 chips with `M = 1.13` yields `XP = 40 + (5000/100)*1.13 = 40 + 50*1.13 = 40 + 56.5 = 96.5 XP` (rounding rules may apply in code).
  Implementation: round final per-hand XP to the nearest integer before adding to totals (or specify server-side rounding rule in config).

### 4.2. Wager Cap
- **Definition:** The wager cap is the maximum number of chips a player can bet in a single hand of blackjack with a specific beast. This cap directly limits the maximum XP a player can earn per hand, since XP is partially calculated based on the bet size.
- **Per-beast:** Each beast’s cap is tracked and increased independently as it evolves.
- **Per-beast:** Each beast’s cap is tracked and increased independently as it evolves.
- **Persistence:** Wager caps are stored per-beast, persist across sessions, and are independent between beasts.
- **Stages:**
  - Stage 1: 5,000 chips (base)
  - Stage 2: 10,000 chips (+5,000)
  - Stage 3: 20,000 chips (+10,000)

  Addendum — level mapping: see Evolution table in Section 6 for how evolution stages map to level ranges and thus to wager caps.

---

## 5. Progression Curve & XP Table
- **Curve:** Smooth, gentle increase, ~2M XP for 99.
- **Level 1–35:** ~30% of total XP (evolution stage; expected core progression window: 2–3 weeks for active players).
- **Level 36–99:** ~70% of total XP (prestige; expected long-term progression window: depends on play frequency — see Appendix examples).
- **Full XP Table:** See `docs/XP_PER_LEVEL_TABLE.md`.

---

## 6. Evolution & Rewards
- **Stages:**
  - 1–12: Base form
  - 13–22: Evolution stage 2
  - 23–35: Evolution stage 3
- **Rewards:**
 - **Rewards:**
  - Increased XP multiplier per stage (see table below)
  - Wager cap increases
  - Unlock/upgrade archetype abilities
  - Beast role/skill prefixes in leaderboard display

Evolution stage reference (recommended config):

| Evolution Stage | Levels | Stage multiplier | Wager cap |
|---:|:---:|:---:|:---:|
| Stage 1 (Base) | 1–12 | 1.00x | 5,000 |
| Stage 2 | 13–22 | 1.13x | 10,000 |
| Stage 3 | 23–35 | 1.28x | 20,000 |

Notes: stage multipliers are multiplicative with other XP sources. The listed per-stage values are a recommended, easily-communicated baseline (Stage2 ≈ +13%, Stage3 ≈ +13% compounded again → ≈1.28x).

Stage multiplier note: the stage multiplier is one of the multiplicative factors included in `M` (it scales only the bet term in the XP formula).

---

## 7. Prestige & Milestones
- **Milestones:** Titles, cosmetics, XP boosts, player-wide rewards
- **Per-beast vs. player-wide:**
 - **Per-beast vs. player-wide:**
  - Per-beast (beast-specific): titles, vanity badges, beast skins — these must be earned and equipped per-beast.
  - Player-wide (account-level): food, capsules, toys (inventory), icons, frames — these are unlocked once and usable across the player account.
- **Prestige-specific perks:**
 - **Prestige-specific perks:**
  - (Removed) No per-level prestige XP multiplier is applied; avoid adding a separate prestige multiplier to prevent stacking complexity.
  - Season pass/treasure track increases with level
  - Cosmetics, animations, emotes, and special effects unlock
  - Player-specific token pool or access to premium offers
- **Milestone unlocks:**
  - Level 40: Veteran title for specific beast, consumables (food, toys, capsules)
  - Level 45: consumables (food, toys, capsules)
  - Level 50: consumables (food, toys, capsules)
  - Level 60: Elite title for specific beast, consumables (food, toys, capsules)
  - Level 70: Vanity badge for specific beast, consumables (food, toys, capsules)
  - Level 80: Champion title for specific beast, consumables (food, toys, capsules)
  - Level 90: Global icon (player-wide — account-level cosmetic). Recommended display locations: profile, leaderboards, match intro/social panels. Consumables (food, toys, capsules)
  - Level 99: Max prestige skin (per-beast cosmetic), gallery frame (prestige profile frame — 1 per account), Immortal title for specific beast, consumables (food, toys, capsules)

Cosmetic uniqueness rules: account-level icons/frames are unique per account (player can have multiple unlocked but only one active icon and one active frame). Beast-specific skins/titles are equipped per-beast and do not transfer automatically to other beasts.

---

## 8. XP Multiplier System
**Sources:** Evolution, feeding, items, events

**Stacking and cap (recommended):** multipliers stack multiplicatively, with a soft diminishing curve applied above 1.5x and a hard clamp at 2.0x.

**Diminishing returns & cap (recommended algorithm):**

1. Collect multiplicative factors from ordered sources: `f1, f2, f3, ...` (evolution stage, feeding, XP items, event boosts, prestige per-level).
2. Compute raw product: `R = f1 * f2 * f3 * ...`
3. If `R <= 1.5`, then `M = R`.
4. If `R > 1.5`, apply a soft diminishing curve that preserves low values but compresses the tail, for example:

   `M = 1.5 + (1 - exp(-k * (R - 1.5))) * (2.0 - 1.5)`

   where `k` controls curve steepness (recommend `k = 1.5`). This yields values that asymptotically approach 2.0 but makes jumps above 1.5 progressively smaller.
  This soft-curve compresses large stacked multipliers to avoid runaway XP while keeping small bonuses intact. If a simpler temporary fallback is preferred for early tuning, a linear clamp `M = min(R, 2.0)` is an acceptable interim option.
5. Finally clamp `M = min(M, 2.0)`.

Pseudocode:

```
factors = [stageFactor, feedingFactor, itemFactor, eventFactor]
R = product(factors)
if R <= 1.5:
  M = R
else:
  k = 1.5
  M = 1.5 + (1 - exp(-k * (R - 1.5))) * 0.5
M = min(M, 2.0)
```

**Anti-abuse:** session caps, item cooldowns, feeding decay (see Section 9 for recommended numeric guardrails).

**Examples:**
 - Typical: Stage 2 (1.13x), Good Feeding (1.08x), Common XP Item (1.10x) → raw R = 1.13*1.08*1.10 = 1.342 → M = 1.342
 - Optimized raw product: Stage 3 (1.28x), Max Feeding (1.10x), Rare XP Item (1.50x) → raw R = 2.112 → apply diminishing curve → M ≈ 1.80 (then clamp to <= 2.0 if needed)

---

## 9. Burn/Earn Balance & Fairness
- Chips as currency vs. progress resource
- Non-bet XP routes
- Time-played XP
- Anti-abuse and fairness: avoid pay-for-play abuse, active moderation, track XP/chip flow

Recommended anti-abuse numeric guardrails (tunable):

- `session_xp_cap`: 20,000 XP per rolling 24-hour session (prevents extreme burst-level grinding).
- `xp_item_cooldown`: 24 hours per account for rare XP items (common/consumable items can have shorter cooldowns).
- `feeding_cooldown`: 1 hour per beast (prevents spamming feeding for XP).
- `feeding_decay`: feeding effectiveness decays 5% per hour after 12 hours since last meaningful feeding.

These values are starting points for balance testing and should be exposed as config constants with telemetry to tune thresholds.

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

Note: examples below exclude non-hand XP sources (missions, events, evolutions). Including those additional XP streams will materially reduce the time-to-2M estimates.

Appendix — worked examples & playstyle estimates

Constants used in examples:
- `BaseXP = 40`
- Stage multipliers: Stage1 = 1.00x, Stage2 = 1.13x, Stage3 = 1.28x

Per-hand examples:
- Bet = 1,000 (bet/100 = 10):
  - Stage1: XP = 40 + 10*1.00 = 50
  - Stage2: XP = 40 + 10*1.13 = 51.3
  - Stage3: XP = 40 + 10*1.28 = 52.8
- Bet = 5,000 (bet/100 = 50):
  - Stage1: XP = 40 + 50*1.00 = 90
  - Stage2: XP = 40 + 50*1.13 = 96.5
  - Stage3: XP = 40 + 50*1.28 = 104
- Bet = 20,000 (bet/100 = 200) — Stage3 cap example:
  - Stage3: XP = 40 + 200*1.28 = 296

Playstyle time-to-2M examples (approximate, rounded):
- Casual: 50 hands/day, avg bet 1,000, Stage2 → ~50 XP/hand → ~2,500 XP/day → ~800 days to 2M.
- Regular: 200 hands/day, avg bet 5,000, Stage3 → ~104 XP/hand → ~20,800 XP/day → ~96 days to 2M.
- Hardcore: 400 hands/day, avg bet 20,000, Stage3 → ~296 XP/hand → ~118,400 XP/day → ~17 days to 2M.

These demonstrate sensitivity to bet size, evolution stage, and play frequency — use them for sanity checks when tuning the XP table.

---