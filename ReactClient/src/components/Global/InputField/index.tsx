// Libraries
import React, { FC, HTMLProps } from 'react';
import { Field, FieldProps } from 'formik';
// Components
import CommonErrorMessage from '../CommonErrorMessage';
// Styles
import styles from './input-field.module.scss';

const InputField: FC<FieldProps & HTMLProps<HTMLInputElement>> = ({ type, label, placeholder, field, form, }) => {
  const fieldError = form.errors[field.name] as string;

  return (
    <div className={styles.container}>
      <label htmlFor={field.name}>{label}</label>

      <Field
        className={`${styles.input} ${fieldError ? styles['error-border'] : ''}`}
        type={type}
        name={field.name}
        placeholder={placeholder}
        {...field}
      />

      {fieldError && <CommonErrorMessage errorMessage={fieldError} />}
    </div>
  );
};

export default InputField;
