// Libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// Components
import Loader from '../../Loader'
// Styles
import globalButtonStyles from '../buttons.module.scss'
import styles from './index.module.scss'

const SocialButton = ({
  iconSrc,
  iconAlt,
  text,
  href,
  disabled,
  setIsDisabled,
}) => {
  const [isLocalLoading, setIsLocalLoading] = useState(false)

  const handleOnClick = () => {
    setIsLocalLoading(true)
    setIsDisabled(true)
  }

  return (
    <a
      className={`${globalButtonStyles.button} ${styles['social-button']} ${
        disabled ? styles.disabled : ''
      }`}
      href={href}
      onClick={handleOnClick}
    >
      {isLocalLoading && <Loader type="local" color="primary" />}

      <span
        className={`${styles.content} ${
          isLocalLoading ? globalButtonStyles['hidden-text'] : ''
        }`}
      >
        <img
          loading="lazy"
          className={styles.icon}
          src={iconSrc}
          alt={iconAlt}
        />
        {text}
      </span>
    </a>
  )
}

SocialButton.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default SocialButton
