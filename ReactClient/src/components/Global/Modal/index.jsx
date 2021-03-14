// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components
import CloseButton from '../Buttons/CloseButton'
// Styles
import styles from './index.module.scss'

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        { children }

        <CloseButton position="top-right" onClose={onClose} />
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
}

export default Modal
