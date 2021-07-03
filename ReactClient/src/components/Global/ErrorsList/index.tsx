// Libraries
import React, { FC } from 'react';
// Images
import ErrorIcon from '../../../../public/images/error-icon.svg';
// Styles
import styles from './index.module.scss';

type Error = {
  code?: number
  msg: string
}

interface Props {
  errors: Error[]
}

const renderErrors = (errors: Error[]) => {
  return errors.map(({ msg, }, index) => (
    <li key={msg + index} className={styles.error}>
      <ErrorIcon className={styles['error-icon']} />
      {msg}
    </li>
  ));
};

const ErrorsList: FC<Props> = ({ errors, }) => {
  return (
    errors.length > 0 && (
      <ul className={styles.container}>{renderErrors(errors)}</ul>
    )
  );
};

export default ErrorsList;
