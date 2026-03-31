import React from 'react'
import { Meta } from '@storybook/react'
import PodiumRow from './PodiumRow'

export default {
  title: 'Leaderboard/PodiumRow',
  component: PodiumRow,
} as Meta

const places = [
  { rank: 2, displayName: 'Chill', avatarUrl: '/assets/avatars/chill@2x.png', score: 12000 },
  { rank: 1, displayName: 'AcePlayer', avatarUrl: '/assets/avatars/ace@2x.png', score: 12400 },
  { rank: 3, displayName: 'Nova', avatarUrl: '/assets/avatars/nova@2x.png', score: 11700 }
]

export const Default = () => <div style={{width:360}}><PodiumRow places={places} /></div>
