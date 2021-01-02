// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components

// Hooks

// Services

// Utils

// Styles
import styles from './index.module.scss'

const Icon = ({ Component, size, color, hasHoverEffect, isSelected }) => {
  return (
    <span
      className={`${styles['icon-container']} ${
        hasHoverEffect ? styles['with-hover-effect'] : ''
      }`}
    >
      <Component
        className={`${styles.icon} ${styles[`size-${size}`]} ${
          styles[`color-${color}`]
        } ${isSelected ? styles.selected : ''}`}
        {...(size === 'xs' ? { shapeRendering: 'crispEdges' } : '')}
      />
    </span>
  )
}

Icon.proptypes = {
  Component: PropTypes.elementType.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'text',
    'background',
    'like',
    'comment',
  ]).isRequired,
  hasHoverEffect: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
}

export default Icon
