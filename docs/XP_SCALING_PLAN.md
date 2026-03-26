# XP Scaling System – Full Technical Specification

---

## 1. Vision & Goals (Implementation Definition)

### 1.1 System Purpose
The XP system is designed to:
- Drive **player retention** through short-term and long-term progression loops
- Provide **consistent reward pacing** across all session lengths
- Ensure **fairness** regardless of spending power
- Encourage **multi-system engagement** (blackjack, feeding, missions, etc.)

---

### 1.2 Design Constraints
- XP gain must scale with **time + engagement**, NOT purely chip volume
- High spenders must NOT gain disproportionate XP vs active players
- All XP systems must be:
  - Deterministic (no hidden randomness unless explicitly stated)
  - Configurable via backend values
  - Trackable via telemetry

---

### 1.3 Player Experience Targets

| Player Type | Expected Progress |
|------------|-----------------|
| Casual (1–2 hrs/day) | Level 35 in ~2–3 weeks |
| Regular (2–4 hrs/day) | Level 50–60 in ~3–4 weeks |
| Hardcore (4–8 hrs/day) | Level 99 in ~6–8 weeks |

---

## 2. Core Progression Overview

### 2.1 Level Structure
- Total Levels: **1 → 99**
- Hard Cap: **99 (no overflow XP stored)**

---

### 2.2 Progression Segments

#### Stage A: Evolution Phase (Level 1–35)
- Focus: Power growth, gameplay mechanics
- Unlocks:
  - Evolution tiers
  - Core multipliers
  - Ability systems
- XP Requirement: **~25–30% of total XP (~500k–600k XP)**

#### Stage B: Prestige Phase (Level 36–99)
- Focus: Status, cosmetics, long-term grind
- Unlocks:
  - Titles
  - Cosmetics
  - Minor stat boosts
  - System-wide perks
- XP Requirement: **~70–75% (~1.4M–1.5M XP)**

---

### 2.3 Level-Up Handling

On level-up:
1. Add level rewards
2. Trigger UI animation
3. Check milestone unlock table
4. Apply permanent modifiers
5. Log telemetry event

```json
{
  "event": "level_up",
  "player_id": "...",
  "beast_id": "...",
  "new_level": X,
  "total_xp": Y
}
```

---

## 3. XP Sources (Detailed Logic)

### 3.1 Blackjack XP
XP is awarded per completed hand.

**Conditions:**
- Player must place a valid bet
- Hand must be completed (win/loss/draw all count)

**Streak Bonus:**
```
streak_multiplier = 1 + (0.02 * current_streak)
cap at +20% (10 streak)
```

---

### 3.2 Daily Missions
- Reset: **00:00 UTC daily**
- Fixed XP reward (no scaling)

```json
{
  "mission_id": "win_5_hands",
  "xp_reward": 2500
}
```

---

### 3.3 Feeding / Activities

Affects multiplier (NOT raw XP):

| State   | Multiplier |
|--------|-----------|
| Poor   | 0.95x     |
| Normal | 1.00x     |
| Good   | 1.05x     |
| Perfect| 1.10x     |

**Decay:**
```
Every 6 hours → downgrade 1 tier
```

---

### 3.4 Capsules

| Type       | XP Range        |
|-----------|----------------|
| Common     | 500–1,000 XP   |
| Rare       | 2,000–5,000 XP |
| Legendary  | 10,000–25,000 XP |

---

### 3.5 Evolution Bonus XP
```
Stage 2: +5,000 XP
Stage 3: +10,000 XP
```

---

### 3.6 Prestige XP Sources (Unlocked at Level 36)
- Ranked matches
- Event participation
- Staked challenges

All must:
- Use capped XP formulas
- Be time-normalized

---

## 4. XP Formula & Wager Cap

### 4.1 Base XP Formula
```
XP = 40 + (bet / 100) * multiplier * streak_multiplier
```

---

### 4.2 Variable Definitions

| Variable | Description |
|----------|------------|
| bet | Chips wagered (capped) |
| multiplier | Combined XP multiplier |
| streak_multiplier | From win streak |

---

### 4.3 Wager Cap Enforcement
```
effective_bet = min(player_bet, beast_wager_cap)
```

---

### 4.4 Example Calculation
```
Bet = 12,000
Cap = 10,000
effective_bet = 10,000

XP = 40 + (10000 / 100) * 1.3 * 1.1
XP = 183 XP
```

---

## 5. Progression Curve & XP Table

### 5.1 Curve Formula
```
XP_to_next_level = base * (level ^ 1.35)
base = 120
```

