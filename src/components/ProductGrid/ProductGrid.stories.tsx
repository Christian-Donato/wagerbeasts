import React from 'react'
import { Meta } from '@storybook/react'
import ProductGrid from './ProductGrid'

export default {
  title: 'Shop/ProductGrid',
  component: ProductGrid,
} as Meta

const demoItems = Array.from({length:6}).map((_,i)=>({
  id:`item-${i}`,
  title:`Demo Item ${i+1}`,
  price: (i+1)*50,
  thumbnail:`/assets/shop/demo_${i+1}@2x.png`,
  featured: i===1
}))

export const TwoColMobile = () => <ProductGrid items={demoItems} columns={2} />
export const FourColDesktop = () => <div style={{width:1024}}><ProductGrid items={demoItems} columns={4} /></div>
