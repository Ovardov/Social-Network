// Libraries
import React, { FC } from 'react';
// Components
import Icon from '../../Icon';
// Utils
import { Sizes } from '../../../../utils/enums';
// Images
import CloseIcon from '../../../../../public/images/close-icon.svg';
// Styles
import styles from './index.module.scss';

interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
  onClose: () => void,
  color: 'primary' | 'secondary' | 'text' | 'background' | 'like' | 'comment'
}

const CloseButton: FC<Props> = ({ position, onClose, color, }) => {
  return (
    <button
      type='button'
      className={`${styles.button} ${styles[`position-${position}`]}`}
      onClick={onClose}
    >
      <Icon
        color={color}
        size={Sizes.MD}
        hasHoverEffect={true}
        Component={CloseIcon}
        alt='Close Icon'
      />
    </button>
  );
};

export default CloseButton;
