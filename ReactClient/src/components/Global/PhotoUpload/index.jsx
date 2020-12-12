// Libraries
import React from 'react'
// Images
import profilePlaceholderImage from '../../../../public/images/profile-placeholder.png'
import addIcon from '../../../../public/images/add-icon.svg'
// Styles
import styles from './index.module.scss'

const PhotoUpload = () => {
  return (
    <div className={styles.container}>
      <span className={styles['edit-container']}>
        <span className={styles.avatar}>
          <img
            loading="lazy"
            src={profilePlaceholderImage}
            alt="Profile placeholder picture"
          />
        </span>

        <span className={styles['edit-icon']}>
          <img className={styles['edit-icon']} src={addIcon} />
        </span>
      </span>

      <p className={styles.message}>
        Only images with a size lower than 3MB are allowed.
      </p>

      <input className={styles.file} type="file" />
    </div>
  )
}

export default PhotoUpload
