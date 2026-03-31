# Blackjack Screen Design Specification

## Overview

This document defines the target visual and interaction design for the WagerBeasts blackjack gameplay screen. It translates the prototype mock and the Neon Kineticism design system into implementation-ready guidance so a frontend developer can recreate the screen consistently across mobile and responsive web breakpoints.

The blackjack screen should feel like a premium mobile game HUD rather than a generic casino table. The interface must communicate three things immediately:

- the current blackjack state
- the active beast bonus and progression reward loop
- the player's available actions with minimal cognitive friction

This screen is portrait-first and should be optimized for mobile before scaling to tablet and desktop.

## Design Intent

### Experience Goals

- Make the blackjack table feel alive, charged, and slightly theatrical.
- Present the beast as a central emotional anchor rather than a side decoration.
- Keep the player's hand and action choices readable in under 2 seconds.
- Visually connect betting, XP gain, and beast bonuses into one loop.
- Preserve a dark, neon, high-fidelity atmosphere without turning the screen into visual noise.

### Core Style Direction

The screen should follow the Neon Kineticism system:

- Dark base environment with layered green and teal light.
- Large molded surfaces instead of flat panels.
- Neon green as the dominant action and economy color.
- Blue-cyan reserved for progression and XP communication.
- No hard dividing lines for major sections.
- Depth created through tonal layering, glows, blur, overlap, and scale shifts.

## Primary Use Case

The screen represents the main in-round blackjack experience after a bet has already been placed and the first deal is visible.

The reference mock specifically depicts:

- one dealer up-card revealed
- one dealer hole card face down
- the active beast centered on the screen
- an active beast passive badge under the portrait
- a player hand total of 18
- current bet and potential XP summary
- four core actions: Hit, Stand, Double, Split

## Viewport and Layout Baseline

### Canonical Frame

Use a mobile-first reference frame of 390 x 844 CSS px.

Design assumptions:

- Safe area top inset must support modern mobile devices.
- Safe area bottom inset must support gesture navigation devices.
- All core gameplay controls must remain reachable within the bottom 40 percent of the screen.

### Vertical Screen Regions

Structure the screen into these stacked regions:

1. Top HUD
2. Dealer zone
3. Beast focus zone
4. Player hand zone
5. Wager and XP summary zone
6. Primary action row
7. Bottom navigation

These regions should feel visually connected, not boxed into separate cards.

### Horizontal Rules

- Primary content width on mobile: 100 percent minus 20 px outer padding on each side.
- Max readable content width on larger breakpoints: 480 px centered.
- Overlapping or intentionally offset components are encouraged when they improve the editorial feel.

## Visual Hierarchy

The screen hierarchy should be:

1. Player hand total and cards
2. Beast portrait and passive status
3. Action buttons
4. Dealer cards
5. Bet and XP values
6. Header balance and account chrome
7. Bottom nav

The player's hand must feel like the tactical center of the screen. The beast is the emotional center. The dealer zone is secondary until reveal resolution.

## Background and Environment

### Base Background

Use a deep near-black background with layered green atmospheric lighting.

Recommended composition:

- Base fill: #0d0e12
- Mid vignette wash: radial gradient from rgba(12, 239, 147, 0.16) to transparent
- Lower table glow: radial gradient centered below the beast and player hand
- Subtle curved table arcs with very low-opacity green strokes or glows

### Table Read

The table should not be a literal felt texture. It should read as a futuristic energy table.

Recommended cues:

- two or three large, soft curved arcs crossing the lower half of the screen
- diffuse glow beneath the beast portrait and the player hand
- no visible hard border separating the table from the background

## Color System

Use the design system tokens below for this screen.

### Core Surfaces

- background: #0d0e12
- surface-container-low: #121318
- surface-container: #18191e
- surface-container-high: #1e1f25
- surface-container-highest: #24252b
- surface-bright: #2a2c32

### Text Colors

- on-surface: #faf8fe
- on-surface-variant: #abaab0
- on-surface-muted: rgba(250, 248, 254, 0.68)

### Accent Colors

- primary: #34fea0
- primary-strong: #0cef93
- primary-glow: rgba(52, 254, 160, 0.32)
- tertiary: #6ad6ff
- tertiary-glow: rgba(106, 214, 255, 0.28)
- secondary: #b984ff
- secondary-glow: rgba(185, 132, 255, 0.20)
- danger-red: #ff5f68
- warning-amber: #ffb84d

