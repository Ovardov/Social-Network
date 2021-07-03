// Libraries
import React, { FC } from 'react';
// Components
import CloseButton from '../Buttons/CloseButton';
// Styles
import styles from './index.module.scss';

interface Props {
  onClose: () => void
}

const Modal: FC<Props> = ({ children, onClose, }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}

        <CloseButton position='top-right' onClose={onClose} />
      </div>
    </div>
  );
};

export default Modal;
