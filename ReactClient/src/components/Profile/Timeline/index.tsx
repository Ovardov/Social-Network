// Libraries
import React, { FC as FC_ } from 'react';
// Components
import PostList from '../../Home/PostList';
import Friends from '../Friends';
import Gallery from '../Gallery';
import InfoCard from '../../Global/InfoCard';
// Models
import User_ from '../../../models/User';
import Image_ from '../../../models/Image';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

interface Props {
  lastNineFriends: User_[],
  lastNinePhotos: Image_[],
}

const ProfileTimeline: FC_<Props> = ({ lastNineFriends, lastNinePhotos, }) => {
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
          <PostList />
        </section>
      </div>
    </>
  );
};

export default ProfileTimeline;
