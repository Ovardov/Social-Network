// Libraries
import React, { useState, useCallback } from 'react';
// Components
import SearchBox from '../../Global/SearchBox';
import Friends from '../Friends';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Models
import User_ from '../../../models/User';
// Styles
import styles from './index.module.scss';

const ProfileFriends = () => {
  const data = [
    {
      firstName: 'Test',
      fullName: 'Test Testov',
      id: '1',
      lastName: 'Testov',
      profilePicture: { id: '1', imageUrl: '', },
      username: 'Test',
    }
  ];

  const [friendsToShow, setFriendsToShow] = useState<User_[]>(data);

  const filterFriends = useCallback(
    (friends: User_[], searchValue: string) => {
      return friends.filter((friend: User_) => friend.fullName.toLowerCase().includes(searchValue.toLowerCase()));
    },
    []
  );

  const onSearchHandler = (searchValue: string) => {
    const filteredFriends = filterFriends(data, searchValue);
    setFriendsToShow(filteredFriends);
  };

  return (
    <>
      <div className={styles['search-box-container']}>
        <SearchBox onChange={onSearchHandler} />
      </div>

      <Friends friends={friendsToShow} componentType={ComponentTypes.PAGE} />
    </>
  );
};

export default ProfileFriends;
