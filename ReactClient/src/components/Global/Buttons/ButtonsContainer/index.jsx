// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import styles from './index.module.scss'

const ButtonContainers = ({
  columns,
  widthType,
  position,
  children,
}) => {
  return (
    <div
      className={`${styles.container} ${widthType ? styles[widthType] : ''} ${
        position ? styles[position] : ''
      }`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  )
}

ButtonContainers.propTypes = {
  columns: PropTypes.number.isRequired,
  widthType: PropTypes.oneOf(['full-width', 'fit-content']).isRequired,
  position: PropTypes.oneOf(['start', 'end']),
}

export default ButtonContainers
