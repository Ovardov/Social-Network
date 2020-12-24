// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components

// Hooks

// Services

// Utils

// Styles
import styles from './index.module.scss'

const Icon = ({ Component, size, hasHoverEffect, isSelected }) => {
  return (
    <span
      className={`${styles['icon-container']} ${
        hasHoverEffect ? styles['with-hover-effect'] : ''
      }`}
    >
      <Component
        className={`${styles.icon} ${styles[`size-${size}`]} ${
          isSelected ? styles.selected : ''
        }`}
        {...(size === 'sm' ? { shapeRendering: 'crispEdges' } : '')}
      />
    </span>
  )
}

Icon.proptypes = {
  Component: PropTypes.elementType.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
  hasHoverEffect: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
}

export default Icon
