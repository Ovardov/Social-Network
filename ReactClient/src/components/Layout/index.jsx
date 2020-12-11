// Libraries
import React from 'react'
// Styles
import styles from './index.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.site}>
      <main>{children}</main>
    </div>
  )
}

export default Layout
