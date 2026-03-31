import React from 'react'
import { Meta } from '@storybook/react'
import ProfileHeader from './ProfileHeader'

export default {
  title: 'Profile/ProfileHeader',
  component: ProfileHeader,
} as Meta

export const Public = () => (
  <div style={{width:360}}>
    <ProfileHeader displayName="ChillMaster" handle="chill" avatarUrl="/assets/avatars/chill@2x.png" country="us" />
  </div>
)

export const MyProfile = () => (
  <div style={{width:360}}>
    <ProfileHeader displayName="You" handle="you" avatarUrl="/assets/avatars/you@2x.png" isMe onEdit={() => alert('edit')} />
  </div>
)
