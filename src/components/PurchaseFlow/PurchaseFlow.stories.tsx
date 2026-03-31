import React from 'react'
import { Meta } from '@storybook/react'
import PurchaseFlow from './PurchaseFlow'

export default {
  title: 'Shop/PurchaseFlow',
  component: PurchaseFlow,
} as Meta

export const Default = () => <PurchaseFlow itemId="golden-1" price={499} onPurchase={(r)=>console.log(r)} />
export const Processing = () => <div style={{opacity:0.6}}><PurchaseFlow itemId="golden-1" price={499} /></div>
