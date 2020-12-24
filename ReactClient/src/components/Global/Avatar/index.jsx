// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import styles from './index.module.scss'

const Avatar = ({ size, imageSrc, imageAlt }) => {
  return <img className={`${styles.avatar} ${styles[`size-${size}`]}`} src={imageSrc} alt={imageAlt} />
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
}

export default Avatar
