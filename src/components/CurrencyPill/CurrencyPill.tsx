import React from 'react'

export interface CurrencyPillProps {
  amount: number
  currency?: string
}

export default function CurrencyPill({ amount, currency='LuckyChips' }: CurrencyPillProps) {
  return (
    <div style={{
      background: 'var(--color-surface-variant)',
      padding: '6px 10px',
      borderRadius: '999px',
      display:'inline-flex',
      alignItems:'center',
      gap:8,
      boxShadow:'var(--shadow-pill)'
    }}>
      <img src="/assets/icons/coin.svg" alt="coin" style={{width:16,height:16}}/>
      <span style={{fontWeight:600}}>{amount}</span>
      <small style={{opacity:0.8}}>{currency}</small>
    </div>
  )
}
