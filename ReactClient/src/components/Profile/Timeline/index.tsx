// Libraries
import React from 'react';
// Components
import PostList from '../../Home/PostList';
import Friends from '../Friends';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

const Timeline = () => {

  const lastNineFriends = [
    {
      firstName: 'Test',
      fullName: 'Test Testov',
      id: '1',
      lastName: 'Testov',
      profilePicture: { id: '1', imageUrl: '', },
      username: 'Test',
    }
  ].slice(0, 9);

  return (
    <div className={styles.container}>
      <section className={styles['left-column']}>
        {/* <LastPhotos posts={posts} /> */}

        {/* Last Friends */}
        <div className={styles['last-friends-container']}>
          <p className={styles['section-name']}>Last 9 Friends</p>

          <Friends friends={lastNineFriends} componentType={ComponentTypes.LOCAL} />
        </div>

      </section>

      <section className={styles['right-column']}>
        <PostList />
      </section>
    </div>
  );
};

export default Timeline;
