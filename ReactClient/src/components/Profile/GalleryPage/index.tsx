// Libraries
import React from 'react';
import { useParams } from 'react-router-dom';
// Components
import Gallery from '../Gallery';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Models
import { ProfileParams as ProfileParams_ } from '../../../models/Profile';

const ProfileGallery = () => {
  const { username, } = useParams<ProfileParams_>();

  const images = [
    { id: '1', imageUrl: 'https://via.placeholder.com/1024x768', }
  ];

  return (
    <Gallery
      images={images}
      componentType={ComponentTypes.PAGE}
      userFullName={username}
    />
  );
};

export default ProfileGallery;
