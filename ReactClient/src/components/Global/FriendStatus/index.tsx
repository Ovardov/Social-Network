// Libraries
import React, { FC as FC_, useState } from 'react';
import { useSelector } from 'react-redux';
// Components
import Button from '../Buttons/Button';
// Services
import { addFriend, removeFriend } from '../../../services/userService';
// Utils
import { Colors } from '../../../utils/enums';
import { AppState as AppState_ } from '../../../redux';
import { AuthState as AuthState_ } from '../../../redux/actions/Auth';

interface Props {
  username: string
}

const FriendStatus: FC_<Props> = ({ username, }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    authState: { user, },
  } = useSelector<AppState_, {
    authState: AuthState_
  }>(state => ({
    authState: state.authState,
  }));

  // ToDo -> Check is friends
  const isFriends = true;

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const res = isFriends ? await removeFriend(username) : await addFriend(username);

      // ToDo- print message
      console.log(res);
      // Action
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

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