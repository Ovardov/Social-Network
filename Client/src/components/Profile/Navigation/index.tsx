// Libraries
import React, { FC as FC_, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// Components
import Link from '../../Global/Buttons/Link';
// Utils
import { Colors } from '../../../utils/enums';
// Models
import { ProfileParams } from '../../../models/Profile';
// Styles
import styles from './index.module.scss';

const ProfileNavigation: FC_ = () => {
  const { username, } = useParams<ProfileParams>();
  const { location: { pathname: activePage, }, } = useHistory();

  const initialPath = `/profile/${username}`;

  const renderedPages = useMemo(() => {
    const pages = [
      { path: initialPath, name: 'Timeline', },
      { path: `${initialPath}/about`, name: 'About', },
      { path: `${initialPath}/friends`, name: 'Friends', },
      { path: `${initialPath}/gallery`, name: 'Gallery', }
    ];

    return pages.map(page => (
      <li
        key={page.path}
        className={styles['list-item']}
      >
        <Link
          href={page.path}
          text={page.name}
          color={activePage === page.path ? Colors.PRIMARY : Colors.BACKGROUND}
        />
      </li>
    ));
  }, [initialPath, activePage]);

  return (
    <nav className={styles.menu}>
      <ul className={styles.list}>
        {renderedPages}
      </ul>
    </nav>
  );
};

export default ProfileNavigation;
