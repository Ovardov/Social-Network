// Libraries
import React, { FC as FC_ } from 'react';
import { useParams } from 'react-router-dom';
// Components
import Gallery from '../Gallery';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Models
import { ProfileParams as ProfileParams_ } from '../../../models/Profile';
import Image_ from '../../../models/Image';
interface Props {
  images: Image_[]
}
const ProfileGallery: FC_<Props> = ({ images }) => {
  const { username, } = useParams<ProfileParams_>();

  return (
    <Gallery
      images={images}
      componentType={ComponentTypes.PAGE}
      userFullName={username}
    />
  );
};

export default ProfileGallery;
