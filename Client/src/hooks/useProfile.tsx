// Libraries
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
// Utils
import { checkIsAuthenticatedUser } from '../utils/helper';
// Models
import { ProfileParams as ProfileParams_ } from '../models/Profile';
import { AppState as AppState_ } from '../redux';
import { UserState as UserState_ } from '../redux/actions/User';

const useProfile = () => {
  const { username: usernameFromParams, } = useParams<ProfileParams_>();
  const user = useSelector<AppState_, UserState_>(state => state.user);

  const isAuthenticatedUser = checkIsAuthenticatedUser(usernameFromParams, user.username);

  return {
    isAuthenticatedUser,
  };
};

export default useProfile;