### Gameplay Semantic Usage

- LuckyChips, actionable controls, active totals, and positive outcomes use primary.
- XP and progression values use tertiary.
- Disabled or unavailable special actions may lean on desaturated secondary-gray treatment.
- Loss states use danger-red sparingly and never as the dominant screen color.

## Typography

### Font Stack

- Display and game-brand moments: Space Grotesk
- Body, labels, utility text: Manrope
- Tiny metadata and condensed labels: Plus Jakarta Sans

### Type Scale

Recommended usage for this screen:

- Brand wordmark: 30 to 34 px, 700 italic or slanted treatment if supported
- Dealer label: 14 to 16 px, 500, wide tracking
- Balance value: 18 to 22 px, 800
- Beast passive label: 12 to 14 px, 700
- Hand total badge: 18 to 22 px, 800
- Action labels: 15 to 18 px, 700
- Bet and XP values: 18 to 22 px, 800
- Section captions: 11 to 13 px, 500 to 600, uppercase with generous letter spacing

### Typography Rules

- Avoid pure white; use on-surface and on-surface-variant tokens.
- Use uppercase sparingly for labels, nav items, and lightweight HUD metadata.
- Increase tracking on small uppercase text to preserve the premium HUD feel.

## Spacing System

Use a 4 px base unit.

Recommended spacing scale for this screen:

- 4 px micro gaps
- 8 px tight gaps
- 12 px compact gaps
- 16 px default gaps
- 20 px region padding
- 24 px card and cluster separation
- 32 px major section spacing
- 48 px breathing room around focal content

The screen should not feel compressed. Leave enough negative space around the beast portrait and action row so the neon glows read cleanly.

## Corner Radius and Shape Language

Use rounded, molded geometry throughout.

- Header balance pill: 24 to 28 px radius
- Gameplay cards and button shells: 20 to 24 px radius
- Passive chip: fully rounded pill, 9999 px radius
- Hand total badge: 14 to 18 px radius
- Bottom nav container: 28 to 32 px radius on the top corners, 0 px or subtle rounding on the bottom depending on platform chrome

Never use sharp 90-degree corners on gameplay surfaces.

## Elevation and Glow

Use tonal lift first, then neon bloom.

### Approved Depth Effects

- Beast portrait ambient shadow: 0 20px 40px rgba(52, 254, 160, 0.10)
- Passive badge outer glow: 0 0 0 1px rgba(52, 254, 160, 0.18), 0 10px 30px rgba(52, 254, 160, 0.12)
- Active hand total badge glow: 0 10px 30px rgba(52, 254, 160, 0.30)
- XP accent glow: 0 8px 20px rgba(106, 214, 255, 0.18)

### Avoid

- heavy black drop shadows
- crisp visible borders around every component
- glow on every element at once

Glow should identify what matters now.

## Screen Anatomy

### 1. Top HUD

The top HUD contains:

- player avatar
- WagerBeasts wordmark
- LuckyChips balance pill

#### Layout

- Top padding should account for safe area plus 10 to 14 px.
- Left cluster: avatar followed by wordmark.
- Right cluster: balance pill anchored flush to the outer grid.
- Vertical alignment should center all three items on a shared baseline.

#### Avatar

- Circular frame, 44 to 52 px.
- Use a faint green halo ring rather than a visible hard stroke.
- Avatar image can be generic profile art for the prototype and user profile art in production.

#### Wordmark

- Large, bright, energetic green treatment.
- Slight italic or forward-leaning energy is appropriate.
- The logo should feel more game-brand than app-header utility text.

#### Balance Pill

- Large rounded pill with surface-container background.
- Use internal horizontal padding of roughly 16 to 20 px.
- Left side icon: LuckyChip token glyph or currency indicator.
- Main value on first line, currency name on second line or stacked lockup if needed.
- Text should be bright primary with strong emphasis.

### 2. Dealer Zone

This area communicates the opponent state while staying visually quieter than the player zone.

#### Label

- Center aligned text: DEALER
- Use uppercase, on-surface-variant, wide tracking, small size
- Position with clear breathing room below header

#### Dealer Hand Layout

- Cards are horizontally centered.
- Show the revealed up-card first and the hole card second.
- Gap between dealer cards: 14 to 18 px.
- Cards should sit comfortably above the beast portrait without crowding it.

#### Dealer Card Treatment

