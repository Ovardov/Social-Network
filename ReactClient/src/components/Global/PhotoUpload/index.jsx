// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// Images
import profilePlaceholderImage from '../../../../public/images/profile-placeholder.png'
import addIcon from '../../../../public/images/add-icon.svg'
// Styles
import styles from './index.module.scss'

const PhotoUpload = ({ field, form, setFieldValue }) => {
  const [imageUrl, setImageUrl] = useState(null)
  const imageError = form.errors[field.name]

  const handleChangePhoto = (e) => {
    const image = e.currentTarget.files.length > 0 && e.currentTarget.files[0]

    if (image) {
      // Set image in preview mode
      const newImageUrl = URL.createObjectURL(image)
      setImageUrl(newImageUrl)

      // Update form field value
      setFieldValue(field.name, image)
    }
  }

  return (
    <div
      className={`${styles.container} ${
        imageError ? styles['error-container'] : ''
      }`}
    >
      <span className={styles['edit-container']}>
        <span className={styles.avatar}>
          <img
            className={styles.image}
            loading="lazy"
            src={imageUrl ? imageUrl : profilePlaceholderImage}
            alt={
              imageUrl ? 'Your profile picture' : 'Profile picture placeholder'
            }
          />
        </span>

        <span className={styles['edit-icon']}>
          <img className={styles['edit-icon']} src={addIcon} />
        </span>
      </span>

      <p className={styles.message}>
        {imageError ? imageError : 'Only images with a size lower than 3MB are allowed'}.
      </p>

      <input
        name={field.name}
        className={styles.file}
        type="file"
        onChange={handleChangePhoto}
      />
    </div>
  )
}

PhotoUpload.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
}

export default PhotoUpload
