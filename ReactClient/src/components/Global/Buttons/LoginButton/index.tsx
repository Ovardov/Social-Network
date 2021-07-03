// Libraries
import React, { FC } from 'react';
// Components
import Loader from '../../Loader';
// Images
import ArrowIcon from '../../../../../public/images/arrow-right.svg';
// Styles
import globalButtonStyles from '../buttons.module.scss';
import styles from './index.module.scss';

interface Props {
  disabled?: boolean,
  isLoading?: boolean
}

const LoginButton: FC<Props> = ({ disabled, isLoading, }) => {
  return (
    <button
      disabled={disabled}
      type='submit'
      className={`${globalButtonStyles.button} ${globalButtonStyles['color-primary']} ${styles['login-button']}`}
    >
      {isLoading && <Loader type='local' color='background' />}

      <span className={isLoading ? globalButtonStyles['hidden-text'] : ''}>
        Login
        <ArrowIcon className={styles.icon} />
      </span>
    </button>
  );
};

export default LoginButton;
