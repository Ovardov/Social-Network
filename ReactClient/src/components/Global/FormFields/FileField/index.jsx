// Libraries
import React from 'react'
import { useFormikContext } from 'formik'
// Components
import Icon from '../../Icon'
import CommonErrorMessage from '../../CommonErrorMessage'
// Images
import InsertPhotoIcon from '../../../../../public/images/insert-photo-icon.svg'
// Styles
import styles from './index.module.scss'

const FileField = ({ form, field }) => {
  const { setFieldTouched, setFieldValue } = useFormikContext()
  const errorMessage = form.errors[field.name]

  return (
    <div className={styles.container}>
      <div className={styles.file}>
        <label
          className={styles.label}
          htmlFor={field.name}
          onClick={() => setFieldTouched(field.name, true)}
        >
          <Icon
            Component={InsertPhotoIcon}
            size="sm"
            hasHoverEffect={true}
            isSelected={true}
          />
        </label>

        {/* Value prop can't be set because, we are set manually value with function setFieldValue */}
        <input
          id={field.name}
          name={field.name}
          type="file"
          onChange={(e) => setFieldValue(field.name, e.currentTarget.files[0])}
          className={styles.input}
          // Needed if want to upload same file
          onClick={(e) => (e.currentTarget.value = null)}
        />
      </div>

      {errorMessage && <CommonErrorMessage errorMessage={errorMessage} />}
    </div>
  )
}

export default FileField
