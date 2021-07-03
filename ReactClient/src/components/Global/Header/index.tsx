// Libraries
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// Components
import Avatar from '../Avatar';
import Icon from '../Icon';
// Images
import HomeIcon from '../../../../public/images/home-icon.svg';
import MessagesIcon from '../../../../public/images/messages-icon.svg';
// Models
import { AppState as AppState_ } from '../../../redux';
import { AuthState as AuthState_ } from '../../../redux/actions/Auth';
// Styles
import styles from './index.module.scss';

type Page = {
  url: string
  name: string
  avatar?: string,
  IconComponent?: typeof React.Component
}

const renderPages = (pages: Page[], pathname: string) => {
  return pages.map(({ url, name, IconComponent, avatar, }: Page) => {
    const isSelected = pathname === url;

    return (
      <li key={url} className={styles['list-item']}>
        <Link
          to={url}
          className={`${styles.link} ${isSelected ? styles.selected : ''}`}
        >
          {IconComponent && url !== '/profile' && (
            <Icon
              Component={IconComponent}
              alt={name}
              size='md'
              color='text'
              hasHoverEffect={false}
            />
          )}
          {url === '/profile' && (
            <Avatar size='sm' imageSrc={avatar} imageAlt={name} />
          )}

          <span className={styles.name}>{name}</span>
        </Link>
      </li>
    );
  });
};

const Header: FC = () => {
  const { authState: { user, }, } = useSelector<AppState_, { authState: AuthState_ }>(state => ({ authState: state.authState, }));
  const history = useHistory();
  const { pathname, } = history.location;

  const pages = [
    {
      url: '/',
      name: 'Home',
      IconComponent: HomeIcon,
    },
    {
      url: '/messages',
      name: 'Messages',
      IconComponent: MessagesIcon,
    },
    {
      url: '/profile',
      name: user.fullName,
      avatar: user.profilePicture ? user.profilePicture?.imageUrl : null,
    }
  ];

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to='/' className={styles['title-link']}>
          <Icon
            Component={HomeIcon}
            alt='Home'
            size='md'
            color='primary'
            hasHoverEffect={true}
            isSelected={true}
          />
        </Link>
      </h1>

      {pages && pages.length > 0 && (
        <nav className={styles.navigation}>
          <ul className={styles.list}>{renderPages(pages, pathname)}</ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
