import React from 'react'

export interface BeastInstance {
  id: string
  speciesName: string
  nickname?: string
  level: number
  xp: number
  portraitUrl?: string
  rarity?: string
}

export default function BeastCard({ instance }: { instance: BeastInstance }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:12,borderRadius:8,background:'var(--color-surface)'}}>
      <img src={instance.portraitUrl} alt={instance.speciesName} style={{width:64,height:64,objectFit:'cover',borderRadius:8}} />
      <div style={{flex:1}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontWeight:700}}>{instance.nickname || instance.speciesName}</div>
            <div style={{fontSize:12,color:'var(--color-on-surface-muted)'}}>Level {instance.level} • {instance.rarity}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontWeight:700}}>{instance.xp}</div>
            <div style={{fontSize:12,color:'var(--color-on-surface-muted)'}}>XP</div>
          </div>
        </div>
      </div>
    </div>
  )
}
