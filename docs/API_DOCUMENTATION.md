# API Documentation

## Overview

The WagerBeasts API provides RESTful endpoints for game functionality, user management, and economic transactions. All endpoints require authentication except for user registration and login.

## Base URL
```
https://api.wagerbeasts.com/v1
```

## Authentication

### JWT Token
All authenticated requests must include the JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Token Expiration
- Access tokens expire after 1 hour
- Refresh tokens expire after 7 days
- Use `/auth/refresh` endpoint to obtain new access tokens

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  }
}
```

## Rate Limiting

- **Authenticated Users**: 1000 requests per hour
- **Unauthenticated Users**: 100 requests per hour
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "tokens": {
      "access_token": "jwt_token",
      "refresh_token": "refresh_token"
    }
  }
}
```

#### POST /auth/login
Authenticate user and return tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** Same as register response.

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "refresh_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token"
  }
}
```

#### POST /auth/logout
Invalidate the current session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Management

#### GET /users/profile
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "username",
      "luckychips": 1000,
      "created_at": "2024-01-01T00:00:00Z",
      "last_login_at": "2024-01-01T12:00:00Z"
    }
  }
}
```

#### PUT /users/profile
Update user profile.

**Request Body:**
```json
{
  "username": "new_username",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}
```

#### GET /users/stats
Get user statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total_games_played": 150,
      "total_xp_earned": 50000,
      "beasts_owned": 12,
      "highest_beast_level": 45,
      "luckychips_won": 25000,
      "luckychips_spent": 20000
    }
  }
}
```

### Beast Management

#### GET /beasts
Get user's beast collection.

**Query Parameters:**
- `active_only` (boolean): Return only active beast
- `rarity` (string): Filter by rarity
- `level_min` (number): Minimum level filter
- `level_max` (number): Maximum level filter

**Response:**
```json
{
  "success": true,
  "data": {
    "beasts": [
      {
        "id": "uuid",
        "species_id": "fire_dragon",
        "name": "Flame",
        "rarity": "rare",
        "level": 25,
        "experience": 15000,
        "evolution_stage": 2,
        "hunger": 75,
        "happiness": 60,
        "is_active": true,
        "last_fed_at": "2024-01-01T10:00:00Z",
        "last_played_at": "2024-01-01T11:00:00Z"
      }
    ],
    "total": 12
  }
}
```

#### POST /beasts
Create a new beast (from starter or capsule).

**Request Body:**
```json
{
  "species_id": "fire_dragon",
  "name": "Flame"
}
```

#### GET /beasts/{id}
Get specific beast details.

**Response:**
```json
{
  "success": true,
  "data": {
    "beast": {
      "id": "uuid",
      "species_id": "fire_dragon",
      "name": "Flame",
      "rarity": "rare",
      "level": 25,
      "experience": 15000,
      "evolution_stage": 2,
      "hunger": 75,
      "happiness": 60,
      "is_active": true,
      "stats": {
        "xp_multiplier": 1.1,
        "luck_bonus": 5
      },
      "last_fed_at": "2024-01-01T10:00:00Z",
      "last_played_at": "2024-01-01T11:00:00Z"
    }
  }
}
```

#### PUT /beasts/{id}
Update beast (rename, switch active status).

**Request Body:**
```json
{
  "name": "New Name",
  "is_active": true
}
```

#### DELETE /beasts/{id}
Release a beast (remove from collection).

#### POST /beasts/{id}/feed
Feed the beast with food item.

**Request Body:**
```json
{
  "item_id": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "beast": { ... },
    "xp_earned": 10,
    "hunger_restored": 25
  }
}
```

#### POST /beasts/{id}/play
Use toy item on beast.

**Request Body:**
```json
{
  "item_id": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "beast": { ... },
    "happiness_boost": 15
  }
}
```

### Gameplay

#### POST /games/blackjack/start
Start a new blackjack game.

**Request Body:**
```json
{
  "wager": 100,
  "beast_id": "uuid" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "game": {
      "id": "uuid",
      "status": "active",
      "wager": 100,
      "player_hand": [
        {"suit": "hearts", "value": "A"},
        {"suit": "clubs", "value": "10"}
      ],
      "dealer_hand": [
        {"suit": "spades", "value": "7"},
        {"suit": "hidden", "value": "hidden"}
      ],
      "player_score": 21,
      "can_hit": false,
      "can_stand": true,
      "can_double": false
    }
  }
}
```

#### POST /games/blackjack/{game_id}/hit
Hit in blackjack game.

**Response:** Updated game state.

#### POST /games/blackjack/{game_id}/stand
Stand in blackjack game.

**Response:** Final game result.

#### POST /games/blackjack/{game_id}/double
Double down in blackjack game.

**Response:** Updated game state.

#### GET /games/history
Get user's game history.

**Query Parameters:**
- `game_type` (string): Filter by game type
- `limit` (number): Number of results (default 20)
- `offset` (number): Pagination offset

**Response:**
```json
{
  "success": true,
  "data": {
    "games": [
      {
        "id": "uuid",
        "game_type": "blackjack",
        "status": "completed",
        "wager": 100,
        "payout": 200,
        "xp_earned": 50,
        "started_at": "2024-01-01T10:00:00Z",
        "completed_at": "2024-01-01T10:05:00Z"
      }
    ],
    "total": 150
  }
}
```

### Missions

#### GET /missions
Get available missions.

**Query Parameters:**
- `type` (string): daily, weekly, achievement
- `completed` (boolean): Include completed missions

**Response:**
```json
{
  "success": true,
  "data": {
    "missions": [
      {
        "id": "uuid",
        "type": "daily",
        "title": "Feed Your Beast",
        "description": "Feed your active beast 3 times",
        "requirements": {
          "feed_count": 3
        },
        "rewards": {
          "xp": 100,
          "luckychips": 50
        },
        "progress": {
          "feed_count": 1
        },
        "is_completed": false,
        "expires_at": "2024-01-02T00:00:00Z"
      }
    ]
  }
}
```

#### POST /missions/{id}/claim
Claim mission rewards.

**Response:**
```json
{
  "success": true,
  "data": {
    "rewards": {
      "xp": 100,
      "luckychips": 50,
      "items": []
    }
  }
}
```

### Shop & Economy

#### GET /shop/items
Get available shop items.

**Query Parameters:**
- `type` (string): food, toy, capsule, lottery_ticket
- `rarity` (string): Filter capsules by rarity

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Premium Capsule",
        "type": "capsule",
        "rarity": "legendary",
        "price": 500,
        "description": "Contains a Legendary beast",
        "stock_remaining": 100
      }
    ]
  }
}
```