---

### 5.2 Total XP Target
- Level 99 total ≈ **2,000,000 XP**

---

### 5.3 Scaling Behavior
- Levels 1–20: fast progression
- Levels 21–35: moderate slowdown
- Levels 36–60: steady grind
- Levels 61–99: heavy grind

---

## 6. Evolution System (Full Detail)

### 6.1 Evolution Thresholds

| Stage | Levels |
|------|--------|
| Stage 1 | 1–12 |
| Stage 2 | 13–22 |
| Stage 3 | 23–35 |

---

### 6.2 Evolution Trigger
```
Trigger when player_level == threshold_level
```

---

### 6.3 Evolution Rewards

#### Stage 2
- Multiplier: ×1.13
- Wager Cap: +5,000
- Unlock ability slot

#### Stage 3
- Multiplier: ×1.28 (compounded)
- Wager Cap: +10,000
- Upgrade abilities

---

### 6.4 Archetype System
Each beast includes:
- Role prefix (e.g., Aggressive, Defensive)
- Ability scaling tied to evolution stage

---

## 7. Prestige & Milestones

### 7.1 Reward Types
- Titles
- Badges
- Icons
- Frames
- Consumables
- Functional boosts

---

### 7.2 Milestone Table

#### Level 40
- Title: Veteran
- Rewards:
  - 3× food items
  - 1× capsule

#### Level 50
- +2% XP gain (global)
- +1 daily mission slot
- +1 wheel spin/day

#### Level 60
- Title: Champion
- Unlock: Event system

#### Level 70
- Badge unlock
- Fast-track matchmaking queue

#### Level 80
- +5% legendary drop rate

#### Level 90
- Global icon unlock

#### Level 99
- Max Prestige Skin
- Exclusive Title
- Animated Frame

---

## 8. XP Multiplier System

### 8.1 Sources

| Source | Range |
|--------|------|
| Evolution | 1.0 → 1.28 |
| Feeding | 0.95 → 1.10 |
| Items | 1.05 → 1.50 |

---

### 8.2 Stacking Rule
```
final_multiplier = evolution * feeding * item
```

---

### 8.3 Hard Cap
```
if final_multiplier > 2.0 → set to 2.0
```

---

### 8.4 Diminishing Returns (Optional)
```
After 1.5x:
effective_bonus = bonus * 0.5
```

---

### 8.5 Anti-Abuse Systems

**XP/hour soft cap:**
```
If XP > threshold → reduce gains by 20%
```

**Item cooldowns:**
```
XP boost items → 30 min cooldown
```

---

## 9. Burn/Earn Balance

### 9.1 Core Principle
XP must not scale linearly with chips spent.

---

### 9.2 Safeguards
- Wager cap per beast
- Time-based XP normalization
- Non-bet XP sources

---

### 9.3 Monitoring Metrics
Track:
- XP/hour
- Chips spent vs XP gained
- High-spender vs low-spender progression

---

## 10. Implementation Notes

### 10.1 Config Example

```json
{
  "xp_base": 40,
  "xp_per_100_bet": 1,
  "multiplier_cap": 2.0,
  "wager_caps": {
    "stage1": 5000,
    "stage2": 10000,
    "stage3": 20000
  }
}
```

---

### 10.2 Required Systems
- XP Manager
- Multiplier Engine
- Progression Tracker
- Reward Distributor
- Telemetry Logger

---

### 10.3 Order of Operations
1. Apply wager cap
2. Calculate base XP
3. Apply multipliers
4. Apply streak bonus
5. Clamp values
6. Add XP
7. Check level-up

---

## 11. UI/UX Requirements

### 11.1 Player Display
- XP bar (current / next level)
- Multiplier breakdown tooltip:

```
Base: 1.00x
Evolution: +0.28
Feeding: +0.10
Item: +0.50
Total: 1.88x
```

---

### 11.2 Milestone UI
- Pop-up card on unlock
- Persistent “Next Milestone” tracker

---

### 11.3 Evolution Feedback
- Animation
- Sound effect
- Stat preview

---

## 12. Appendix

### 12.1 Example Full XP Flow
```
1. Player bets 8,000
2. Cap = 5,000 → effective bet = 5,000
3. Base XP = 40 + (5000 / 100) = 90
4. Multipliers = 1.28 * 1.10 * 1.20 = 1.69
5. Final XP = 90 * 1.69 = 152 XP
```

---

### 12.2 Future Extensions
- Seasonal prestige resets
- Leaderboards
- Clan XP systems
- Co-op multipliers
