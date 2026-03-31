# Blackjack Game Engine Specification

## Purpose

This document specifies the server-side blackjack engine required to run deterministic, fair blackjack games for WagerBeasts. It covers rules, state machine, API sequences, concurrency and locking, RNG, payouts, edge cases, testing, telemetry, and acceptance criteria. The goal is to provide a single source of truth so backend engineers can implement game logic and frontend engineers can integrate with consistent state transitions.

## Table of Contents

- Game overview and invariants
- Deck, RNG, and shuffling
- Hand representation and scoring rules
- Actions and allowed transitions
- Payout rules and rounding
- Split and multi-hand handling
- Concurrency, locking, and timeouts
- API contract & sequence diagrams (request/response patterns)
- Error codes
- Telemetry events
- Testing checklist
- Balance and configuration constants
- Security & cheat-prevention notes

## Game overview and invariants

- Game type: single-player blackjack vs dealer (server controls deck and dealer logic). Multiplayer tables are out of scope; each game session is per user.
- House rules:
  - Dealer stands on soft 17 (S17)
  - Blackjack pays 3:2 (configurable)
  - Insurance: disabled for MVP
  - Surrender: disabled for MVP
  - Double: allowed on any two-card hand (configurable)
  - Double after split: allowed (configurable)
  - Max splits: 3 splits (up to 4 hands) (configurable)
  - Aces split: if split aces, allow one additional card per ace and then lock (configurable)
- All monetary operations (wager debit, payout credit) must be atomic and recorded in `transactions` table.
- Server is authoritative for the deck, shuffle, draws, and result determination. Client displays are for UX only.

## Deck, RNG, and shuffling

