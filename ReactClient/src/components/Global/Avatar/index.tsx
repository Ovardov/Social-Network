// Libraries
import React, { FC } from 'react'
// Images
import defaultProfilePicture from '../../../../public/images/profile-placeholder.png'
// Models
import { Size } from '../../../utils/models'
// Styles
import styles from './index.module.scss'

interface Props {
  size: Size,
  imageSrc: string,
  imageAlt: string
}

const Avatar: FC<Props> = ({ size, imageSrc, imageAlt }) => {
  return (
    <img
      className={`${styles.avatar} ${styles[`size-${size}`]}`}
      // If user do not have profile picture we showed default
      src={imageSrc ? imageSrc : defaultProfilePicture}
      alt={imageAlt}
    />
  )
}

export default Avatar
