import React from 'react'
import { Meta } from '@storybook/react'
import ActionButton from './ActionButton'

export default {
  title: 'UI/ActionButton',
  component: ActionButton,
} as Meta

export const Primary = () => <ActionButton label="Buy" variant="primary" onClick={() => {}} />
export const Secondary = () => <ActionButton label="Preview" variant="secondary" onClick={() => {}} />
export const Disabled = () => <ActionButton label="Buy" variant="primary" disabled />