- Card face uses realistic blackjack card visuals with simplified stylization.
- White card body should retain subtle shadows and rounded corners.
- The face-down card back should adopt the WagerBeasts visual language:
  - charcoal backplate
  - green micro-dot or micro-grid pattern
  - centered paw icon or beast glyph
  - faint green edge glow

### 3. Beast Focus Zone

This is the emotional center of the screen.

#### Beast Portrait

- Place the beast portrait in the vertical center band between dealer hand and player hand.
- Portrait container target size on mobile: roughly 128 to 180 px square depending on viewport height.
- Portrait art may be square-cropped but must feel framed by light rather than by a visible panel.
- Add a soft green radial aura behind the portrait.

#### Aura Treatment

- Radial glow should extend beyond portrait bounds.
- Glow intensity should remain soft enough that the portrait silhouette stays crisp.
- The aura can pulse slightly during the player's turn.

#### Beast Passive Badge

Position immediately below the portrait.

Contents:

- left icon indicating energy or passive effect
- passive name in uppercase or small caps
- value modifier aligned right

Reference example:

- FERAL SPARK ACTIVE
- +5% XP

Badge styling:

- dark glass pill
- subtle primary ghost outline or glow edge
- icon and passive name in primary
- modifier in tertiary or on-surface, depending on whether it is an XP-specific reward

The badge should read as status-confirmation, not as a clickable control.

### 4. Player Hand Zone

This is the tactical center of the screen.

#### Hand Total Badge

- The total badge floats above and slightly overlaps the player cards.
- Center align the badge with the midpoint of the hand fan.
- Background should be a bright primary block with soft glow.
- Use dark text for strong contrast if the fill is very bright.
- Target size: 52 to 64 px tall with enough width for 2-digit totals and state labels.

The hand total must update immediately on draw, split, double, blackjack, bust, and hand switching.

#### Player Cards

- Two initial cards should be slightly overlapped and fanned.
- Use a subtle rotation offset, around 4 to 8 degrees apart.
- Cards should be larger than the dealer cards by roughly 8 to 12 percent to reinforce player focus.
- The hand should remain centered under the beast passive badge.

#### Card Art Guidance

- Use classic suit symbols for hearts, spades, clubs, diamonds.
- Branded variant faces are acceptable if legibility remains immediate.
- Face card styling should prioritize clarity over novelty.

### 5. Wager and XP Summary Zone

This row summarizes the current risk and reward.

#### Layout

- Two-column centered row below the player hand.
- Left column: current bet
- Right column: potential XP
- Columns should be visually balanced with a faint center separator made from tonal contrast, not a visible line.

#### Labels

- Small uppercase captions in on-surface-variant.
- Examples:
  - CURRENT BET
  - POTENTIAL XP

#### Values

- Bet value in primary with strong numeric emphasis.
- Currency suffix can be smaller but should remain aligned to the baseline.
- XP value in tertiary with a small upward progression icon if available.

#### Behavioral Notes

- Potential XP should animate when beast bonuses or action multipliers apply.
- If the player doubles, both the bet and XP potential should update in place.

### 6. Primary Action Row

This row contains the main turn actions.

#### Actions

- Hit
- Stand
- Double
- Split

#### Layout

- Four evenly distributed buttons in a single row on standard mobile widths.
- Maintain a minimum 12 px gap between buttons.
- Buttons should fill the horizontal width but still leave outer breathing room.

#### Button Shell

- Use a tall rounded rectangle with surface-container or surface-container-high fill.
- Internal layout: icon above, label below.
- Default button height on mobile: 96 to 112 px.
- Buttons should feel chunky, tactile, and game-like.

#### Action Iconography

- Hit: plus symbol in primary
- Stand: raised hand in warm coral or danger-leaning accent
- Double: upward double-chevron or stake-growth icon in tertiary
- Split: split-arrow icon in secondary or muted violet-gray

#### Button States

Available:

- strong icon color
- bright label
- subtle inner highlight
- faint hover or press glow where platform supports it

Pressed:

- scale down to 0.98
- glow tightens and brightens
- 80 to 120 ms response

Disabled:

- reduced opacity to roughly 45 to 55 percent
- label and icon desaturated
- shell remains visible so layout does not shift

Important gameplay rules:

- Split must appear disabled unless the current hand is splittable.
- Double may disable based on house rules after additional draws.
- If multiple hands are active, the current hand's relevant action state must update as focus changes.

