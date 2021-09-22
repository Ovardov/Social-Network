// Libraries
import React, { FC, HTMLProps } from 'react';
import { Field, FieldProps } from 'formik';
// Styles
import styles from './index.module.scss';

const TextAreaField: FC<FieldProps & HTMLProps<HTMLTextAreaElement>> = ({ field, placeholder, cols, rows, }) => {
  return (
    <div className={styles.container}>
      <Field
        className={styles.textarea}
        component='textarea'
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        {...field}
      />
    </div>
  );
};

export default TextAreaField;
