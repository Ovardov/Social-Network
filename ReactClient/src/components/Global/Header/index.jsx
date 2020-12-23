// Libraries
import React from 'react'
import { Link } from 'react-router-dom'
// Components

// Hooks

// Services

// Utils

// Images
import HomeIcon from '../../../../public/images/home-icon.svg'

// Styles
import styles from './index.module.scss'

const renderPages = (pages) => {
  return pages.map(({url, name, Icon}) => {
    return (
      <li key={url} className={styles['list-item']}>
        <Link to={url} className={styles.link}>
          <Icon />

          {name}
        </Link>
      </li>
    )
  })
}

const Header = () => {
  const pages = [
    {
      url: '/',
      name: 'Home',
      Icon: HomeIcon
    },
    {
      url: '/profile',
      name: 'Profile',
      Icon: HomeIcon

    },
    {
      url: '/messages',
      name: 'Messages',
      Icon: HomeIcon

    },
  ]

  return (
    <header className={styles.header}>
      {pages && pages.length > 0 && (
        <nav className={styles.navigation}>
          <ul className={styles.list}>{renderPages(pages)}</ul>
        </nav>
      )}
    </header>
  )
}

export default Header
