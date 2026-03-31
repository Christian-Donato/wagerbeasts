import React from 'react'
import { Meta } from '@storybook/react'
import ProductDetailModal from './ProductDetailModal'

export default {
  title: 'Shop/ProductDetailModal',
  component: ProductDetailModal,
} as Meta

const demoItem = {
  id: 'golden-1',
  title: 'Golden Beast Skin',
  price: 499,
  heroUrl: '/assets/shop/golden_hero@2x.png',
  description: 'A premium golden skin for your beast. Shiny and rare.'
}

export const Default = () => <ProductDetailModal item={demoItem} onBuy={(q)=>alert('buy '+q)} onClose={()=>{}} />
export const Owned = () => <ProductDetailModal item={{...demoItem, owned:true}} onClose={()=>{}} />
