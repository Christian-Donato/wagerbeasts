import React from 'react'
import { Meta } from '@storybook/react'
import ProductCard from './ProductCard'

export default {
  title: 'Shop/ProductCard',
  component: ProductCard,
} as Meta

export const Default = () => (
  <div style={{width:320}}>
    <ProductCard title="Crimson Beast Skin" price={250} thumbnail="/assets/shop/crimson_skin@2x.png" />
  </div>
)

export const Featured = () => (
  <div style={{width:320}}>
    <ProductCard title="Golden Beast" price={999} thumbnail="/assets/shop/golden_beast@2x.png" featured />
  </div>
)
