// Libraries
import React, { useState, FC } from 'react';
// Components
import Loader from '../../Loader';
// Styles
import globalButtonStyles from '../buttons.module.scss';
import styles from './index.module.scss';

interface Props {
  iconSrc: string,
  iconAlt: string
  text: string
  href: string
  disabled?: boolean
  setIsDisabled?: React.Dispatch<React.SetStateAction<boolean>>
}

const SocialButton: FC<Props> = ({
  iconSrc,
  iconAlt,
  text,
  href,
  disabled,
  setIsDisabled,
}) => {
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const handleOnClick = () => {
    setIsLocalLoading(true);
    setIsDisabled(true);
  };

  return (
    <a
      className={`${globalButtonStyles.button} ${styles['social-button']} ${disabled ? styles.disabled : ''}`}
      href={href}
      onClick={handleOnClick}
    >
      {isLocalLoading && <Loader type='local' color='primary' />}

      <span
        className={`${styles.content} ${isLocalLoading ? globalButtonStyles['hidden-text'] : ''}`}
      >
        <img
          loading='lazy'
          className={styles.icon}
          src={iconSrc}
          alt={iconAlt}
        />
        {text}
      </span>
    </a>
  );
};

export default SocialButton;
