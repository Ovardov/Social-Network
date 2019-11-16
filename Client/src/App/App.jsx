import React from 'react';
import SiteTitle from '../SiteTitle/SiteTitle';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';
import Avatar from '../Avatar/Avatar';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.site}>
      <header className={styles['site-header']}>
        <SiteTitle />
        <Search />
        <Navigation />
        <Avatar name="Sean Doran" image="https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg" />
      </header>
    </div>
  );
}

export default App;
