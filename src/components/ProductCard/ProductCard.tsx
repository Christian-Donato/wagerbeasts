import React from 'react'

export interface ProductCardProps {
  title: string
  price: number
  thumbnail?: string
  featured?: boolean
}

export default function ProductCard({ title, price, thumbnail, featured }: ProductCardProps) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-sm)',
      boxShadow: 'var(--shadow-card)'
    }}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <img src={thumbnail} alt={title} style={{width:72,height:72,objectFit:'cover',borderRadius:'8px'}} />
        <div style={{flex:1}}>
          <h3 style={{margin:0,fontSize:'var(--type-body)'}}>{title}</h3>
          <div style={{marginTop:6,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{color:'var(--color-on-surface)'}}>LuckyChips {price}</span>
            {featured && <span style={{background:'var(--color-accent)',color:'white',padding:'4px 8px',borderRadius:12,fontSize:'12px'}}>Featured</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
