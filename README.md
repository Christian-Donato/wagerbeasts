# WagerBeasts

A gamified wagering platform featuring collectible beasts, blackjack gameplay, and progression systems inspired by Old School RuneScape.

## Overview

WagerBeasts combines pet simulation mechanics with casino-style gambling, where players collect and evolve digital beasts while earning LuckyChips through blackjack and other activities. The game features a retention-focused design with daily engagement loops, progression systems, and social competition.

## Features

### Core Gameplay
- **Beast Collection & Progression**: Collect, feed, and evolve beasts with OSRS-style XP scaling
- **Blackjack**: Primary gameplay loop with wager-based XP and chip rewards
- **Missions**: Daily and weekly tasks for additional rewards
- **Daily Wheel**: Free daily spins for rewards and engagement

### Social & Competition
- **Global Leaderboards**: Compete in total levels, LuckyChips, and collection size
- **Bestiary**: Complete collection of all available beasts

### Economy
- **LuckyChips**: In-game currency earned through gameplay
- **Shop**: Purchase food, toys, and capsules for beast progression
- **Capsules**: Gacha-style beast acquisition with rarity tiers

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with secure session management
- **Real-time Features**: WebSocket for live gameplay
- **Blockchain Integration**: For crypto wash and black market features
- **Deployment**: Docker containers with Kubernetes orchestration

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/wagerbeasts.git
   cd wagerbeasts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Development

- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
wagerbeasts/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── constants/     # Application constants
├── prisma/
│   ├── schema.prisma  # Database schema
│   └── migrations/    # Database migrations
├── docs/              # Documentation
├── tests/             # Test files
├── .env.example       # Environment variables template
├── docker-compose.yml # Docker configuration
└── package.json       # Dependencies and scripts
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Roadmap

See [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md) for the current development roadmap and milestones.

## Security

This project handles real-money transactions and user data. Security is paramount. See [SECURITY.md](SECURITY.md) for security considerations and best practices.

## License

This project is proprietary. All rights reserved.

## Contact

For questions or support, please contact the development team.