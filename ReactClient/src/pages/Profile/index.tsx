import React from 'react';
import {RouterProps, RouteProps} from 'react-router-dom'
// Components
import ProfileNavigation from '../../components/Profile/Navigation';

const ProfilePage = (props: RouteProps) => {
  return (
    <div>
      <ProfileNavigation />
    </div>
  );
};

export default ProfilePage;
