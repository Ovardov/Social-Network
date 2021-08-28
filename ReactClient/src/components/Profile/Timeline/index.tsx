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
import InfoCard from '../../Global/InfoCard';

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
            <InfoCard title='Last 9 Photos'>
              <Gallery images={lastNinePhotos} userFullName={'Test Name'} componentType={ComponentTypes.LOCAL} />
            </InfoCard>
          )}

          {/* Last Friends */}
          {lastNineFriends?.length > 0 && (
            <InfoCard title='Last 9 Friends'>
              <Friends friends={lastNineFriends} componentType={ComponentTypes.LOCAL} />
            </InfoCard>
          )}
        </section>

        <section className={styles['right-column']}>
          {/* <PostList posts={posts} /> */}
        </section>
      </div>
    </>
  );
};

export default ProfileTimeline;
