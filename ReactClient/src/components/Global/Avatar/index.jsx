// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Images
import defaultProfilePicture from '../../../../public/images/profile-placeholder.png'
// Styles
import styles from './index.module.scss'

const Avatar = ({ size, imageSrc, imageAlt }) => {
  return (
    <img
      className={`${styles.avatar} ${styles[`size-${size}`]}`}
      // If user do not have profile picture we showed default
      src={imageSrc ? imageSrc : defaultProfilePicture}
      alt={imageAlt}
    />
  )
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string.isRequired,
}

export default Avatar
