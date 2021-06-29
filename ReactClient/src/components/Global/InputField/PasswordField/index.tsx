// Libraries
import React, { FC, useState, HTMLProps } from 'react'
import { Link } from 'react-router-dom'
import { Field, FieldProps } from 'formik'
// Components
import CommonErrorMessage from '../../CommonErrorMessage'
// Images
import VisibilityIcon from '../../../../../public/images/visibility.svg'
import VisibilityOffIcon from '../../../../../public/images/visibility-off.svg'
// Styles
import styles from '../input-field.module.scss'

interface Props {
  showForgotPasswordLink: boolean
}

const PasswordField: FC<Props & HTMLProps<HTMLInputElement> & FieldProps> = ({ field, form, label, showForgotPasswordLink }) => {
  const fieldError = form.errors[field.name] as string;

  const [type, setType] = useState('password')

  const onClickImageHandler = () =>
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'))

  return (
    <div className={`${styles.container} ${styles['type-password']}`}>
      <span className={styles['label-container']}>
        <label htmlFor={field.name}>{label}</label>

        {showForgotPasswordLink && (
          <Link
            to="/forgot-password"
            className={styles['forgot-password-link']}
          >
            Forgot password ?
          </Link>
        )}
      </span>

      <span className={styles['input-container']}>
        <Field
          className={`${styles.input} ${fieldError ? styles['error-border'] : ''
            }`}
          type={type}
          placeholder="********"
          autoComplete="on"
          {...field}
        />

        {type === 'password' ? (
          <VisibilityIcon
            onClick={onClickImageHandler}
            className={styles.image}
          />
        ) : (
          <VisibilityOffIcon
            onClick={onClickImageHandler}
            className={styles.image}
          />
        )}
      </span>

      {fieldError && <CommonErrorMessage errorMessage={fieldError} />}
    </div>
  )
}

export default PasswordField
