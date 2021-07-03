// Libraries
import React, { FC } from 'react';
// Components
import Header from '../Global/Header';
// Styles
import styles from './layout.module.scss';

const Layout: FC = ({ children, }) => {
  return (
    <div className={styles.site} >
      <Header />

      <main className={styles['site-main']}>{children}</main>
    </div>
  );
};

export default Layout;