### 7. Bottom Navigation

The bottom nav is persistent but visually subordinate to active gameplay.

#### Items

- Beasts
- Games
- Shop
- Rankings

#### Container

- Full-width dock with dark elevated shell.
- Rounded top corners with strong molding.
- Slight blur or translucent lift is acceptable if performance allows.

#### Active Tab

- Games tab is active on this screen.
- Active tab uses a green glass capsule background.
- Active icon and label use primary.
- Inactive items use on-surface-variant.

The nav should never compete with the action row for primary emphasis.

## Component-Specific Specifications

### Card Component

#### Dimensions

- Dealer card width on mobile: 88 to 96 px
- Player card width on mobile: 96 to 108 px
- Card aspect ratio should remain close to standard playing cards

#### Styling

- Face cards: off-white body with minimal texture
- Radius: 18 to 22 px
- Shadow: soft neutral plus optional green reflected glow when in focus
- Typography on cards should be highly legible and consistent

### Currency Pill Component

- Height: 68 to 84 px depending on stacking mode
- Radius: 28 px
- Layout may be two-line to preserve drama and readability
- Background should sit on surface-container with a faint top highlight

### Passive Status Chip

- Height: 52 to 64 px
- Horizontal padding: 18 to 24 px
- Content aligned on a single baseline or two-row wrap if necessary on smaller screens

### Action Tile Component

- Min width: 72 px
- Ideal width in four-column mobile row: 78 to 88 px
- Height: 96 to 112 px
- Radius: 22 px

## Motion Design

Motion should reinforce game state clarity, not create distraction.

### Global Motion Principles

- Use quick, confident transitions.
- Favor opacity, translate, scale, and glow changes.
- Avoid long floaty easing on core gameplay actions.

### Recommended Timing

- Micro feedback: 80 to 120 ms
- Standard UI transitions: 180 to 240 ms
- Card deal animation: 280 to 420 ms per card
- Result-state emphasis: 450 to 650 ms

### Specific Motion Behaviors

#### Initial Deal

- Dealer up-card and hole card slide in sequentially from the shoe direction.
- Player cards deal in with a slightly more dramatic offset and settle into the fan.
- Hand total badge scales in after both player cards land.

#### Beast Idle

- Aura breathes on a slow 2.5 to 3.5 second loop.
- Passive badge may have a barely visible shimmer sweep every 6 to 8 seconds.

#### Hit Action

- New card enters rapidly, lands on top of current fan, then hand refans.
- Total badge updates with a quick number pop.

#### Stand Action

- Player action row dims slightly as dealer reveal sequence begins.

#### Dealer Reveal

- Hole card flips in place.
- Dealer total may appear briefly above the dealer cards during reveal or only during resolution, depending on final UI direction.

#### Result State

- Winning hands intensify primary glow and optionally pulse the XP summary.
- Losses reduce the player's glow and briefly tint key feedback elements toward red.
- Push should use neutral tertiary-white treatment.

## State Design Requirements

The screen must support these gameplay states without redesigning the base layout.

### State A: Waiting for First Action

- Player hand visible
- dealer up-card visible
- action row enabled according to rules
- beast passive active and readable

### State B: Player Taking Actions

- current hand total is prominent
- only valid actions enabled
- bet and XP values update if doubled

### State C: Split Hand Active

- current active hand is visually highlighted
- non-active split hand remains visible but slightly de-emphasized
- hand total badge must attach to the active hand
- action row updates per active hand context

### State D: Dealer Resolution

- action row disabled
- dealer hole card revealed
- dealer draw sequence animates one card at a time

### State E: Outcome

Possible outcomes:

- blackjack
- win
- push
- loss
- bust

Each outcome must have:

- a clear textual banner or overlay cue
- appropriate color treatment
- payout and XP update behavior

### State F: Insufficient Balance or Locked Input

- show disabled controls without shifting layout
- if relevant, display a short inline explanation near the summary row or above the action row

## Responsive Behavior

### Small Mobile: 320 to 359 px width

- Reduce outer padding from 20 px to 16 px.
- Reduce action tile height before shrinking iconography.
- Allow passive badge text to wrap to two lines.
- Maintain readable card size by tightening non-critical vertical gaps first.

### Standard Mobile: 360 to 430 px width

- Use the canonical layout.
- Keep four action buttons in one row.

