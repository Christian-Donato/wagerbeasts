# Leaderboard Design & Implementation Plan

Purpose

Defines the UX, data model, API contracts, components, telemetry, assets, accessibility, testing, and acceptance criteria for global and social leaderboards (daily, weekly, all-time, friends-only, local/region).

Goals

- Show competitive standing clearly and quickly on mobile.
- Support filters: timeframe (daily/weekly/all-time), scope (global/friends), and game-mode (blackjack variants).
- Provide fast profile drill-ins from leaderboard entries and safe navigation to player profiles.

Target Platforms

- Mobile-first (320px) with responsive layouts to tablet/desktop; primary interactions optimized for portrait.

Key Views & Flows

1) Leaderboard Home
- Header with timeframe tabs (Day/Week/All), scope toggle (Global / Friends), and search.
- Top 3 highlight row (podium) with large portraits, rank, name, score, and small medal badges.
- Scrolling list below (infinite scroll) showing rank, avatar, display name, score, and quick action (View Profile / Challenge).

2) My Position Sticky Row
- Always-visible sticky row (or quick jump) showing the current player's rank and score with `View Profile` CTA.

3) Player Drill-in
- Tapping a row opens `PlayerProfileQuick` (bottom sheet): avatar, recent win/loss, beasts used, recent high scores, follow/challenge buttons.

4) Challenge / Invite
- For friends/followed players, show `Challenge` action (sends challenge invitation or opens match flow).

Component Mapping

- Atomic: `Avatar`, `PillBadge`, `StatChip`, `ActionButton`.
- Composite: `PodiumRow`, `LeaderboardRow`, `LeaderboardList`, `MyPositionRow`, `PlayerProfileQuick`, `ScopeTabs`.
- Page: `LeaderboardScreen` (composes tabs, podium, list, sticky row).

Data Model

- LeaderboardEntry {
  rank: number
  userId: string
  displayName: string
  avatarUrl?: string
  score: number
  meta?: { country?: string, beastsUsed?: string[] }
}

API Endpoints (suggested)

- GET `/api/leaderboard?timeframe=day|week|all&scope=global|friends&mode=blackjack&page=&limit=` — returns paged entries and `myPosition` if authenticated.
- GET `/api/player/:id/summary` — summary for drill-in.
- POST `/api/leaderboard/challenge` { fromUserId, toUserId, mode } — creates challenge/invite.

Client Behavior & Performance

- Use cursor-based pagination for infinite scroll. Pre-fetch next page when user is 60% through current list.
- For `friends` scope, fetch friend list first to avoid unnecessary global queries.
- Cache leaderboard snapshots for 10s; show loading skeletons during refresh.

Filters & Sorting

- Timeframe: Day, Week, All-time. Default: Day.
- Scope: Global, Friends (requires auth), Region (optional).
- Mode: Game mode filter (if multiple variants exist).

Assets

- Medal/badge SVGs: gold_medal.svg, silver_medal.svg, bronze_medal.svg; avatar placeholders; `podium_bg.svg`; `icon_challenge.svg` in `assets/leaderboard/` with `@2x` raster fallbacks.

Storybook Stories (minimum)

- `Leaderboard/PodiumRow/Default`
- `Leaderboard/LeaderboardRow/Default` `Leaderboard/LeaderboardRow/Highlight` (current player)
- `Leaderboard/MyPositionRow/Sticky`
- `Leaderboard/PlayerProfileQuick/Default`

Accessibility

- Ensure rank and score are readable by screen readers; provide descriptive ARIA labels for each row (e.g., "Rank 5 — Chill — 12,400 points").
- Keyboard navigation for list and bottom-sheet drill-in; focus trap for modal-like sheets.

Telemetry & Events

- `leaderboard_view` {timeframe, scope, mode}
- `leaderboard_entry_view` {rank, userId}
- `leaderboard_challenge` {fromUserId, toUserId, mode}

Testing

- Visual regression for `LeaderboardRow` and `PodiumRow` across ranks and size variants.
- E2E: load top 100, search for a player, open drill-in, send challenge flow.

Acceptance Criteria

- Leaderboard loads correctly with podium + paged list and the sticky `MyPosition` row.
- Filters/tabs switch within 300ms and update list correctly.
- Player drill-in shows correct summary and challenge flow initiates properly.

Implementation Notes

- Use server-side aggregation for scores; ensure consistent tie-breaking (timestamp of score achievement).
- Respect rate limits for challenge actions and provide clear error states for edge cases (blocked user, challenge cooldown).

Delivery Estimate (rough)

- Atomic components + stories: 0.5–1 day  
- Composite + stories + basic challenge UI: 1–2 days  

Next steps

- I can scaffold `LeaderboardRow` and `PodiumRow` Storybook stubs next, or create JSON API examples for the endpoints above. Which do you want now?
