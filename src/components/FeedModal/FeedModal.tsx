import React, {useState} from 'react'
import ActionButton from '../ActionButton/ActionButton'

export default function FeedModal({onClose, onFeed}:{onClose?:()=>void,onFeed?:(qty:number)=>void}){
  const [qty,setQty] = useState(1)
  return (
    <div role="dialog" aria-modal="true" style={{width:'92%',maxWidth:420,margin:'24px auto',background:'var(--color-surface)',padding:16,borderRadius:12}}>
      <h3>Feed Beast</h3>
      <label style={{display:'block',marginTop:8}}>XP Packs</label>
      <input type="number" value={qty} onChange={e=>setQty(Math.max(1,Number(e.target.value)||1))} style={{width:80,marginTop:8}} />
      <div style={{display:'flex',gap:12,marginTop:16,justifyContent:'flex-end'}}>
        <ActionButton label="Cancel" variant="ghost" onClick={onClose} />
        <ActionButton label="Feed" variant="primary" onClick={()=>onFeed && onFeed(qty)} />
      </div>
    </div>
  )
}
