import React from 'react'
import styles from './CapsuleModal.module.css'

type CapsuleModalProps = {
  open: boolean
  name: string
  description?: string
  imageSrc?: string
  legendaryChance?: number
  inventoryRemaining?: number
  onClose: () => void
  onBreak: () => void
}

const CapsuleModal: React.FC<CapsuleModalProps> = ({
  open,
  name,
  description,
  imageSrc,
  legendaryChance = 0,
  inventoryRemaining = 0,
  onClose,
  onBreak,
}) => {
  if (!open) return null

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <span className={styles.closeX}>×</span>
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>{name}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        <div className={styles.centerArea}>
          <div className={styles.imageWrap}>
            <div className={styles.imageFrame}>
              {imageSrc ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={imageSrc} alt={`${name} image`} className={styles.image} />
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>
            <div className={styles.chanceTag}>{legendaryChance}%</div>
          </div>

          <button className={styles.breakButton} onClick={onBreak} aria-label="Break capsule">
            <span className={styles.breakLabel}>BREAK CAPSULE</span>
          </button>
        </div>

        <div className={styles.footerRow}>
          <div className={styles.inventory}>
            <img src="/assets/icons/box.svg" alt="inventory icon" className={styles.invIcon} />
            <span className={styles.invText}>{inventoryRemaining} remaining</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CapsuleModal
