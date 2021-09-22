// Libraries
import React, { FC, MouseEventHandler, useRef } from 'react';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
// Components
import CloseButton from '../Buttons/CloseButton';
// Styles
import styles from './index.module.scss';

interface Props {
  onClose: () => void
  title?: string
  hasHeader: boolean
  fullWidth?: boolean
}

const Modal: FC<Props> = ({ children, onClose, title, hasHeader, fullWidth, }) => {
  const modalRef = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className={styles.container} {...!hasHeader ? { onClick: handleClick, } : null}>
      <div className={`${styles.modal} ${fullWidth ? styles['full-width'] : ''}`} ref={modalRef}>
        {hasHeader && (
          <header className={styles.header}>
            {title && <p className={styles.title}>{title}</p>}

            <div className={styles['button-container']}>
              <CloseButton
                color={Colors.PRIMARY}
                onClose={onClose}
              />
            </div>
          </header>
        )}

        <div className={hasHeader ? styles.content : ''}>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