#### POST /shop/purchase
Purchase item from shop.

**Request Body:**
```json
{
  "item_id": "uuid",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "id": "uuid",
      "amount": -500,
      "balance_after": 500
    },
    "items": [
      {
        "id": "uuid",
        "type": "capsule",
        "rarity": "legendary"
      }
    ]
  }
}
```

#### POST /shop/capsules/{capsule_id}/open
Open a capsule to get a beast.

**Response:**
```json
{
  "success": true,
  "data": {
    "beast": {
      "id": "uuid",
      "species_id": "legendary_beast",
      "name": "Legendary Beast",
      "rarity": "legendary"
    }
  }
}
```

#### GET /transactions
Get user's transaction history.

**Query Parameters:**
- `type` (string): Filter by transaction type
- `limit` (number): Number of results
- `offset` (number): Pagination offset

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "type": "game_payout",
        "amount": 200,
        "balance_after": 1200,
        "created_at": "2024-01-01T10:05:00Z",
        "reference_type": "game",
        "reference_id": "uuid"
      }
    ],
    "total": 500
  }
}
```

### Daily Features

#### POST /daily/wheel/spin
Spin the daily wheel.

**Response:**
```json
{
  "success": true,
  "data": {
    "result": {
      "type": "luckychips",
      "amount": 100,
      "rarity": "common"
    },
    "next_spin_available": "2024-01-02T00:00:00Z"
  }
}
```

#### GET /daily/wheel/status
Check daily wheel status.

**Response:**
```json
{
  "success": true,
  "data": {
    "can_spin": true,
    "next_spin_available": null,
    "last_spin_at": "2024-01-01T08:00:00Z"
  }
}
```

#### GET /daily/missions
Get today's daily missions.

**Response:**
```json
{
  "success": true,
  "data": {
    "missions": [
      {
        "id": "uuid",
        "type": "daily",
        "title": "Feed Your Beast",
        "description": "Feed your active beast 3 times",
        "requirements": {
          "feed_count": 3
        },
        "rewards": {
          "xp": 100,
          "luckychips": 50
        },
        "progress": {
          "feed_count": 1
        },
        "is_completed": false,
        "expires_at": "2024-01-02T00:00:00Z"
      }
    ]
  }
}
```

#### POST /daily/missions/{id}/claim
Claim completed daily mission rewards.

**Response:**
```json
{
  "success": true,
  "data": {
    "rewards": {
      "xp": 100,
      "luckychips": 50,
      "items": []
    }
  }
}
```

### Lottery

#### GET /lottery/status
Get current lottery status and jackpot.

**Response:**
```json
{
  "success": true,
  "data": {
    "current_draw": {
      "draw_date": "2024-01-01",
      "jackpot_amount": 1500000,
      "total_tickets": 2847,
      "next_draw_at": "2024-01-02T00:00:00Z"
    },
    "last_draw": {
      "draw_date": "2023-12-31",
      "winning_numbers": [5, 12, 18, 23, 27, 30],
      "jackpot_winner": "winning_user",
      "jackpot_amount": 1200000
    }
  }
}
```

#### POST /lottery/buy-ticket
Buy lottery ticket(s).

**Request Body:**
```json
{
  "quantity": 1,
  "numbers": [5, 12, 18, 23, 27, 30], // optional, random if not provided
  "is_random": true // optional, defaults to true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "uuid",
        "numbers": [5, 12, 18, 23, 27, 30],
        "is_random": false,
        "draw_date": "2024-01-01"
      }
    ],
    "total_cost": 50
  }
}
```

#### GET /lottery/my-tickets
Get user's lottery tickets for current draw.

**Response:**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "uuid",
        "numbers": [5, 12, 18, 23, 27, 30],
        "is_random": false,
        "draw_date": "2024-01-01"
      }
    ]
  }
}
```

