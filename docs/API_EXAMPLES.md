# API Request / Response Examples

This file contains example JSON request and response payloads for core endpoints (Shop, Bag, Bestiary, MyBeasts, Leaderboard, Profile). Use these as contract references for frontend development and contract tests.

1) Shop

- GET /api/shop/items?category=beasts&q=gold&page=1&limit=24

Response 200
{
  "items": [
    {
      "id": "beast_skin_golden_1",
      "type": "skin",
      "title": "Golden Beast Skin",
      "description": "A premium golden skin.",
      "price": { "amount": 499, "currency": "LuckyChips" },
      "thumbnailUrl": "/assets/shop/golden_beast@2x.png",
      "featured": true
    }
  ],
  "page": 1,
  "limit": 24,
  "total": 142
}

- POST /api/shop/purchase

Request
{
  "userId": "user_123",
  "itemId": "beast_skin_golden_1",
  "qty": 1,
  "clientNonce": "abc-123"
}

Success Response 200
{
  "success": true,
  "transactionId": "tx_202603311230_0001",
  "newBalance": { "amount": 1201, "currency": "LuckyChips" }
}

Failure Response 400 (insufficient funds)
{
  "success": false,
  "errors": [ { "code": "INSUFFICIENT_FUNDS", "message": "You need 499 LuckyChips to buy this item." } ]
}

2) Wallet

- GET /api/wallet

Response 200
{
  "userId": "user_123",
  "balance": { "amount": 1201, "currency": "LuckyChips" },
  "reserved": []
}

3) Bag (Inventory)

- GET /api/bag?userId=user_123

Response 200
{
  "items": [
    { "id": "bag_1", "itemId": "xp_pack_small", "type": "xp", "title": "Small XP Pack", "qty": 3, "thumbnailUrl": "/assets/bag/xp_small@2x.png" }
  ]
}

- POST /api/bag/use

Request
{
  "userId": "user_123",
  "itemId": "bag_1",
  "qty": 1
}

Response 200
{
  "success": true,
  "effects": { "xpGranted": 500 },
  "updatedItem": { "id": "bag_1", "qty": 2 }
}

4) Bestiary

- GET /api/bestiary?ownedOnly=true

Response 200
{
  "species": [
    { "speciesId": "frostpaw", "name": "Frostpaw", "rarity": "rare", "portraitUrl": "/assets/bestiary/frostpaw@2x.png" }
  ],
  "owned": [
    { "id": "beast_inst_42", "speciesId": "frostpaw", "level": 5, "xp": 420 }
  ]
}

5) MyBeasts (owned instances)

- GET /api/mybeasts?userId=user_123

Response 200
{
  "beasts": [
    { "id": "beast_inst_42", "speciesId": "frostpaw", "nickname": "Chill", "level": 5, "xp": 420, "equippedSkinId": null }
  ]
}

- POST /api/mybeasts/feed

Request
{
  "beastId": "beast_inst_42",
  "xpItemId": "xp_pack_small",
  "qty": 1
}

Response 200
{
  "success": true,
  "beast": { "id": "beast_inst_42", "level": 6, "xp": 10 },
  "transactions": [ { "type": "consume_item", "itemId": "xp_pack_small", "qty": 1 } ]
}

6) Leaderboard

- GET /api/leaderboard?timeframe=day&scope=global&page=1&limit=50

Response 200
{
  "entries": [
    { "rank": 1, "userId": "user_1", "displayName": "AcePlayer", "avatarUrl": "/assets/avatars/ace@2x.png", "score": 12400 }
  ],
  "myPosition": { "rank": 42, "score": 8900 }
}

7) Profile

- GET /api/profile/me (auth required)

Response 200
{
  "userId": "user_123",
  "displayName": "You",
  "handle": "you",
  "avatarUrl": "/assets/avatars/you@2x.png",
  "stats": { "rank": 42, "winRate": 0.58, "totalXp": 12345 }
}

- PATCH /api/profile/me

Request
{
  "displayName": "NewName",
  "bio": "I love beasts.",
  "settings": { "showActivity": true }
}

Response 200
{
  "success": true,
  "profile": { "userId":"user_123","displayName":"NewName","bio":"I love beasts." }
}

8) Error format (common)

Response 4xx/5xx
{
  "success": false,
  "errors": [ { "code": "ERR_CODE", "message": "Human readable message.", "meta": {  } } ]
}

Notes

- Timestamps, pagination cursors, and auth headers are omitted for brevity; include `requestId` and `serverTimestamp` in production responses where helpful for debugging.
- Use the `errors` array for machine-readable codes and human messages; prefer stable error codes for contract tests.
