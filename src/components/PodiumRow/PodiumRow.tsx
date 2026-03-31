import React from 'react'

export interface PodiumPlace {
  rank: number
  displayName: string
  avatarUrl?: string
  score: number
}

export default function PodiumRow({ places } : { places: PodiumPlace[] }) {
  return (
    <div style={{display:'flex',gap:12,alignItems:'end',justifyContent:'center',padding:12}}>
      {places.map(p => (
        <div key={p.rank} style={{textAlign:'center',width:100}}>
          <div style={{width:80,height:80,margin:'0 auto',borderRadius:40,overflow:'hidden',boxShadow:'var(--shadow-card)'}}>
            <img src={p.avatarUrl || '/assets/avatars/avatar_placeholder.svg'} alt={p.displayName} style={{width:'100%',height:'100%',objectFit:'cover'}} />
          </div>
          <div style={{fontWeight:700,marginTop:8}}>{p.displayName}</div>
          <div style={{fontSize:12,color:'var(--color-on-surface-muted)'}}>#{p.rank} • {p.score}</div>
        </div>
      ))}
    </div>
  )
}
