// Libraries
import React from 'react';
// Components
import PostList from '../../Home/PostList';
import Friends from '../Friends';
import Gallery from '../Gallery';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

const ProfileTimeline = () => {

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

  const lastNinePhotos = [
    {
      id: "5fdf63d007afc244fc0cbe03",
      imageUrl: "http://res.cloudinary.com/dxxq5xtsy/image/upload/v1608475599/pmb6bhycp8sxt6qspelu.jpg",
    }
  ].slice(0, 9);

  return (
    <>
      <div className={styles.container}>
        <section className={styles['left-column']}>
          {/* Last Photos */}
          {lastNinePhotos.length > 0 && (
            <div className={styles['last-photos-container']}>
              <p className={styles['section-name']}>Last 9 Photos</p>

              <Gallery images={lastNinePhotos} userFullName={'Test Name'} componentType={ComponentTypes.LOCAL} />
            </div>
          )}

          {/* Last Friends */}
          {lastNineFriends.length > 0 && (
            <div className={styles['last-friends-container']}>
              <p className={styles['section-name']}>Last 9 Friends</p>

              <Friends friends={lastNineFriends} componentType={ComponentTypes.LOCAL} />
            </div>
          )}
        </section>

        <section className={styles['right-column']}>
          <PostList />
        </section>
      </div>
    </>
  );
};

export default ProfileTimeline;
