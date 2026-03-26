# XP Scaling System Plan

## Vision
WagerBeasts XP is a dual-stage progression system.
- **Primary progression (1-35)**: Core evolution and power development.
- **Prestige progression (36-99)**: Long-term status, rare unlocks, and endgame goals.
- Level 99 = ultimate prestige with an exclusive maxed beast skin and permanent title.

## Goals
1. Provide a compelling mid-game progression through evolution based on mechanics and growth.
2. Maintain long-term grind with meaningful rewards past evolution.
3. Avoid potential pay-to-grind exploitation by balancing XP earnings to session time and engagement.
4. Ensure XP progression supports both casual and dedicated players.

---
## Stage A: Power Evolution (1-35)
### Objectives
- Align with Beast evolution stages:
  - 1-12 = Base form
  - 13-22 = Evolution stage 2
  - 23-35 = Evolution stage 3
- Each level ups actual beast utility (weapon bonus, XP multiplier, streak bonus).

### Mechanics
- XP required is low/medium and follows a smooth curve (e.g., 1-35 in ~1/4 of OSRS curve).
- XP sources:
  - Blackjack hands and win streaks
  - Daily missions and wheel
  - Feeding/toys/activities
  - Capsule completions
- Evolution unlocks at fixed thresholds (e.g., 20, 25, 30), with in-game animation and buffs.

### Rewards
- Increased XP multiplier (12-13% per tier)
- Unlock/upgrade archetype abilities on evolutions (Stage 2/3) to provide specific blackjack mechanics benefits
- Evolution-based wager cap increases (e.g., +2000 chips at Stage 2, +3000 chips at Stage 3)
- Beast role/skill prefixes in leaderboard display

### Beast Archetype System (MVP)
- Each beast is assigned one archetype, defining a unique once-per-round blackjack ability.
- All evolutions in a line inherit the archetype and unlock improved ability versions.
- Archetypes include: Predator, Guardian, Trickster, Parasite, Swarm, Gambler, Controller, (optional) Evolution.
- Ability usage: once per round during player turn (before hit, after draw, or after dealer reveal depending on archetype).

---
## Stage B: Prestige Progression (36-99)
### Objectives
- Provide strong long-term progression after maximum evolution level.
- Make milestones feel meaningful while avoiding crushing grind.
- Reward social proof, cosmetics, and quality-of-life perks.

### Mechanics
- XP requirement uses a milder curve than OSRS (custom soft curve), with total level 99 target set to ~2M XP for committed players (30-60 min/day for ~60 days per beast).
- Levels 1-35 target ~25-30% of total XP (~500k-600k cumulative), for fast evolution progression in 2-3 weeks.
- Levels 36-99 target ~70-75% of total XP (~1.4M-1.5M cumulative), for long-term prestige grind over 2 months.
- XP sources broaden to include:
  - Competitive ranking achievements (leaderboard placement)
  - Season missions and events
  - Daily staked challenges (lottery, wash/market risk tasks)
  - Total bet volume with diminishing returns (prevents excessive sink abuse)

### Milestone unlocks
### Milestone unlocks (40–99)

#### Notes on multi-beast handling
- **Per-Beast rewards** (titles, XP multipliers, beast skins) apply only to the specific beast. They display in Beast info, leaderboards, and battle UI.
- **Player-wide rewards** (food, capsules, toys, mission slots, wheel spins, icons, frames) are account-wide. Multiple beasts hitting the same milestone yield additive rewards only where indicated, otherwise once per account.
- Stacking rules:
  - Consumables: additive, capped (e.g., daily/weekly cap of 50 per type).
  - Titles: per-beast.
  - Badges/icons: player-wide one-copy unlock.

#### Level 40
- Per-Beast: unlock title `Veteran` for this beast, shown on leaderboards and beast panels.
- Player-Wide: 5 capsules, 5 food, 1 toy.
- Optional: +5% capsule discount (stackable up to +25% across beasts).
- UX: Popup: "Level 40 milestone unlocked: Veteran title for Beast [Name]. Consumables added."

