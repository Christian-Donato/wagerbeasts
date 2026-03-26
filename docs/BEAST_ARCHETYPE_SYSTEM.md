# Beast Archetype System

## Overview
This doc defines WagerBeasts archetypes, evolution ability scaling, and integration with the XP scaling system.
- Each beast belongs to one archetype.
- Beast evolution line stays in same archetype.
- Evolution unlocks stronger archetype ability versions.
- Abilities are active blackjack mechanics modifiers, used once per hand.

## Design goals
1. Distinct playstyles that influence blackjack decision-making.
2. Simple core rules (hit/stand/bust/dealer compare) remain intact.
3. Evolution feels meaningful via ability upgrades and wager cap growth.
4. Balance via once-per-round use and constrained power values.

## Archetype rules
- Archetype assigned at beast creation.
- One use per round.
- Activation window is archetype-specific.
- Ability is bound to current beast, resets at start of round.

## Evolution stage mapping (Stage A: 1-35)
- Stage 1 (1-12): base ability.
- Stage 2 (13-22): evolved ability 1.
- Stage 3 (23-35): evolved ability 2 (strongest in Stage A).
- Wager cap increments at evolution milestones (e.g., Stage 2 +2000; Stage 3 +3000).
- XP multiplier increases per level and may provide an additional +1% at each evolution boundary.

## Archetypes and abilities
Each archetype has base, stage 2, and stage 3 variants. Numbers are configurable in balance constants.

### Predator
- Theme: Aggressive risk-taking
- Activation: After drawing a card (player turn)
- Stage 1: Predatory Instinct — +2 hand value, auto-stand
- Stage 2: Sharpened Instinct — +3 hand value, auto-stand
- Stage 3: Apex Strike — +4 hand value, auto-stand

### Guardian
- Theme: Defensive stability
- Activation: After drawing a card
- Stage 1: Stone Shell — reduce drawn card value by up to 2
- Stage 2: Iron Shell — reduce drawn card value by up to 3
- Stage 3: Aegis Shell — reduce drawn card value by up to 4

### Trickster
- Theme: Information advantage
- Activation: Before deciding hit/stand on player turn
- Stage 1: Sly Peek — view next card
- Stage 2: Deceptive Peek — view next 2 cards, choose order
- Stage 3: Master Trick — view next 2 and mark one as safe for next draw

### Parasite
- Theme: Dealer disruption
- Activation: After dealer reveals final hand
- Stage 1: Life Drain — reduce dealer total by 2
- Stage 2: Vampiric Bite — reduce dealer total by 3
- Stage 3: Drain Essence — reduce dealer total by 4

### Swarm
- Theme: Long-hand momentum
- Activation: When player reaches 4+ cards without bust
- Stage 1: Pack Momentum — +2 hand value
- Stage 2: Surge Momentum — +3 hand value
- Stage 3: Ultimate Momentum — +4 hand value

### Gambler
- Theme: High variance opportunity
- Activation: Once per round anytime in player turn
- Stage 1: Lucky Reroll — replace one card with random draw
- Stage 2: Risky Reroll — replace up to two cards (one at a time)
- Stage 3: Chaos Reroll — replace one card, guaranteed non-bust if possible

### Controller
- Theme: Deck manipulation
- Activation: Immediately after drawing a card
- Stage 1: Tactical Discard — discard drawn card and redraw
- Stage 2: Advanced Discard — discard drawn card, redraw + one extra card to choose
- Stage 3: Absolute Control — discard drawn card, choose one from top 3

### Evolution (optional)
- Theme: Slow growth over session
- Stage 1: Adaptive Growth — win: +1 permanent hand value for next rounds cumulatively up to 4
- Stage 2: Persisted Growth — same, cap 6
- Stage 3: Transcendent Growth — same, cap 8

## Balancing and anti-abuse
- Maximum one ability use per round.
- Abilities cannot alter bust rules or dealer logic beyond small deltas.
- Daily XP cap per beast (e.g., 40k) to avoid wager-to-XP abuse.
- Wager cap vs XP rate check to avoid pay-to-grind: reserve 50% XP from non-bet sources.

## Implementation notes
- Store archetypes in DB table `beast_archetypes` and `beast_archetype_levels`.
- Ability system component: `archetype_ability_use(hasUsed)`.
- Evolution triggers update `wager_cap` and ability version.
- Add UI microcopy + ability state.

## Milestone tracking
- Stage 2 evolves at level 13 (or XP threshold), Stage 3 at level 23.
- Track and log blueprint events: `beast_evolution`, `ability_upgrade`, `wager_cap_change`.

## Next steps
1. Validate archetype list with product on beast roster.
2. Define exact value constants in config (for stats/design tuning).
3. Implement backend + tests.
4. Prototype front-end flow.
5. Collect metrics and tune through first 4-week beta.
