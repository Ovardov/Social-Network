// Libraries
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import { Switch } from 'react-router-dom';
// Components
import ProtectedRoute from './ProtectedRoute';
import LoginAndRegisterRoute from './LoginAndRegisterRoute';
// Redux
import { setAuthAction } from '../../../redux/actions/Auth';
import { setPostsAction } from '../../../redux/actions/Posts';
import { ExternalState as ExternalState_ } from '../../../global';

// Pages
const HomePage = loadable(() => import('../../../pages/Home'), {
  ssr: true,
});
const LoginPage = loadable(() => import('../../../pages/Login'), { ssr: true, });
const RegisterPage = loadable(() => import('../../../pages/Register'), {
  ssr: true,
});

// ToDo -> Remove any type
const Navigation: FC<ExternalState_> = ({ user, posts, }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(user) {
      dispatch(setAuthAction(user));
    }

    if(posts?.length > 0) {
      dispatch(setPostsAction(posts));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(dispatch);
  return (
    <Switch>
      <LoginAndRegisterRoute path='/login' Component={LoginPage} />
      <LoginAndRegisterRoute path='/register' Component={RegisterPage} />
      <ProtectedRoute exact path='/' Component={HomePage} />
    </Switch>
  );
};

export default Navigation;