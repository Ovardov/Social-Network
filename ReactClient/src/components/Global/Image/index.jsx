// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Images
import CloseIcon from '../../../../public/images/close-icon.svg'
// Styles
import styles from './index.module.scss'

const Image = ({ aspectRatio, imageSrc, imageAlt, removeImageHandler }) => {
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

Image.propTypes = {
  aspectRatio: PropTypes.oneOf(['16-9', '4-3', '1-1']).isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  removeImageHandler: PropTypes.func,
}

export default Image