### Large Mobile and Small Tablet: 431 to 768 px width

- Increase central content max width to 480 px.
- Slightly enlarge portrait, cards, and summary values.
- Keep portrait composition centered rather than stretching content edge to edge.

### Desktop and Landscape

The portrait stack should remain recognizable.

Recommended desktop adaptation:

- Center the gameplay column
- allow decorative side lighting or supporting panels outside the core column
- avoid turning the game into a wide dashboard with left and right sidebars unless the product explicitly wants a desktop-specific redesign

## Accessibility Requirements

### Contrast

- All text and icons must meet accessible contrast against their surfaces.
- Primary green on dark surfaces is acceptable only if brightness remains high enough.
- Small uppercase labels must not drop below accessible contrast thresholds.

### Touch Targets

- All action buttons and nav items require at least 44 x 44 px touch targets.
- Primary action tiles already exceed this and should remain comfortably tappable.

### Motion Accessibility

- Respect reduced motion preferences.
- Disable ambient pulsing, shimmer, and dramatic card animation when reduced motion is active.
- Preserve state clarity using opacity and instant placement instead.

### Screen Reader Semantics

The implementation should expose clear accessible labels for:

- dealer visible card
- player hand total
- current bet
- potential XP
- each action button and whether it is disabled
- active beast passive modifier

## Content and Microcopy Guidance

### Tone

- concise
- game-like
- slightly aggressive in flavor, but never confusing

### Example Labels

- DEALER
- CURRENT BET
- POTENTIAL XP
- FERAL SPARK ACTIVE
- HIT
- STAND
- DOUBLE
- SPLIT

### Outcome Copy Examples

- BLACKJACK
- YOU WIN
- PUSH
- BUST
- DEALER WINS

Keep result copy short and immediate.

## Asset Requirements

The developer or design team will need:

- WagerBeasts logotype in green-ready format
- avatar placeholder asset
- beast portrait artwork for each playable beast state
- card face asset set or generated card component spec
- branded card back art
- LuckyChip icon
- action icons for hit, stand, double, split
- bottom nav icons for beasts, games, shop, rankings

All icons should share the same visual family:

- slightly rounded geometry
- clean silhouettes
- no thin weak strokes

## Frontend Implementation Guidance

### Recommended Structure

The screen should be composed as these top-level UI modules:

- BlackjackHeader
- DealerHand
- BeastFocusPanel
- PlayerHand
- BetXpSummary
- BlackjackActionRow
- AppBottomNav

### Styling Strategy

- Use design tokens or CSS variables for colors, radii, spacing, and glows.
- Keep layout primitives reusable because other casino screens will likely borrow them.
- Avoid baking one-off pixel values into individual components without tokenization.

### Layering Strategy

Suggested z-index order:

1. background environment
2. table arcs and atmospheric glows
3. dealer zone
4. beast aura
5. beast portrait and passive chip
6. player cards
7. hand total badge
8. action row
9. bottom nav

### Performance Considerations

- Prefer composited transforms for card animations.
- Keep blur usage limited to a few strategic surfaces.
- Avoid stacking many large soft shadows on low-end mobile hardware.

## QA Checklist

The implementation should be considered visually correct when all of the following are true:

- The beast reads as a major gameplay element, not decoration.
- The player's hand is visually dominant over the dealer hand.
- The action row is clear, evenly spaced, and thumb-friendly.
- The bet and XP row reads in under one glance.
- The balance pill feels premium and anchored, not like a generic chip counter.
- The background feels atmospheric rather than empty.
- The screen remains legible at 320 px width.
- Disabled actions are obvious without disappearing.
- Reduced motion still preserves strong state clarity.

## Acceptance Criteria

- A frontend developer can recreate the full layout without needing the original mock open beside them.
- All key components have explicit placement, hierarchy, style, and behavior guidance.
- The design remains faithful to the Neon Kineticism system.
- The screen communicates gameplay status, beast status, wager, and progression clearly on first view.
- The layout is ready to scale into real gameplay states including split hands, dealer reveal, and result overlays.

## Future Extensions

This screen spec is intentionally compatible with later additions such as:

- side-bet UI
- streak multipliers
- animated beast reactions on win or bust
- tutorial callouts for first-time users
- spectator mode or streaming overlays
- desktop companion panels for hand history or chat

These features should be layered onto the existing composition without breaking the core portrait-first hierarchy.