# Component Checklist & Storybook Stubs

This checklist maps UI components required to implement the blackjack screen to concrete Storybook story names, props, states, token usage, and acceptance criteria. Use it to scaffold component development and create Storybook stories for visual QA.

Guidelines

- All components must consume design tokens from `design/tokens.css` (or tokens.json via a token pipeline).
- Components should be documented in Storybook with the stories listed below and include accessibility knobs (aria labels, keyboard interactions, reduced motion toggle).
- Keep components small, pure where possible, and provide clear props for state management.

Top-level components

1. BlackjackHeader
- Purpose: Top HUD showing avatar, wordmark, LuckyChips balance pill.
- Props:
  - `avatarUrl?: string`
  - `wordmark?: string`
  - `balance: { amount: number, currency: string }`
  - `onAvatarClick?: () => void`
- Stories:
  - `Header/Default` (avatar present, balance shown)
  - `Header/NoAvatar` (placeholder avatar)
  - `Header/LongBalance` (large number formatting)
- Tokens: `--type-wordmark`, `--space-md`, `--radius-pill`, `--color-primary`
- Acceptance:
  - Balance readable at 320px width
  - Avatar tap target >= 44x44

2. DealerHand
- Purpose: Render dealer cards (one hidden), dealer label, optional dealer total during reveal.
- Props:
  - `cards: Card[]` (card: {rank, suit, faceUp: boolean})
  - `showTotal?: boolean`
  - `total?: number`
- Stories:
  - `Dealer/Initial` (one up, one hidden)
  - `Dealer/Reveal` (both up, show total)
  - `Dealer/MultiDraw` (dealer drawing sequence)
- Acceptance:
  - Hidden card uses branded back art
  - Reveal animates flip using `--motion-card-deal`

3. BeastFocusPanel
- Purpose: Center portrait, aura, passive badge.
- Props:
  - `speciesId?: string`
  - `portraitUrl?: string`
  - `passive?: { name: string, modifier?: string }`
  - `isActive?: boolean`
- Stories:
  - `Beast/Default` (portrait + passive)
  - `Beast/NoPortrait` (placeholder)
  - `Beast/ActivePulse` (aura pulsing)
- Tokens: `--shadow-beast-ambient`, `--color-primary-glow`, `--motion-beast-idle`
- Acceptance:
  - Portrait aligns vertically between dealer and player cards
  - Passive badge visually attached and accessible (aria-describedby)

4. PlayerHand (container)
- Purpose: Render one or more player hands, active hand focus, hand totals.
- Props:
  - `hands: Hand[]` (Hand: {cards: Card[], total: number, isActive: boolean, isBusted: boolean, isBlackjack: boolean})
  - `activeHandIndex: number`
  - `onSelectHand?: (index:number)=>void`
- Stories:
  - `PlayerHand/Single` (one hand, total 18)
  - `PlayerHand/SplitTwo` (two hands, active first)
  - `PlayerHand/Busted` (bust state)
- Acceptance:
  - Active hand visually elevated, badge attached
  - When multiple hands, allow clear switch affordance

5. Card (atomic)
- Purpose: Visual playing card component (face/back), used by DealerHand and PlayerHand.
- Props:
  - `rank: string` (A,2..10,J,Q,K)
  - `suit: 'hearts'|'diamonds'|'clubs'|'spades'`
  - `faceUp?: boolean`
  - `size?: 'player'|'dealer'|'thumbnail'`
- Stories:
  - `Card/Face_A_Hearts` (example)
  - `Card/Back` (card back with paw)
  - `Card/ResponsiveSizes`
- Tokens: `--radius-lg`, `--shadow-beast-ambient`
- Acceptance:
  - Typography legible at target size
  - Face-down card uses `card_back.svg` and proper glow

6. HandTotalBadge
- Purpose: Floating badge showing current hand total.
- Props:
  - `total: number`
  - `status?: 'normal'|'bust'|'blackjack'|'win'|'push'`
  - `position?: 'center'|'attachedLeft'|'attachedRight'`
- Stories:
  - `Badge/Normal` `Badge/Bust` `Badge/Blackjack`
