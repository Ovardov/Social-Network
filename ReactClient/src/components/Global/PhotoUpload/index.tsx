// Libraries
import React, { useState, FC, FormEvent } from 'react'
import { FieldProps } from 'formik'
// Images
import profilePlaceholderImage from '../../../../public/images/profile-placeholder.png'
import AddIcon from '../../../../public/images/add-icon.svg'
// Styles
import styles from './index.module.scss'

interface Props extends FieldProps {
  setFieldValue: (fieldName: string, image: File) => void
}

const PhotoUpload: FC<Props> = ({ field, form, setFieldValue }) => {
  const [imageUrl, setImageUrl] = useState(field.value ? URL.createObjectURL(field.value) : null)
  const imageError = form.errors[field.name]

  const handleChangePhoto = (e: FormEvent<HTMLInputElement>) => {
    const image: File = e.currentTarget.files.length > 0 && e.currentTarget.files[0]

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
      className={`${styles.container} ${imageError ? styles['error-container'] : ''
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
          <AddIcon />
        </span>
      </span>

      <p className={styles.message}>
        {imageError
          ? imageError
          : 'Only images with a size lower than 3MB are allowed.'}
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

export default PhotoUpload
