import React from 'react'
import ProductCard from '../ProductCard/ProductCard'

export interface ShopItem {
  id: string
  title: string
  price: number
  thumbnail?: string
  featured?: boolean
}

export interface ProductGridProps {
  items: ShopItem[]
  columns?: number
}

export default function ProductGrid({ items, columns = 2 }: ProductGridProps) {
  const colWidth = `${100 / columns}%`
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:12}}>
      {items.map(item => (
        <div key={item.id} style={{width:colWidth}}>
          <ProductCard title={item.title} price={item.price} thumbnail={item.thumbnail} featured={item.featured} />
        </div>
      ))}
    </div>
  )
}
