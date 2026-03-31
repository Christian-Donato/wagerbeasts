import React, {useState} from 'react'
import ActionButton from '../ActionButton/ActionButton'
import CurrencyPill from '../CurrencyPill/CurrencyPill'

export interface PurchaseFlowProps {
  itemId: string
  price: number
  onPurchase?: (result:{success:boolean,transactionId?:string})=>void
}

export default function PurchaseFlow({ itemId, price, onPurchase }: PurchaseFlowProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null|{success:boolean, transactionId?:string}>(null)

  const doPurchase = async () => {
    setLoading(true)
    // placeholder: simulate network
    await new Promise(r=>setTimeout(r,800))
    const res = { success: true, transactionId: 'tx_'+Date.now() }
    setResult(res)
    setLoading(false)
    onPurchase && onPurchase(res)
  }

  if (result) {
    return (
      <div style={{padding:16,background:'var(--color-surface)',borderRadius:12}}>
        <h3>{result.success ? 'Purchase Complete' : 'Purchase Failed'}</h3>
        {result.transactionId && <div>Transaction: {result.transactionId}</div>}
      </div>
    )
  }

  return (
    <div style={{display:'flex',gap:12,alignItems:'center'}}>
      <CurrencyPill amount={price} />
      <ActionButton label={loading ? 'Processing...' : 'Buy'} onClick={doPurchase} disabled={loading} />
    </div>
  )
}
