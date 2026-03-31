import React from 'react'
import { Meta } from '@storybook/react'
import LeaderboardRow from './LeaderboardRow'

export default {
  title: 'Leaderboard/LeaderboardRow',
  component: LeaderboardRow,
} as Meta

const entries = [
  { rank: 1, displayName: 'AcePlayer', score: 12400, avatarUrl: '/assets/avatars/ace@2x.png' },
  { rank: 2, displayName: 'Chill', score: 12000, avatarUrl: '/assets/avatars/chill@2x.png' },
  { rank: 5, displayName: 'You', score: 8900, avatarUrl: '/assets/avatars/you@2x.png', isCurrentUser: true }
]

export const Default = () => (
  <div style={{width:360}}>
    {entries.map(e => <div key={e.rank} style={{marginBottom:8}}><LeaderboardRow entry={e as any} /></div>)}
  </div>
)

export const HighlightCurrent = () => (
  <div style={{width:360}}>
    <LeaderboardRow entry={entries[2] as any} />
  </div>
)
