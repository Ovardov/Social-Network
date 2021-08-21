// Libraries
import React, { FC as FC_ } from 'react';
// Components
import PostList from '../../Home/PostList';
import Friends from '../Friends';
import Gallery from '../Gallery';
// Models
import User_ from '../../../models/User';
import Post_ from '../../../models/Post';
import Image_ from '../../../models/Image';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

interface Props {
  lastNineFriends: User_[],
  lastNinePhotos: Image_[],
  posts: Post_[],
}

const ProfileTimeline: FC_<Props> = ({ lastNineFriends, lastNinePhotos, posts, }) => {

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
          {lastNineFriends?.length > 0 && (
            <div className={styles['last-friends-container']}>
              <p className={styles['section-name']}>Last 9 Friends</p>

              <Friends friends={lastNineFriends} componentType={ComponentTypes.LOCAL} />
            </div>
          )}
        </section>

        <section className={styles['right-column']}>
          <PostList posts={posts} />
        </section>
      </div>
    </>
  );
};

export default ProfileTimeline;