- Tokens: `--color-primary`, `--shadow-hand-badge`
- Acceptance:
  - Updates instantly when card added
  - Color/state transitions animate per `--motion-micro`

7. BetXpSummary
- Purpose: Row showing CURRENT BET and POTENTIAL XP with icons and small captions.
- Props:
  - `betAmount: number`
  - `xpAmount: number`
  - `onEditBet?: ()=>void`
- Stories:
  - `Summary/Default`
  - `Summary/Doubled` (shows doubled values)
- Acceptance:
  - Values use tokens for color (bet=primary, xp=tertiary)
  - Responsive: labels not truncated on 320px

8. ActionButton (atomic)
- Purpose: Button shell used in action row; contains icon + label.
- Props:
  - `icon: ReactNode` or `iconName: string`
  - `label: string`
  - `variant?: 'primary'|'secondary'|'ghost'`
  - `disabled?: boolean`
  - `onClick?: ()=>void`
- Stories:
  - `Action/Hit` `Action/Stand` `Action/Double` `Action/Split` each with enabled/disabled states
- Tokens: `--radius-lg`, `--color-surface-container-high`, `--color-primary`
- Acceptance:
  - Tap target >= 44px
  - Press animation (scale 0.98) and aria-disabled when disabled

9. BlackjackActionRow (composed)
- Purpose: Layout of four action buttons; handles enabling/disabling based on game state.
- Props:
  - `actions: {name: string, enabled: boolean}[]`
  - `onAction: (name:string)=>void`
- Stories:
  - `ActionRow/AllEnabled` `ActionRow/SplitDisabled` `ActionRow/PostSplit` (contextual)
- Acceptance:
  - Buttons distribute evenly and maintain spacing tokens
  - Disabled actions visually obvious

10. CurrencyPill
- Purpose: Wallet/balance display component.
- Props:
  - `amount: number`
  - `currency: string`
- Stories: `Currency/Default` `Currency/LargeAmount`

11. PassiveBadge
- Purpose: Small pill showing active beast passive and modifier.
- Props:
  - `label: string`
  - `modifier?: string`
  - `icon?: string`
- Stories: `Passive/Active` `Passive/NoModifier`

12. BottomNav
- Purpose: App bottom navigation.
- Props:
  - `items: {key:string,label:string,icon:string,active:boolean}[]`
  - `onSelect: (key:string)=>void`
- Stories:
  - `Nav/GamesActive` `Nav/OtherActive`

13. AssetLoader (utility)
- Purpose: Resolve asset paths for beasts, cards, and icons with fallbacks.
- API:
  - `getPortrait(speciesId, size='square') => url`
  - `getCardFace(rank, suit, size='player') => url`
- Stories: Documented as utility usage in Storybook MDX

14. Modal / Overlay components
- Purpose: Result overlays (YOU WIN, BUST), confirmation dialogs.
- Props:
  - `title`, `message`, `actions[]`
- Stories: `Modal/Win` `Modal/Lose` `Modal/Push`

Storybook and Testing notes

- For each component story, add controls for tokens (toggle reduced motion, change theme token values) and ARIA inspector.
- Tag stories with `qa` or `visual-regression` for automated visual tests.

Implementation priorities (iteration order)

1. Atomic components: `Card`, `ActionButton`, `CurrencyPill`, `HandTotalBadge`.
2. Composite components: `DealerHand`, `PlayerHand`, `BeastFocusPanel`, `BetXpSummary`.
3. Page-level composition: `BlackjackHeader`, `BlackjackActionRow`, `BottomNav`.

Example Storybook story title map

- `Header/Default`
- `Dealer/Initial` `Dealer/Reveal`
- `Beast/Default` `Beast/ActivePulse`
- `PlayerHand/Single` `PlayerHand/SplitTwo`
- `Card/Face_A_Hearts` `Card/Back`
- `Action/Hit` `Action/Stand` `Action/Double` `Action/Split`

Acceptance criteria

- Each component has at least one Storybook story and automated visual snapshot.
- Components are implemented using tokens and responsive rules.
- Accessibility: keyboard focus, aria labels, contrast checks pass.

Next steps

- I can scaffold Storybook story files (TSX) for the atomic components next, or generate a JSON manifest of component props for a developer to import. Tell me which.
