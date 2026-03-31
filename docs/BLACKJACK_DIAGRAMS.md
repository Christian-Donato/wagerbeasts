# Blackjack Engine Diagrams

This file contains Mermaid diagrams describing the blackjack engine's finite state machine and common message sequences. Use these for onboarding, design reviews, and deriving QA tests.

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> CREATED
    CREATED --> DEALT: POST /games/blackjack/start
    DEALT --> PLAYER_TURN: initial deal complete
    PLAYER_TURN --> PLAYER_TURN: hit \n(action: hit)
    PLAYER_TURN --> PLAYER_TURN: split \n(action: split)
    PLAYER_TURN --> PLAYER_TURN: double \n(action: double)
    PLAYER_TURN --> DEALER_TURN: stand all hands / no more hands
    DEALER_TURN --> RESOLVED: dealer finishes draws
    RESOLVED --> [*]
    PLAYER_TURN --> CANCELLED: timeout or cancel
    DEALT --> CANCELLED: cancel before first action
    CANCELLED --> [*]

    note right of PLAYER_TURN
      - Valid actions depend on hand state
      - Server validates and persists each action
    end note
```

## Sequence Diagrams

Below are representative sequences for common flows. Replace endpoints and field names with your implementation details.

### 1) Start game (deal)

```mermaid
sequenceDiagram
    participant C as Client
    participant API as GameAPI
    participant RNG as RNG/Deck
    participant DB as Database

    C->>API: POST /games/blackjack/start {wager, beast_id}
    API->>DB: BEGIN TRANSACTION
    API->>DB: reserveWager(userId, wager)
    API->>RNG: initShoeIfNeeded() / shuffle(seed)
    API->>RNG: draw(playerCard1, dealerUpCard, playerCard2, dealerHoleCard)
    RNG-->>API: cards
    API->>DB: persistGame(gameState {DEALT, hands, deckPos, seedMeta})
    API->>DB: COMMIT
    API-->>C: 200 {gameId, state: DEALT, player_hands, dealer_hand(hidden)}
```

### 2) Player action: Hit

```mermaid
sequenceDiagram
    participant C as Client
    participant API as GameAPI
    participant RNG as RNG/Deck
    participant DB as Database

    C->>API: POST /games/blackjack/{id}/action {action: "hit", handIndex}
    API->>DB: LOCK game row (optimistic)
    API->>DB: validateActionAllowed(gameState, userId)
    API->>RNG: draw(1)
    RNG-->>API: card
    API->>DB: updateGameState(newCard, handScore)
    API->>DB: UNLOCK/COMMIT
    API-->>C: 200 {updated game state, allowedActions}

    alt bust
      API->>DB: markHandFinished
      API-->>C: 200 {hand:bust, moveToNextHandOrDealer}
    end
```

### 3) Player action: Double (one-card then finish)

```mermaid
sequenceDiagram
    participant C as Client
    participant API as GameAPI
    participant RNG as RNG/Deck
    participant DB as Database

    C->>API: POST /games/blackjack/{id}/action {action: "double", handIndex}
    API->>DB: LOCK game row
    API->>DB: validateSufficientBalanceAndRules
    API->>DB: reserveAdditionalWager(userId, amount)
    API->>RNG: draw(1)
    RNG-->>API: card
    API->>DB: updateGameState(with doubled wager and card)
    API->>DB: UNLOCK/COMMIT
    API-->>C: 200 {hand finished, updated balances}
```

### 4) Dealer reveal & resolution

```mermaid
sequenceDiagram
    participant API as GameAPI
    participant RNG as RNG/Deck
    participant DB as Database
    participant WAL as TransactionService

    API->>DB: transitionTo(DEALER_TURN)
    API->>RNG: revealHoleCard()
    RNG-->>API: holeCard
    API->>RNG: while dealerScore &lt; 17 draw(1)
    RNG-->>API: card(s)
    API->>DB: computeOutcomes(perHand)
    API->>WAL: applyPayoutsAndRecordTransactions(outcomes)
    WAL-->>DB: balancesUpdated
    API->>DB: persistResolvedState(outcomes, xpAwarded)
    API-->>Client: push/response {state: RESOLVED, outcomes, xp, payout}
```

## Notes on diagrams

- These diagrams are intentionally simplified to show the canonical flows. Real implementations must include error handling, retry, and audit logging sequences.
- Use the sequence flows to derive exact API response shapes and to design E2E tests that replay deterministic seeds.
- The diagrams are stored as text (Mermaid) so they render in VS Code and GitHub and can be updated via PRs.

---

If you want, I can also embed a Mermaid FSM into `docs/BLACKJACK_ENGINE_SPEC.md` itself or generate PNG/SVG exports for team documentation. Which would you prefer?
