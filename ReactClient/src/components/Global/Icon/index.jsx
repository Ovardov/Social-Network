// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components

// Hooks

// Services

// Utils

// Styles
import styles from './index.module.scss'

const Icon = ({ Component, hasHoverEffect, isSelected }) => {
  return (
    <span className={`${styles['icon-container']} ${hasHoverEffect ? styles['with-hover-effect'] : ''}`}>
      <Component className={`${styles.icon} ${isSelected ? styles.selected : ''}`} />
    </span>
  )
}

Icon.proptypes = {
  Component: PropTypes.elementType.isRequired,
  hasHoverEffect: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool
}

export default Icon
