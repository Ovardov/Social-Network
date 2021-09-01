// Libraries
import React, { FC as FC_, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Components
import Button from '../Buttons/Button';
// Services
import { addFriend, removeFriend } from '../../../services/userService';
// Utils
import { Colors } from '../../../utils/enums';
import { AppState as AppState_ } from '../../../redux';
import { UserState as UserState_, addFriendAction, removeFriendAction } from '../../../redux/actions/User';
// Models
import User_ from '../../../models/User';

interface Props {
  username: string
}

const FriendStatus: FC_<Props> = ({ username, }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector<AppState_, UserState_>(state => state.user);

  const isFriends = useMemo(() => {
    return user?.friends?.find((friend: User_) => friend.username === username);
  }, [user, username]);

  const isMyProfile = useMemo(() => {
    return user.username === username;
  }, [user, username]);

  const handleClick = async () => {
    setIsLoading(true);

    try {

      if (isFriends) {
        const { message, user: friend, } = await removeFriend(username) as { message: string, user: User_ };
        dispatch(removeFriendAction(friend));

        // ToDo - print message
        //console.log(message);
      }

      if (!isFriends) {
        const { message, user: friend, } = await addFriend(username) as { message: string, user: User_ };
        dispatch(addFriendAction(friend));

        // ToDo - print message
        //console.log(message);
      }
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  if (isMyProfile) {
    return null;
  }

  return (
    <Button
      onClickHandler={handleClick}
      text={isFriends ? 'Remove Friend' : 'Add Friend'}
      color={Colors.PRIMARY}
      isLoading={isLoading}
    />
  );
};

export default FriendStatus;