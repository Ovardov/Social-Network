import React from 'react';
import SiteTitle from '../SiteTitle/SiteTitle';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';
import Avatar from '../Avatar/Avatar';
import CreatePost from '../Post/CreatePost/CreatePost';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.site}>
      <header className={styles['site-header']}>
        <SiteTitle />
        <Search />
        <Navigation />
        <div className={styles['user-info']}>
          <Avatar name="Sean Doran" image="https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg" />
          <a href="#">
            <p className={styles.name}>Sean Doran</p>
            <p>View your profile</p>
          </a>
        </div>
      </header>

      <main className={styles['site-main']}>
          <CreatePost />
      </main>
    </div>
  );
}

export default App;
