import React from 'react'
import ActionButton from '../ActionButton/ActionButton'
import CurrencyPill from '../CurrencyPill/CurrencyPill'

export interface ShopItemDetail {
  id: string
  title: string
  price: number
  heroUrl?: string
  description?: string
  owned?: boolean
}

export interface ProductDetailModalProps {
  item: ShopItemDetail
  onClose?: () => void
  onBuy?: (qty?: number) => void
}

export default function ProductDetailModal({ item, onClose, onBuy }: ProductDetailModalProps) {
  return (
    <div role="dialog" aria-modal="true" style={{
      width: '92%', maxWidth:420, margin:'24px auto', background:'var(--color-surface)', padding:16, borderRadius:12, boxShadow:'var(--shadow-modal)'
    }}>
      <button onClick={onClose} aria-label="Close" style={{float:'right',border:'none',background:'transparent'}}>✕</button>
      <img src={item.heroUrl} alt={item.title} style={{width:'100%',height:180,objectFit:'cover',borderRadius:8}} />
      <h2 style={{marginTop:12}}>{item.title}</h2>
      <p style={{color:'var(--color-on-surface-muted)'}}>{item.description}</p>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
        <CurrencyPill amount={item.price} />
        <ActionButton label={item.owned ? 'Owned' : 'Buy'} onClick={() => onBuy && onBuy(1)} variant="primary" disabled={item.owned} />
      </div>
    </div>
  )
}
