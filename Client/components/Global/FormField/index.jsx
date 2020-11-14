import { ErrorMessage, Field } from 'formik'
import styles from './form-field.module.scss'

const FormField = ({ type, name, label, placeholder }) => {
  return (
    <p className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <Field className={styles.input} type={type} name={name} placeholder={placeholder} />
      <ErrorMessage render={message => <span className={styles.error}>{message ? message : ''}</span>} name={name} />
    </p>
  )
}

export default FormField
