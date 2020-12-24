// Libraries
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
// Components
import Avatar from '../Avatar'
// Hooks
import { useAuth } from '../../../hooks/useAuth'
// Services

// Utils

// Images
import HomeIcon from '../../../../public/images/home-icon.svg'
import MessagesIcon from '../../../../public/images/messages-icon.svg'

// Styles
import styles from './index.module.scss'

const renderPages = (pages, pathname) => {
  return pages.map(({ url, name, Icon, avatar }) => {
    return (
      <li key={url} className={styles['list-item']}>
        <Link to={url} className={`${styles.link} ${pathname === url ? styles.selected : ''}`}>
          {Icon && url !== '/profile' && <Icon className={styles.icon} />}
          {url === '/profile' && <Avatar size="sm" imageSrc={avatar} imageAlt={name} />}

          <span className={styles.name}>{name}</span>
        </Link>
      </li>
    )
  })
}

const Header = () => {
  const { user } = useAuth()
  const history = useHistory()
  const { pathname } = history.location

  const pages = [
    {
      url: '/',
      name: 'Home',
      Icon: HomeIcon,
    },
    {
      url: '/messages',
      name: 'Messages',
      Icon: MessagesIcon,
    },
    {
      url: '/profile',
      name: 'Aleksandar Ovardov',
      avatar: user.profilePicture.imageUrl,
      Icon: '',
    },
  ]

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/" className={styles.link}>
          <HomeIcon className={styles.icon}/>
        </Link>
      </h1>

      {pages && pages.length > 0 && (
        <nav className={styles.navigation}>
          <ul className={styles.list}>{renderPages(pages, pathname)}</ul>
        </nav>
      )}
    </header>
  )
}

export default Header
