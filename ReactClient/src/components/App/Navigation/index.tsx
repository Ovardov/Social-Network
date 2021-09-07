// Libraries
import React, { FC, lazy, Suspense, useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Components
import ProtectedRoute from './ProtectedRoute';
import LoginAndRegisterRoute from './LoginAndRegisterRoute';
import Loader from '../../Global/Loader';
// Services
import { auth } from '../../../services/userService';
// Actions
import { setUserAction } from '../../../redux/actions/User';
// Utils
import { Colors } from '../../../utils/enums';

// Pages
const HomePage = lazy(() => import('../../../pages/Home'));
const SearchPage = lazy(() => import('../../../pages/Search'));
const LoginPage = lazy(() => import('../../../pages/Login'));
const RegisterPage = lazy(() => import('../../../pages/Register'));
const ProfilePage = lazy(() => import('../../../pages/Profile'));
const Messages = lazy(() => import('../../../pages/Messages'));

const Navigation: FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const initUser = async () => {
      setIsLoading(true);

      try {
        const user = await auth();
        dispatch(setUserAction(user));
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    initUser();
  }, []);

  if (isLoading) {
    return <Loader type='global' color={Colors.PRIMARY} />;
  }

  return (
    <Switch>
      <Suspense fallback={<Loader type='global' color={Colors.PRIMARY} />}>
        <LoginAndRegisterRoute path='/login' Component={LoginPage} />
        <LoginAndRegisterRoute path='/register' Component={RegisterPage} />
        <ProtectedRoute path='/profile/:username' Component={ProfilePage} />
        <ProtectedRoute path='/search/' Component={SearchPage} />
        <ProtectedRoute path='/messages' Component={Messages} />
        <ProtectedRoute exact path='/' Component={HomePage} />
      </Suspense>
    </Switch>
  );
};

export default Navigation;