#### Level 45
- Per-Beast: unlock title `Elite` for this beast.
- Player-Wide: 5 capsules, 5 food.
- UX: milestone popup and inventory update.

#### Level 50
- Per-Beast: +2% XP gain for this beast.
- Player-Wide: +1 daily mission slot (max +5 from all beasts), +1 extra wheel spin token, 5 capsules, 5 food, 1 toy.

#### Level 55
- Per-Beast: +2% XP gain for this beast.
- Player-Wide: 5 capsules, 5 food.

#### Level 60
- Per-Beast: unlock title `Champion` for this beast.
- Player-Wide: unlock battle event access, 5 capsules, 5 food, 1 toy.

#### Level 70
- Per-Beast: unlock vanity badge for this beast (leaderboard/profile/battle UI).
- Player-Wide: unlock fast-track arena entry, 5 capsules, 5 food, 1 toy.

#### Level 80
- Per-Beast: +5% legendary drop chance boost for this beast in PvE/PvP (post-MVP).
  - Tooltip: "Legendary drop chance +5%."
- Player-Wide: 5 capsules, 5 food, 1 toy.

#### Level 90
- Per-Beast: none.
- Player-Wide: unlock permanent global icon, 5 capsules, 5 food, 1 toy.
  - Icon shown on profile, leaderboards, all beast UIs.

#### Level 99 (Max Prestige)
- Per-Beast: unlock exclusive Max Prestige beast skin (cosmetic; battle/profile/gallery).
- Player-Wide: unlock unique gallery frame, unlock top-tier player title (e.g., "Master of WagerBeasts"), 10 capsules, 10 food, 2 toys.
- UX: popup: "Congratulations! Level 99 reached! Max Prestige Skin unlocked for [Beast Name], gallery frame and title awarded."

### Implementation notes for logic
- Milestone data should be structured (JSON/YAML/table) to differentiate per-beast vs player-wide rules.
- All quantities and bonuses remain constants configurable for balancing.

### Prestige-specific perks
- 35+ XP multiplier increases slowly (ex. +0.01 per level)
- Season pass/treasure track increases with level
- Cosmetics, animations, emotes, and special effects unlock
- Player-specific token pool or access to premium offers

---
## Burn/Earn Balance
- Chips are both currency and `progress resource`; keep them decoupled by:
  - awarding majority of XP from activity not direct GP burned
  - enabling non-bet XP routes (missions, events, toys, community votes)

- If Blackjack is the main XP engine, use `XP scales with bet size` but not strictly 1:1 chips spent.
  - Example: `20 XP + (bet/100)*multiplier`; losses can still give min XP (e.g., 50%) so players are not punished solely for RNG.

- Add persistence for “time played” XP -> encourages retention over pure wagering volume.

---
## Soft cap and prestige reset (optional)
- Consider **prestige system** when reaching 99:
  - Option to `Prestige` to 1 with permanent bonus and unlocks (e.g., +5% passive gains), preserving long-term motivation.
  - Or keep 99 as fixed max with top rare badge as ultimate.

- Allow **seasonal seasonal ranks**, with resets in weekly/monthly seasons but permanent XP remains.

---
## Fairness & Economy
- Track total XP supply and chip flow in metrics.
- Avoid unrestricted XP multipliers for pay-for-play abuse.
- Implement anti-abuse and “active moderation” to avoid XP farming bots.

---
## UI / UX
- Clear progression bar with evolution breakpoints and prestige milestones.
- Tooltip summary: "Level 35 -> Evolved Stage 3; Level 36+ = Prestige progress".
- Milestone cards showing geometric rewards (titles, cosmetic unlocks).

---
## Implementation Notes
- Start with 1-35 evolution as core MVP; 36-99 perks can be completed incrementally.
- Keep experience constants config-driven for balancing in live operation.
- Validate with telemetry in first 3 months; aim for average player reaching ~35 in 2-4 weeks then slowing.

---
## Conclusion
This dual-stage XP scheme gives immediate power progression and long-term prestige. It supports content pacing for casual players and long-term commitment for whale/competitive players. Level 99 becomes a meaningful, scarce achievement while allowing evolution to be a practical gameplay vector at 1-35.