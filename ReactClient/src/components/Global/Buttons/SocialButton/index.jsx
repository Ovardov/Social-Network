// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import globalButtonStyles from '../buttons.module.scss'
import styles from './index.module.scss'

const SocialButton = ({ iconSrc, iconAlt, text, href }) => {
  return (
    <a href={href} className={`${globalButtonStyles.button} ${styles['social-button']}`}>
      <img loading="lazy" className={styles.icon} src={iconSrc} alt={iconAlt} />
      {text}
    </a>
  )
}

SocialButton.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default SocialButton
