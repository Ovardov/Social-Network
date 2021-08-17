// Libraries
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
// Components
import Header from '../Global/Header';
// Styles
import styles from './layout.module.scss';

const Layout: FC = ({ children, }) => {
  const { location, } = useHistory();
  const isProfilePage = location?.pathname?.includes('/profile');

  return (
    <div className={`${styles.site} ${isProfilePage ? styles['small-header'] : ''}`}>
      <Header />

      <main className={styles['site-main']}>{children}</main>
    </div>
  );
};

export default Layout;
