import React from 'react'
import { Meta } from '@storybook/react'
import FeedModal from './FeedModal'

export default {
  title: 'MyBeasts/FeedModal',
  component: FeedModal,
} as Meta

export const Default = () => <FeedModal onFeed={(q)=>alert('Fed '+q)} onClose={()=>{}} />
export const Multi = () => <FeedModal onFeed={(q)=>alert('Fed '+q)} />
