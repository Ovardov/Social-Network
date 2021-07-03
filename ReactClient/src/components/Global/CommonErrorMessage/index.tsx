// Libraries
import React, { FC } from 'react';
// Styles
import styles from './index.module.scss';

interface Props {
  errorMessage: string;
}
const CommonErrorMessage: FC<Props> = ({ errorMessage, }) => {
  return <span className={styles.error}>{errorMessage}</span>;
};

export default CommonErrorMessage;