- Use a deterministic PRNG seeded per-shoe (not per-game) using a secure CSPRNG to generate seeds. Store shoe seed server-side for audit.
- Shoe composition: configurable number of decks (default 6). Use continuous-shoe model (deal until penetration X% then reshuffle) or single-shoe per game; default: new shoe per game for simplicity.
- Shuffle algorithm: Fisher-Yates using CSPRNG.
- RNG requirements: cryptographically-secure generator (e.g., Node's crypto.randomBytes or OS CSPRNG). Document RNG and seed storage for audits.
- For verifiability: record shoe seed and PRNG metadata in game logs for troubleshooting and audit trails (do NOT expose seeds to clients).

## Hand representation and scoring rules

- Card values: numeric cards = pip value, face cards = 10, Ace = 1 or 11.
- Hand score calculation:
  - Compute highest score <= 21 using Ace as 11 when possible; else use Ace as 1.
  - Soft hand is any hand where an Ace is counted as 11.
- Blackjack detection: a two-card hand consisting of an Ace and a 10-value card.
- Bust: hand score > 21.

## Actions and allowed transitions

Each game follows a state machine. Primary states:

- CREATED: game created, wager reserved/charged, initial deal not completed.
- DEALT: initial two cards to player and dealer (dealer second card hidden), player actions allowed.
- PLAYER_TURN: player may perform actions (hit, stand, double, split) on the active hand.
- DEALER_TURN: dealer reveals hole card and plays to house rules.
- RESOLVED: payouts calculated and applied.
- CANCELLED/ERROR: game aborted, refund if necessary.

Actions:

- HIT: draw one card to active hand. If bust, mark hand finished and auto-move to next hand or dealer.
- STAND: finish active hand and advance to next hand or dealer.
- DOUBLE: double wager on active hand, draw exactly one card, then finish the hand. Ensure sufficient balance at request time.
- SPLIT: if active hand has two cards of equal rank, create two hands with one card each, move second card from active hand to new hand, draw one card to each hand. Apply split limits and rules for aces.

Validation rules:

- Verify action is allowed in current state.
- Validate sufficient balance for double and split (if doubling requires additional stake). When action accepted, atomically reserve additional wager and update transaction log.
- Double/split requests processed server-side; client should display optimistic animation but must confirm server result.

## Dealer behavior

- Dealer reveals hole card at start of DEALER_TURN.
- Dealer draws until score >= 17. For soft 17 rule (S17) dealer stands when total is 17 or higher including soft 17.
- Dealer draws are performed one card at a time with recorded timestamps for replayability.

## Payout rules

- Standard payouts:
  - Blackjack: 3:2 payout on original wager (unless dealer also has blackjack → push).
  - Win: 1:1 payout on wager.
  - Push: return original wager (no payout).
  - Loss: wager kept by house.
  - Double: payout applies to doubled wager.
  - Split: treat each hand independently.
- Rounding: all currency math to be performed in integer LuckyChips units. If multipliers create fractional values during XP or other calculations, define rounding rules (server default: round to nearest integer; document exact rule in config). Monetary payouts must be integer.

## Split and multi-hand handling

- Provide deterministic ordering for hands: left-to-right order derived from initial action order.
- Hand focus: activeHandIndex tracked server-side.
- If splitting aces and rule allows only 1 draw, freeze hand after the one extra card.

## Concurrency, locking, and timeouts

- Each game session must be locked to the initiating user. Use short-lived optimistic locks for action requests to prevent double-spend and race conditions.
- Recommended approach:
  - When a player sends an action, perform a single server-side transactional operation: validate state, apply action, draw cards (if any), compute immediate state change, persist, and respond.
  - Use database transactions where monetary operations occur (reserve/unreserve, payout).
- Timeouts: if player is inactive longer than X seconds (configurable, default 120s), mark session as timed-out and auto-stand or cancel depending on policy. Do not auto-refund unless protocol defines.

## API contract & sequence patterns

Primary endpoints (example):

- POST /games/blackjack/start
  - Body: { wager: number, beast_id?: uuid }
  - Response: game object with `id`, `state: DEALT`, `player_hands`, `dealer_hand` (one hidden), `player_score`, allowed actions

- POST /games/blackjack/{game_id}/action
  - Body: { action: 'hit'|'stand'|'double'|'split', handIndex?: number }
  - Response: updated game state, delta (cards drawn), resulting hand scores, allowedActions

- GET /games/blackjack/{game_id}
  - Response: canonical game state for UI reconciliation

- POST /games/blackjack/{game_id}/cancel
  - Body: reason
  - Response: cancelled/rollback state

Sequence examples:

1. Player calls `start` → server atomically deducts wager and returns DEALT state.
2. Player calls `action` = 'double' → server validates, deducts additional wager, draws one card, marks hand finished, returns updated state.
3. Player completes all hands; server transitions to DEALER_TURN and runs dealer logic, then computes payouts and applies transactions.

Clients should treat the server as authoritative and always reconcile UI state from GET when uncertain.

## Error codes

- 400 BAD_REQUEST — invalid payload
- 401 UNAUTHORIZED — user token invalid
- 403 FORBIDDEN — action not permitted (e.g., action not allowed in this state)
- 409 CONFLICT — optimistic lock conflict or insufficient balance at execution time
- 422 UNPROCESSABLE_ENTITY — game-specific rule violation (e.g., invalid split)
- 500 INTERNAL_ERROR — transient server error; include correlation id

All error responses must include `error.code`, `error.message`, and `error.details` where applicable.

## Telemetry events

Emit structured telemetry for each important event. Include game_id, user_id, beast_id (if any), timestamps, and minimal game snapshot.

- game_created
- wager_reserved
- card_dealt (include card, to which hand, deck_pos)
- action_taken (hit/stand/double/split)
- dealer_reveal
- payout_applied
- game_resolved (outcome, xp_awarded, payout_amount)
- game_timeout

Event schema MUST be stable and logged in JSON.

## Testing checklist

Automated tests must cover:

- Unit tests for scoring algorithm (ace counting, blackjack detection, soft/hard totals).
- Deterministic integration tests with fixed seeds to validate shuffle and known sequences.
- Edge cases: double on 21, splitting 10-value cards vs face cards (explicit rule: treat same rank only), splitting aces, multiple splits, split then double, insufficient balance mid-flow.
- Concurrency tests: rapid duplicate action requests produce safe single outcomes (simulate retry).
- Money safety tests: wagers reserved and always reconciled; no possibility of negative balances.
- RNG audit tests: ability to replay game given recorded seed and PRNG process.

E2E scenarios:

- Player blackjack vs dealer blackjack (push)
- Player blackjack vs dealer non-blackjack (3:2)
- Player split into two hands, win one lose one
- Player double and bust
- Dealer draws multiple cards to win/lose

## Balance and configuration constants (example)

- DECK_COUNT = 6
- DEALER_STAND_SOFT_17 = true
- BLACKJACK_PAYOUT = 1.5
- MAX_SPLITS = 3
- ALLOW_DOUBLE_ANY_TWO = true
- ACTION_TIMEOUT_SECONDS = 120

Keep these in a single config file in the codebase and expose for QA tuning.

## Security & cheat-prevention notes

- Never trust client-sent deck or card data.
- All critical math and RNG must run server-side.
- Log seeds, PRNG metadata, and decision points in secure logs for audit; restrict access.
- Rate-limit action endpoints to prevent automated rapid abuse.

## Acceptance criteria

- Deterministic server engine that passes all unit and integration tests.
- All endpoints return consistent canonical game state and support reconnection and recovery.
- No money- or XP-loss bugs under concurrency or retry scenarios.
- Telemetry events emitted for all lifecycle transitions.

## Appendix: Implementation notes for frontend integration

- UI should call `start` and then poll or subscribe to game updates via WebSocket.
- For action responses, the server returns the canonical delta (cards added, hand scores), and the client should animate accordingly.
- Clients must be resilient to 409/CONFLICT and reconcile by fetching full game state.

---

If you want, I can now:

- convert this into a sequence diagram and finite state machine diagram in Markdown+Mermaid, or
- generate a comprehensive test matrix JSON/CSV for QA, or
- implement a reference Node.js module (non-production) that simulates the engine for demo/tests.
