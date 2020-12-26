// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import styles from './index.module.scss'

const Loader = ({ type, color }) => {
  return (
    <span className={`${styles.container}  ${styles[`type-${type}`]}`}>
      <span className={`${styles.loader} ${styles[`color-${color}`]}`}></span>
    </span>
  )
}

Loader.propTypes = {
  type: PropTypes.oneOf(['local', 'global']).isRequired,
  color: PropTypes.oneOf(['primary', 'background']).isRequired,
}

export default Loader
