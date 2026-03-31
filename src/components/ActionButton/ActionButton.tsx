import React from 'react'

export interface ActionButtonProps {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}

export default function ActionButton({ label, onClick, variant='primary', disabled }: ActionButtonProps) {
  const bg = variant === 'primary' ? 'var(--color-primary)' : variant === 'secondary' ? 'var(--color-surface-2)' : 'transparent'
  const color = variant === 'primary' ? 'var(--color-on-primary)' : 'var(--color-on-surface)'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        color,
        borderRadius: 'var(--radius-lg)',
        padding: '10px 16px',
        minWidth: 80,
        border: 'none',
        boxShadow: 'var(--shadow-button)'
      }}
      aria-disabled={disabled}
    >
      {label}
    </button>
  )
}
