// Libraries
import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Components
import SearchBox from '../../Global/SearchBox';
import Friends from '../Friends';
import Loader from '../../Global/Loader';
// Services
import { getUserFriends } from '../../../services/userService';
// Utils
import { Colors, ComponentTypes } from '../../../utils/enums';
// Models
import User_ from '../../../models/User';
import { ProfileParams as ProfileParams_ } from '../../../models/Profile';
// Styles
import styles from './index.module.scss';

const ProfileFriends = () => {
  const { username: usernameFromParams, } = useParams<ProfileParams_>();
  const [allFriends, setAllFriends] = useState<User_[]>(null);
  const [friendsToShow, setFriendsToShow] = useState<User_[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initFriends = async () => {
      try {
        setIsLoading(true);

        const res = await getUserFriends(usernameFromParams) as User_[];

        setAllFriends(res);
        setFriendsToShow(res);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (!allFriends) {
      initFriends();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameFromParams]);


  const filterFriends = useCallback(
    (friends: User_[], searchValue: string) => {
      return friends.filter((friend: User_) => friend.fullName.toLowerCase().includes(searchValue.toLowerCase()));
    },
    []
  );

  const onSearchHandler = (searchValue: string) => {
    const filteredFriends = filterFriends(allFriends, searchValue);
    setFriendsToShow(filteredFriends);
  };

  return (
    <>
      <div className={styles['search-box-container']}>
        <SearchBox onChange={onSearchHandler} />
      </div>

      {isLoading && <Loader type='local' color={Colors.PRIMARY} />}

      {!isLoading && (
        <>
          {friendsToShow?.length > 0 && (
            <Friends friends={friendsToShow} componentType={ComponentTypes.PAGE} />
          )}

          {friendsToShow?.length === 0 && (
            <p>No friends found.</p>
          )}
        </>
      )}
    </>
  );
};

export default ProfileFriends;
