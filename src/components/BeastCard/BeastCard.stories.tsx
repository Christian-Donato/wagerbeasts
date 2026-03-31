import React from 'react'
import { Meta } from '@storybook/react'
import BeastCard from './BeastCard'

export default {
  title: 'MyBeasts/BeastCard',
  component: BeastCard,
} as Meta

const demo = {
  id: 'beast-1',
  speciesName: 'Frostpaw',
  nickname: 'Chill',
  level: 5,
  xp: 420,
  portraitUrl: '/assets/bestiary/frostpaw@2x.png',
  rarity: 'rare'
}

export const Default = () => <div style={{width:320}}><BeastCard instance={demo} /></div>
export const LowXP = () => <div style={{width:320}}><BeastCard instance={{...demo, xp:12, level:1}} /></div>
