// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components
import Icon from '../../Icon'
// Images
import CloseIcon from '../../../../../public/images/close-icon.svg'
// Styles
import styles from './index.module.scss'

const CloseButton = ({ position, onClose }) => {
  return (
    <button
      className={`${styles.button} ${styles[`position-${position}`]}`}
      onClick={onClose}
    >
      <Icon
        color="text"
        size="md"
        hasHoverEffect={true}
        Component={CloseIcon}
        on
      />
    </button>
  )
}

CloseButton.propTypes = {
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-right',
    'bottom-left',
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CloseButton
