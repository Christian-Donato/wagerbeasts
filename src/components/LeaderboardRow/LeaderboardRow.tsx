import React from 'react'

export interface LeaderboardEntry {
  rank: number
  displayName: string
  avatarUrl?: string
  score: number
  isCurrentUser?: boolean
}

export default function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',background: entry.isCurrentUser ? 'var(--color-surface-highlight)' : 'var(--color-surface)',borderRadius:8}}>
      <div style={{width:36,flexShrink:0,fontWeight:700}}>{entry.rank}</div>
      <img src={entry.avatarUrl || '/assets/avatars/avatar_placeholder.svg'} alt={entry.displayName} style={{width:40,height:40,borderRadius:20,objectFit:'cover'}} />
      <div style={{flex:1}}>
        <div style={{fontWeight:600}}>{entry.displayName}</div>
        <div style={{fontSize:12,color:'var(--color-on-surface-muted)'}}>{entry.score.toLocaleString()} pts</div>
      </div>
      <div style={{minWidth:80,textAlign:'right'}}>
        <button style={{background:'transparent',border:'none',color:'var(--color-primary)'}}>View</button>
      </div>
    </div>
  )
}
