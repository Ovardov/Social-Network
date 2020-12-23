// Libraries
import React from 'react'
// Components
import Header from '../Global/Header'
// Styles
import styles from './layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.site} >
      <Header />

      <main className={styles['site-main']}>{children}</main>
    </div>
  )
}

export default Layout
