import React from 'react'
import { Meta } from '@storybook/react'
import CurrencyPill from './CurrencyPill'

export default {
  title: 'UI/CurrencyPill',
  component: CurrencyPill,
} as Meta

export const Default = () => <CurrencyPill amount={1234} />
export const Large = () => <CurrencyPill amount={99999} />
