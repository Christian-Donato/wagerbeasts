import React from 'react'

export interface ProfileHeaderProps {
  displayName: string
  handle?: string
  avatarUrl?: string
  country?: string
  isMe?: boolean
  onEdit?: () => void
}

export default function ProfileHeader({ displayName, handle, avatarUrl, country, isMe=false, onEdit }: ProfileHeaderProps) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:12,background:'var(--color-surface)',borderRadius:12}}>
      <img src={avatarUrl || '/assets/avatars/avatar_placeholder.svg'} alt={displayName} style={{width:72,height:72,borderRadius:18,objectFit:'cover'}} />
      <div style={{flex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{fontSize:18,fontWeight:800}}>{displayName}</div>
          {country && <img src={`/assets/flags/${country}.svg`} alt={country} style={{width:20,height:14}} />}
        </div>
        {handle && <div style={{fontSize:13,color:'var(--color-on-surface-muted)'}}>@{handle}</div>}
        <div style={{marginTop:8,display:'flex',gap:8,alignItems:'center'}}>
          <div style={{background:'var(--color-surface-variant)',padding:'6px 8px',borderRadius:10}}>Rank • 42</div>
          <div style={{background:'var(--color-surface-variant)',padding:'6px 8px',borderRadius:10}}>Win-rate • 58%</div>
        </div>
      </div>
      <div>
        {isMe ? <button onClick={onEdit} style={{padding:'8px 12px',borderRadius:10,border:'none',background:'var(--color-primary)',color:'var(--color-on-primary)'}}>Edit</button> : <button style={{padding:'8px 12px',borderRadius:10}}>Follow</button>}
      </div>
    </div>
  )
}
