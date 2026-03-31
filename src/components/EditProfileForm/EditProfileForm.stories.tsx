import React from 'react'
import { Meta } from '@storybook/react'
import EditProfileForm from './EditProfileForm'

export default {
  title: 'Profile/EditProfileForm',
  component: EditProfileForm,
} as Meta

export const Default = () => (
  <div style={{width:360}}>
    <EditProfileForm initial={{displayName:'You',bio:'I love beasts'}} onSave={(d)=>alert(JSON.stringify(d))} onCancel={()=>alert('cancel')} />
  </div>
)

export const Empty = () => (
  <div style={{width:360}}>
    <EditProfileForm onSave={(d)=>console.log(d)} />
  </div>
)
