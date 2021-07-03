// Libraries
import React, { FC, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
// Components
import Icon from '../Icon';
// Images
import SearhIcon from '../../../../public/images/search-icon.svg';
import CloseIcon from '../../../../public/images/close-icon.svg';
// Styles
import styles from './index.module.scss';

const SearchBox: FC = () => {
  const fieldRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // If field container exist and is clicked outside of
      if (fieldRef.current !== null && !fieldRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isFocused]);

  return (
    <Formik
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onSubmit={() => {}}
      initialValues={{ search: '', }}
      render={({ resetForm, }) => (
        <Form>
          <p
            ref={fieldRef}
            className={`${styles['field-container']} ${isFocused ? styles.touched : ''}`}
          >
            <Icon
              size='sm'
              Component={SearhIcon}
              alt='Search Icon'
              color={isFocused ? 'primary' : 'text'}
            />

            <Field name='search'>
              {({ field, }: FieldProps) => (
                <input
                  {...field}
                  placeholder='Search'
                  className={styles['input-field']}
                  // Mouse in event
                  onFocus={() => setIsFocused(true)}
                />
              )}
            </Field>

            {isFocused && (
              <span
                className={styles['reset-button']}
                onClick={() => resetForm()}
              >
                <Icon
                  size='sm'
                  Component={CloseIcon}
                  alt='Close Icon'
                  color='primary'
                />
              </span>
            )}
          </p>
        </Form>
      )}
    />
  );
};

export default SearchBox;
