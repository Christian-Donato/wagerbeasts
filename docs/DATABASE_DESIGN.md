# Database Design

## Overview

The WagerBeasts database is designed to support a gamified wagering platform with complex relationships between users, beasts, games, and economic transactions. The schema prioritizes performance, data integrity, and scalability.

## Database Technology

- **Primary Database**: PostgreSQL 15+
- **ORM**: Prisma for type-safe database access
- **Migration Strategy**: Version-controlled schema migrations
- **Backup**: Daily automated backups with point-in-time recovery

## Core Entities

### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  role VARCHAR(20) DEFAULT 'user',
  preferences JSONB DEFAULT '{}'
);
```

**Indexes**: email, username, created_at, last_login_at

### Beasts
```sql
CREATE TABLE beasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  species_id VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  rarity VARCHAR(20) NOT NULL CHECK (rarity IN ('common', 'uncommon', 'rare', 'legendary')),
  level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 99),
  experience BIGINT DEFAULT 0,
  evolution_stage INTEGER DEFAULT 1 CHECK (evolution_stage >= 1 AND evolution_stage <= 3),
  hunger INTEGER DEFAULT 100 CHECK (hunger >= 0 AND hunger <= 100),
  happiness INTEGER DEFAULT 0 CHECK (happiness >= 0 AND happiness <= 100),
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_fed_at TIMESTAMP WITH TIME ZONE,
  last_played_at TIMESTAMP WITH TIME ZONE
);
```

**Indexes**: user_id, species_id, level, experience, is_active, created_at

### Beast Species
```sql
CREATE TABLE beast_species (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rarity VARCHAR(20) NOT NULL,
  base_image_url VARCHAR(500),
  evolution_1_image_url VARCHAR(500),
  evolution_2_image_url VARCHAR(500),
  evolution_3_image_url VARCHAR(500),
  evolution_level_2 INTEGER NOT NULL,
  evolution_level_3 INTEGER,
  base_stats JSONB DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**: rarity, evolution_level_2, evolution_level_3

### Games
```sql
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  beast_id UUID REFERENCES beasts(id) ON DELETE SET NULL,
  game_type VARCHAR(50) NOT NULL, -- 'blackjack', 'slots', etc.
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  wager_amount BIGINT DEFAULT 0,
  payout_amount BIGINT DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  game_data JSONB DEFAULT '{}', -- Game-specific state
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**: user_id, beast_id, game_type, status, started_at, completed_at

### Missions
```sql
CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'daily', 'weekly', 'achievement'
  title VARCHAR(200) NOT NULL,
  description TEXT,
  requirements JSONB NOT NULL, -- Mission completion criteria
  rewards JSONB NOT NULL, -- XP, chips, items, etc.
  is_active BOOLEAN DEFAULT TRUE,
  max_completions INTEGER DEFAULT 1,
  cooldown_hours INTEGER DEFAULT 24,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**: type, is_active, created_at

### User Missions
```sql
CREATE TABLE user_missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  progress JSONB DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE,
  claimed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, mission_id, created_at::date) -- One completion per day per mission
);
```

**Indexes**: user_id, mission_id, completed_at, claimed_at, expires_at

### Transactions
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'game_wager', 'game_payout', 'shop_purchase', 'capsule_open'
  amount BIGINT NOT NULL,
  balance_before BIGINT NOT NULL,
  balance_after BIGINT NOT NULL,
  reference_type VARCHAR(50), -- 'game', 'mission', 'shop_item'
  reference_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**: user_id, type, created_at, reference_type, reference_id

### Shop Items
```sql
CREATE TABLE shop_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'food', 'toy', 'capsule', 'lottery_ticket'
  rarity VARCHAR(20),
  price BIGINT NOT NULL,
  effects JSONB DEFAULT '{}', -- Hunger restore, happiness boost, etc.
  is_available BOOLEAN DEFAULT TRUE,
  stock_remaining INTEGER, -- NULL for unlimited
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**: type, rarity, is_available, price

### User Inventory
```sql
CREATE TABLE user_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES shop_items(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, item_id, acquired_at) -- Prevent duplicate entries
);
```

**Indexes**: user_id, item_id, expires_at

### Leaderboards
```sql
CREATE TABLE leaderboard_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  season VARCHAR(20) NOT NULL, -- '2024-q1', 'all-time'
  category VARCHAR(50) NOT NULL, -- 'total_levels', 'luckychips', 'collection'
  score BIGINT NOT NULL,
  rank INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, season, category)
);
```

**Indexes**: season, category, score DESC, rank

### Daily Wheel Spins
```sql
CREATE TABLE daily_wheel_spins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  spin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  result JSONB NOT NULL, -- Prize details
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, spin_date)
);
```

**Indexes**: user_id, spin_date

### Lottery Tickets
```sql
CREATE TABLE lottery_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  draw_date DATE NOT NULL,
  numbers INTEGER[] NOT NULL CHECK (array_length(numbers, 1) = 6),
  is_random BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, draw_date, numbers)
);
```

**Indexes**: user_id, draw_date

### Lottery Draws
```sql
CREATE TABLE lottery_draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draw_date DATE NOT NULL UNIQUE,
  winning_numbers INTEGER[] NOT NULL CHECK (array_length(winning_numbers, 1) = 6),
  jackpot_amount BIGINT NOT NULL,
  total_tickets INTEGER DEFAULT 0,
  winner_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'drawn', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  drawn_at TIMESTAMP WITH TIME ZONE
);
```

**Indexes**: draw_date, status

### Crypto Wash Transactions
```sql
CREATE TABLE crypto_wash_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount BIGINT NOT NULL CHECK (amount > 0),
  expected_return BIGINT NOT NULL, -- 102.5% of amount
  actual_return BIGINT,
  status VARCHAR(20) DEFAULT 'locked' CHECK (status IN ('locked', 'completed', 'failed')),
  locked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unlock_at TIMESTAMP WITH TIME ZONE NOT NULL, -- 24 hours later
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, locked_at) -- One transaction per user per lock period
);
```

**Indexes**: user_id, status, unlock_at

### Black Market Transactions
```sql
CREATE TABLE black_market_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount BIGINT NOT NULL CHECK (amount > 0),
  outcome VARCHAR(20) CHECK (outcome IN ('success', 'failure')),
  return_multiplier DECIMAL(3,2), -- 1.15 for success, 0.85 for failure
  actual_return BIGINT,
  status VARCHAR(20) DEFAULT 'locked' CHECK (status IN ('locked', 'completed')),
  locked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unlock_at TIMESTAMP WITH TIME ZONE NOT NULL, -- 24 hours later
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, locked_at) -- One transaction per user per lock period
);
```

**Indexes**: user_id, status, unlock_at, outcome

### Community Votes
```sql
CREATE TABLE community_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  poll_id VARCHAR(50) NOT NULL,
  choice VARCHAR(100) NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reward_claimed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, poll_id)
);
```

**Indexes**: user_id, poll_id, voted_at

### Community Polls
```sql
CREATE TABLE community_polls (
  id VARCHAR(50) PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of option objects
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closes_at TIMESTAMP WITH TIME ZONE,
  results JSONB -- Vote counts per option
);
```

**Indexes**: is_active, closes_at

## Relationships

### User → Beasts (1:N)
- One user can have multiple beasts
- Foreign key: beasts.user_id → users.id

### User → Games (1:N)
- One user can have multiple game sessions
- Foreign key: games.user_id → users.id

### Beast → Games (1:N)
- One beast can be used in multiple games
- Foreign key: games.beast_id → beasts.id

### User → User Missions (1:N)
- One user can have multiple mission progress entries
- Foreign key: user_missions.user_id → users.id

### Mission → User Missions (1:N)
- One mission can have multiple user progress entries
- Foreign key: user_missions.mission_id → missions.id

### User → Transactions (1:N)
- One user can have multiple transactions
- Foreign key: transactions.user_id → users.id

### User → Inventory (1:N)
- One user can have multiple inventory items
- Foreign key: user_inventory.user_id → users.id

### Shop Item → Inventory (1:N)
- One item can be in multiple user inventories
- Foreign key: user_inventory.item_id → shop_items.id

### User → Leaderboard Entries (1:N)
- One user can have multiple leaderboard entries
- Foreign key: leaderboard_entries.user_id → users.id

### User → Daily Wheel Spins (1:N)
- One user can have multiple daily spins
- Foreign key: daily_wheel_spins.user_id → users.id

## Data Integrity Constraints

### Check Constraints
- Beast level: 1-99
- Beast hunger/happiness: 0-100
- Game status: active, completed, abandoned
- Rarity: common, uncommon, rare, legendary
- Mission type: daily, weekly, achievement

### Unique Constraints
- User email and username uniqueness
- One daily wheel spin per user per day
- One mission completion per user per mission per day

### Foreign Key Constraints
- All relationships use CASCADE or SET NULL appropriately
- Ensures referential integrity

## Indexing Strategy

### Primary Indexes
- All primary keys are automatically indexed

### Foreign Key Indexes
- All foreign key columns are indexed for performance

### Query-Specific Indexes
- User searches: email, username
- Game queries: user_id + status, user_id + game_type
- Leaderboard queries: season + category + score
- Mission queries: user_id + mission_id + completed_at

### Composite Indexes
- (user_id, created_at) on transactions for user transaction history
- (user_id, is_active) on beasts for active beast queries
- (season, category, score DESC) on leaderboards for ranking queries

## Partitioning Strategy

### Time-Based Partitioning
- Transactions table: Partition by month
- Games table: Partition by month
- User missions: Partition by month

### Benefits
- Improved query performance for time-range queries
- Easier data archiving and deletion
- Better backup and restore performance

## Performance Optimizations

### Connection Pooling
- Use PgBouncer for connection pooling
- Configure appropriate pool sizes based on load

### Query Optimization
- Use EXPLAIN ANALYZE for query performance analysis
- Implement query result caching where appropriate
- Use database views for complex aggregations

### Read Replicas
- Implement read replicas for read-heavy operations
- Direct leaderboard and historical data queries to replicas

## Backup and Recovery

### Backup Strategy
- Daily full backups
- Hourly incremental backups for critical data
- Point-in-time recovery capability

### Recovery Testing
- Regular recovery testing
- Documented recovery procedures
- Offsite backup storage

## Monitoring

### Key Metrics
- Query performance statistics
- Table size and growth rates
- Index usage statistics
- Connection pool utilization

### Alerting
- Slow query alerts
- Disk space warnings
- Replication lag monitoring

## Migration Strategy

### Schema Changes
- Use Prisma migrations for schema changes
- Test migrations in staging environment first
- Implement zero-downtime migration strategies

### Data Migrations
- Script complex data transformations
- Validate data integrity after migrations
- Maintain rollback capabilities

## Security Considerations

### Data Encryption
- Encrypt sensitive data at rest
- Use TLS for data in transit
- Implement proper access controls

### Audit Logging
- Log all data modifications
- Maintain audit trails for financial transactions
- Implement compliance reporting capabilities

## Future Considerations

### Scalability
- Database sharding for user data if needed
- Implement database clustering for high availability
- Consider moving to distributed databases if scale requires

### Analytics
- Implement data warehouse for advanced analytics
- Set up ETL processes for reporting data
- Integrate with business intelligence tools