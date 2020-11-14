import { useState } from 'react'
import Link from 'next/link'
import { ErrorMessage, Field } from 'formik'
import styles from '../form-field.module.scss'

const getIcon = (type) => {
  return type === 'password'
    ? '/images/visibility.svg'
    : '/images/visibility-off.svg'
}

const getAlt = (type) => {
  return type === 'password'
    ? 'Visibility On'
    : 'Visibility Off'
}

const FormField = ({ label, name, showForgotPasswordLink }) => {
  const [type, setType] = useState('password')

  const onClickImageHandler = () => setType(prevType => prevType === 'password' ? 'text' : 'password')

  return (
    <p className={`${styles.container} ${styles['type-password']}`}>
      <span className={styles['label-container']}>
        <label htmlFor={name}>{label}</label>
        {showForgotPasswordLink && <Link href="/forgot-password"><a className={styles['forgot-password-link']}>Forgot password ?</a></Link>}
      </span>

      <span className={styles['input-container']}>
        <Field className={styles.input} type={type} name={name} placeholder="********" />

        <img onClick={onClickImageHandler} className={styles.image} src={getIcon(type)} alt={getAlt(type)} />
      </span>

      <ErrorMessage render={message => <span className={styles.error}>{message ? message : ''}</span>} name={name} />
    </p>
  )
}

export default FormField
