// Libraries
import React, { FC } from 'react';
import { Colors, Sizes } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

export type Icon = {
  Component: typeof React.Component
  alt: string
  size: Sizes
  color: Colors
  hasHoverEffect?: boolean
  isSelected?: boolean
  onClickHandler?: () => void
}

const Icon: FC<Icon> = ({ Component, alt, size, color, hasHoverEffect, isSelected, onClickHandler, }) => {
  return (
    <span
      onClick={onClickHandler}
      className={`${styles['icon-container']} ${hasHoverEffect ? styles['with-hover-effect'] : ''} ${onClickHandler ? styles.clickable : ''}`}
    >
      <Component
        alt={alt}
        className={`${styles.icon} ${styles[`size-${size}`]} ${styles[`color-${color}`]} ${isSelected ? styles.selected : ''}`}
        // {...(size === Sizes.XS ? { shapeRendering: 'crispEdges', } : '')}
      />
    </span>
  );
};

export default Icon;
