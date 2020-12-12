// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import globalButtonStyles from '../buttons.module.scss'
import styles from './index.module.scss'

const SocialButton = ({ icon, text, href }) => {
  return (
    <a href={href} className={`${globalButtonStyles.button} ${styles['social-button']}`}>
      <img className={styles.icon} src={icon} />
      {text}
    </a>
  )
}

SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default SocialButton
