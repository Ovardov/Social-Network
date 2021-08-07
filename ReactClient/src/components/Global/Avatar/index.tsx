// Libraries
import React, { FC as FC_, useMemo } from 'react';
// Utils
import { getTimeDifference } from '../../../utils/date';
import { Sizes } from '../../../utils/enums';
// Images
import defaultProfilePicture from '../../../../public/images/profile-placeholder.png';
// Styles
import styles from './index.module.scss';

interface Props {
  type: 'image' | 'image-with-info',
  size: Sizes,
  imageSrc?: string,
  name: string,
  createdAt?: Date,
}

const Avatar: FC_<Props> = ({ type, size, imageSrc, name, createdAt, }) => {

  const timeDifference = useMemo(() => getTimeDifference(createdAt), [createdAt]);

  return (
    <div className={`${styles.container} ${type === 'image-with-info' ? styles.center : ''}`}>
      <img
        className={`${styles.avatar} ${styles[`size-${size}`]}`}
        src={imageSrc || defaultProfilePicture}
        alt={name}
      />

      {type === 'image-with-info' && (
        <div className={styles.author}>
          {name && <h2 className={styles.name}>{name}</h2>}
          {createdAt && <p className={styles.date}>{timeDifference}</p>}
        </div>
      )}
    </div>
  );
};

export default Avatar;
