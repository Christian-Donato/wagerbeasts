import React from 'react'
import { Meta, Story } from '@storybook/react'
import CapsuleModal from './CapsuleModal'

export default {
  title: 'Components/CapsuleModal',
  component: CapsuleModal,
} as Meta

const Template: Story<any> = (args) => <CapsuleModal {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
  name: 'CYBER-FERAL CAPSULE',
  description: 'Guaranteed Rare or higher. Contains mutated beasts from the Neon Wastes.',
  imageSrc: '/assets/images/capsule-sample.png',
  legendaryChance: 15.4,
  inventoryRemaining: 3,
  onClose: () => {},
  onBreak: () => alert('Break capsule (stub)'),
}
