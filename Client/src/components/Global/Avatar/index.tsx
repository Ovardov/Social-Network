// Libraries
import React, { FC as FC_, useMemo } from 'react';
// Utils
import { getTimeDifference } from '../../../utils/date';
import { Sizes } from '../../../utils/enums';
// Models
import User_ from '../../../models/User';
// Images
import defaultProfilePicture from '../../../../public/images/profile-placeholder.png';
// Styles
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';

interface Props {
  type: 'image' | 'image-with-info',
  size: Sizes,
  createdAt?: Date,
  user: User_,
  stopRedirectToProfile?: boolean
}

const Avatar: FC_<Props> = ({ type, size, user, createdAt, stopRedirectToProfile = false, }) => {
  const { push, } = useHistory();

  const { profilePicture, fullName, username, } = user;
  const timeDifference = useMemo(() => getTimeDifference(createdAt), [createdAt]);


  return (
    <div
      className={`${styles.container} ${type === 'image-with-info' ? styles.center : ''}`}
      onClick={stopRedirectToProfile ? null: () => push(`/profile/${username}`)}
    >
      <img
        className={`${styles.avatar} ${styles[`size-${size}`]}`}
        src={profilePicture?.imageUrl || defaultProfilePicture}
        alt={fullName}
        loading='lazy'
      />

      {type === 'image-with-info' && (
        <div className={styles.author}>
          {fullName && <h2 className={styles.name}>{fullName}</h2>}
          {createdAt && <p className={styles.date}>{timeDifference}</p>}
        </div>
      )}
    </div>
  );
};

export default Avatar;
