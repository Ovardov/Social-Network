// Libraries
import React from 'react'
// Styles
import styles from './site-title.module.scss'

const SiteTitle = () => {
  return (
    <h1 className={styles['site-title']}>
      <Link to="/" className={styles.link}>
        SN
      </Link>
    </h1>
  )
}

export default SiteTitle
