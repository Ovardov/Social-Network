// Libraries
import React, { FC } from 'react';
// Utils
import { Colors } from '../../../utils/enums';
// Components
import CloseButton from '../Buttons/CloseButton';
// Styles
import styles from './index.module.scss';

interface Props {
  onClose: () => void
  title: string
}

const Modal: FC<Props> = ({ children, onClose, title, }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <header className={styles.header}>
          {title && <p className={styles.title}>{title}</p>}

          <div className={styles['button-container']}>
            <CloseButton
              color={Colors.PRIMARY}
              onClose={onClose}
            />
          </div>
        </header>

        <div className={styles.content}>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
