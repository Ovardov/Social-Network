import React, { FC } from 'react';
import Avatar from '../Avatar';
import FriendStatus from '../FriendStatus';
import User_ from '../../../models/User';
import { Sizes } from '../../../utils/enums';
import styles from './index.module.scss';

interface Props {
  user: User_
  isSeparated?: boolean
}

const UserInfo: FC<Props> = ({ user, isSeparated, }) => {
  const { username, } = user;

  return (
    <div className={`${styles.content} ${isSeparated ? styles['separated-users'] : ''}`}>
      <Avatar
        type='image-with-info'
        size={Sizes.MD}
        user={user}
      />

      <FriendStatus
        username={username}
      />
    </div>
  );
};

export default UserInfo;
