// Libraries
import React from 'react'
import { Field } from 'formik'
import PropTypes from 'prop-types'
// Styles
import styles from './index.module.scss'

const TextAreaField = ({ field, placeholder, cols, rows }) => {
  return (
    <div className={styles.container}>
      <Field
        className={styles.textarea}
        component="textarea"
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        {...field}
      />
    </div>
  )
}

TextAreaField.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default TextAreaField