### Crypto Wash & Black Market

#### POST /crypto/wash
Initiate crypto wash transaction (24h lock, +2.5% guaranteed).

**Request Body:**
```json
{
  "amount": 10000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "id": "uuid",
      "amount": 10000,
      "expected_return": 10250,
      "unlock_at": "2024-01-02T10:00:00Z"
    }
  }
}
```

#### POST /black-market/run
Initiate black market run (24h lock, 60% +15% / 40% -15%).

**Request Body:**
```json
{
  "amount": 10000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "id": "uuid",
      "amount": 10000,
      "unlock_at": "2024-01-02T10:00:00Z"
    }
  }
}
```

#### GET /crypto/transactions
Get user's crypto transactions.

**Query Parameters:**
- `type` (string): wash, black_market
- `status` (string): locked, completed

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "type": "wash",
        "amount": 10000,
        "expected_return": 10250,
        "actual_return": 10250,
        "status": "completed",
        "locked_at": "2024-01-01T10:00:00Z",
        "completed_at": "2024-01-02T10:00:00Z"
      }
    ]
  }
}
```

### Community Features

#### GET /community/polls
Get active community polls.

**Response:**
```json
{
  "success": true,
  "data": {
    "polls": [
      {
        "id": "feature-vote-001",
        "question": "What feature should we add next?",
        "options": [
          {"id": "slots", "text": "Slots Machine"},
          {"id": "pvp", "text": "PvP Battles"},
          {"id": "guilds", "text": "Guild System"}
        ],
        "closes_at": "2024-01-15T00:00:00Z"
      }
    ]
  }
}
```

#### POST /community/polls/{poll_id}/vote
Vote on a community poll.

**Request Body:**
```json
{
  "choice": "slots"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reward": {
      "luckychips": 5000
    }
  }
}
```

### Leaderboards

#### GET /leaderboards
Get leaderboard rankings.

**Query Parameters:**
- `season` (string): current, all-time
- `category` (string): total_levels, luckychips, collection
- `limit` (number): Number of results (default 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "user": {
          "username": "top_player",
          "total_levels": 500
        },
        "score": 500
      }
    ],
    "user_rank": {
      "rank": 150,
      "score": 45
    }
  }
}
```

### Bestiary

#### GET /bestiary
Get bestiary progress.

**Response:**
```json
{
  "success": true,
  "data": {
    "species": [
      {
        "id": "fire_dragon",
        "name": "Fire Dragon",
        "rarity": "rare",
        "unlocked": true,
        "owned": true,
        "max_level": 45,
        "evolution_stage": 2
      }
    ],
    "stats": {
      "total_species": 100,
      "unlocked_species": 25,
      "completion_percentage": 25
    }
  }
}
```

#### GET /bestiary/{species_id}
Get detailed species information.

**Response:**
```json
{
  "success": true,
  "data": {
    "species": {
      "id": "fire_dragon",
      "name": "Fire Dragon",
      "rarity": "rare",
      "description": "A fierce dragon that breathes fire...",
      "evolution_levels": [1, 20, 40],
      "images": {
        "stage1": "url",
        "stage2": "url",
        "stage3": "url"
      }
    }
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid request data |
| `AUTHENTICATION_ERROR` | Invalid or missing authentication |
| `AUTHORIZATION_ERROR` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `INSUFFICIENT_FUNDS` | Not enough LuckyChips |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `GAME_ERROR` | Game logic error |
| `SERVER_ERROR` | Internal server error |

## WebSocket Events

For real-time features, the API supports WebSocket connections at `/ws`.

### Game Updates
```json
{
  "type": "game_update",
  "game_id": "uuid",
  "data": { ... }
}
```

### Beast Updates
```json
{
  "type": "beast_update",
  "beast_id": "uuid",
  "data": { ... }
}
```

### Notifications
```json
{
  "type": "notification",
  "title": "Mission Complete!",
  "message": "You've earned 100 XP",
  "type": "success"
}
```

## Versioning

API versions are indicated in the URL path (e.g., `/v1/`). Breaking changes will result in new version numbers. Non-breaking changes are additive and backward-compatible.

## SDKs and Libraries

- **JavaScript SDK**: Available on npm as `wagerbeasts-sdk`
- **Mobile SDKs**: iOS and Android SDKs available
- **Postman Collection**: Available for API testing

## Support

For API support or questions:
- Email: api-support@wagerbeasts.com
- Documentation: https://docs.wagerbeasts.com
- Status Page: https://status.wagerbeasts.com