// Libraries
import React, { FC } from 'react'
// Images
import CloseIcon from '../../../../public/images/close-icon.svg'
// Styles
import styles from './index.module.scss'

export type Image = {
  aspectRatio: '16-9' | '4-3' | '1-1',
  imageSrc: string,
  imageAlt: string,
  removeImageHandler?: () => void,
}

const Image: FC<Image> = ({ aspectRatio, imageSrc, imageAlt, removeImageHandler }) => {
  const aspectRatioClassName = aspectRatio
    ? `aspect-ratio-${aspectRatio}`
    : 'aspect-ratio-16-9'

  return (
    <div
      className={`${styles['image-container']} ${styles[aspectRatioClassName]}`}
    >
      {removeImageHandler && (
        <button
          className={styles['remove-button']}
          onClick={removeImageHandler}
        >
          <CloseIcon />
        </button>
      )}

      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    </div>
  )
}

export default Image
