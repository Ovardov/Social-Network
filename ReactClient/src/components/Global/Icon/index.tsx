// Libraries
import React, { FC } from 'react';
import { Sizes } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

export type Icon = {
  Component: typeof React.Component
  alt: string
  size: Sizes
  color: 'primary' | 'secondary' | 'text' | 'background' | 'like' | 'comment',
  hasHoverEffect?: boolean
  isSelected?: boolean
}

const Icon: FC<Icon> = ({ Component, alt, size, color, hasHoverEffect, isSelected, }) => {
  return (
    <span
      className={`${styles['icon-container']} ${hasHoverEffect ? styles['with-hover-effect'] : ''}`}
    >
      <Component
        alt={alt}
        className={`${styles.icon} ${styles[`size-${size}`]} ${styles[`color-${color}`]} ${isSelected ? styles.selected : ''}`}
        {...(size === Sizes.XS ? { shapeRendering: 'crispEdges', } : '')}
      />
    </span>
  );
};

export default Icon;