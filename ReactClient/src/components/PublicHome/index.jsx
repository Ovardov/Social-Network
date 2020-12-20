// Libraries
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
// Images
import HomePageImage from '../../../public/images/home-page.svg'
// Styles
import styles from './index.module.scss'

const PublicHome = ({ children }) => {
  const history = useHistory()
  const { pathname } = history.location

  return (
    <section className={styles.container}>
      <article className={styles.info}>
        <div className={styles['image-container']}>
          <HomePageImage className={styles.image}/>
        </div>
      </article>

      <article className={styles.data}>
        <ul className={styles.links}>
          <li>
            <Link
              to="/login"
              className={`${styles.link} ${
                pathname === '/login' ? styles.selected : ''
              }`}
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`${styles.link} ${
                pathname === '/register' ? styles.selected : ''
              }`}
            >
              Sign up
            </Link>
          </li>
        </ul>

        {children}
      </article>
    </section>
  )
}

export default PublicHome
