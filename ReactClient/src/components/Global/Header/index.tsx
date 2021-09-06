// Libraries
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// Components
import Avatar from '../Avatar';
import Icon from '../Icon';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
// Images
import HomeIcon from '../../../../public/images/home-icon.svg';
import MessagesIcon from '../../../../public/images/messages-icon.svg';
// Models
import { AppState as AppState_ } from '../../../redux';
import { UserState as UserState_ } from '../../../redux/actions/User';
import User_ from '../../../models/User';
// Styles
import styles from './index.module.scss';

type Page = {
  url: string
  name: string
  IconComponent?: typeof React.Component
}

const renderPages = (pages: Page[], pathname: string, user: User_) => {
  return pages.map(({ url, name, IconComponent, }: Page) => {
    const isSelected = pathname === url;

    return (
      <li key={url} className={styles['list-item']}>
        <Link
          to={url}
          className={`${styles.link} ${isSelected ? styles.selected : ''}`}
        >
          {IconComponent && !url.includes('/profile') && (
            <Icon
              Component={IconComponent}
              alt={name}
              size={Sizes.MD}
              color={Colors.TEXT}
              hasHoverEffect={false}
            />
          )}
          
          {url.includes('/profile') && (
            <Avatar type='image' size={Sizes.SM} user={user} />
          )}

          <span className={styles.name}>{name}</span>
        </Link>
      </li>
    );
  });
};

const Header: FC = () => {
  const user = useSelector<AppState_, UserState_>(state => state.user);
  const history = useHistory();
  const { pathname, } = history.location;

  const isProfilePage = pathname?.includes('/profile');

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
      url: `/profile/${user.username}`,
      name: user.fullName,
    }
  ];

  return (
    <header className={`${styles.header} ${isProfilePage ? styles['small-header'] : ''}`}>
      {pages && pages.length > 0 && (
        <nav className={styles.navigation}>
          <ul className={styles.list}>{renderPages(pages, pathname, user)}</ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
