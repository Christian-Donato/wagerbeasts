import React, {useState} from 'react'
import ActionButton from '../ActionButton/ActionButton'

export default function EditProfileForm({ initial, onSave, onCancel }:{ initial?:{displayName?:string,bio?:string}, onSave?:(data:any)=>void, onCancel?:()=>void }){
  const [displayName,setDisplayName] = useState(initial?.displayName||'')
  const [bio,setBio] = useState(initial?.bio||'')
  const [avatar,setAvatar] = useState<File|null>(null)

  return (
    <form style={{display:'flex',flexDirection:'column',gap:12,padding:12,background:'var(--color-surface)',borderRadius:12}} onSubmit={(e)=>{e.preventDefault(); onSave && onSave({displayName,bio,avatar})}}>
      <label>Avatar</label>
      <input type="file" accept="image/*" onChange={e=>setAvatar(e.target.files?.[0]||null)} />

      <label>Display name</label>
      <input value={displayName} onChange={e=>setDisplayName(e.target.value)} style={{padding:8,borderRadius:8}} />

      <label>Bio</label>
      <textarea value={bio} onChange={e=>setBio(e.target.value)} style={{padding:8,borderRadius:8}} rows={4} />

      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <ActionButton label="Cancel" variant="ghost" onClick={onCancel} />
        <ActionButton label="Save" variant="primary" onClick={()=>onSave && onSave({displayName,bio,avatar})} />
      </div>
    </form>
  )
}
