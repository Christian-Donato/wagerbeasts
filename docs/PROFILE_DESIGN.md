# Profile Design & Implementation Plan

Purpose

Defines the player profile experience: public-facing profile, personal stats, achievement timeline, social links (friends/followers), and settings quick-access. The Profile ties into Leaderboard, MyBeasts, and Shop meta (owned skins, badges).

Goals

- Present player identity and accomplishments clearly on mobile.
- Provide easy access to edit display name, avatar, bio, and privacy controls.
- Surface recent activity (wins, purchases, level-ups) and showcase equipped beast/skin.

Primary Screens & Flows

1) Public Profile (others view)
- Header: avatar, display name, handle, country flag, follow button.
- Top stats row: rank (if public), win-rate, total XP, badges.
- Tabs: Overview (feed), Beasts (links to owned beasts), Achievements, Activity.

2) My Profile / Edit
- Editable fields: avatar (upload), display name, bio, social handles, privacy toggles (profile visibility, show activity).
- Settings quick-actions: change avatar, link wallet, view purchase history.

3) Activity Feed
- Chronological feed of major events: wins, leaderboard entries, purchases, level-ups, with timestamp and context link.

Component Mapping

- Atomic: `AvatarUploader`, `StatChip`, `BadgePill`, `ActionButton`.
- Composite: `ProfileHeader`, `ProfileStatsRow`, `ProfileTabs`, `ActivityItem`, `EditProfileForm`.
- Page: `ProfileScreen` (public view) and `MyProfileScreen` (editable view).

Data Model

- PublicProfile {
  userId: string
  displayName: string
  handle?: string
  avatarUrl?: string
  country?: string
  stats: { rank?: number, winRate?: number, totalXp?: number }
  badges?: { id:string, title:string, iconUrl?:string }[]
  isFollowing?: boolean
}

- PrivateProfile extends PublicProfile {
  email?: string
  bio?: string
  settings?: { showActivity:boolean, showBadges:boolean }
}

API Endpoints (suggested)

- GET `/api/profile/:userId` — public profile
- GET `/api/profile/me` — private profile (auth)
- PATCH `/api/profile/me` — update editable fields (displayName, bio, avatar)
- GET `/api/profile/:userId/activity?page=` — activity feed
- POST `/api/profile/:userId/follow` — follow/unfollow

Privacy & Moderation

- Allow users to set profile visibility: Public, Friends-only, Private.
- Moderation flags for displayed content; hide or redact activity items when necessary.

Assets

- Avatar placeholder, badge icons, activity icons (win, purchase, level-up), `assets/profile/` folder with `@2x` variants.

Storybook Stories (minimum)

- `Profile/ProfileHeader/Default`
- `Profile/ProfileStatsRow/WithRank`
- `Profile/EditProfileForm/Default`

Telemetry & Events

- `profile_view` {viewerId?, profileId}
- `profile_edit` {fieldsChanged}
- `profile_follow` {fromUserId,toUserId,action}

Testing

- Visual snapshots for `ProfileHeader` and `ActivityItem`.
- E2E: edit profile, upload avatar (mock), change privacy setting, follow/unfollow.

Acceptance Criteria

- Public profile displays correct basic info and badges.
- Editing updates server via `PATCH /api/profile/me` and UI reflects changes.
- Privacy settings hide activity from unauthorized viewers.

Implementation Notes

- Use existing `Avatar` and `Badge` components where possible.
- Image uploads should use a resumable upload endpoint and return CDN URL for avatar.

Delivery Estimate (rough)

- Docs + Storybook stubs: 0.5 day
- Edit flow + upload handling: 1–2 days

Next steps

- I can scaffold `ProfileHeader` and `EditProfileForm` Storybook stubs next, or produce JSON API request/response examples for profile endpoints. Which should I do? 
