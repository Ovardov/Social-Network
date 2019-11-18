import React from 'react';
import SiteTitle from '../SiteTitle/SiteTitle';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';
import Avatar from '../Avatar/Avatar';
import Weather from '../Weather/Weather';
import CreatePost from '../Post/CreatePost/CreatePost';
import PostList from '../Post/PostList/PostList';
import styles from './app.module.scss';
import data from '../data';

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
        <section className={styles['left-column']}>
          <Weather />
        </section>

        <section className={styles['middle-column']}>
          <CreatePost />
          <PostList posts={data} />
        </section>

        <section className={styles['right-column']}>
          <Weather />
        </section>
      </main>
    </div>
  );
}

export default App;
