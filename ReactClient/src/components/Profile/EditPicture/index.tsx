import React, { FC as FC_ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Icon from '../../Global/Icon';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
// Models
import Image_ from '../../../models/Image';
import { AppState as AppState_ } from '../../../redux';
import { AuthState as AuthState_, updateUserAction } from '../../../redux/actions/Auth';
// Icons
import AddIcon from '../../../../public/images/photo-camera-icon.svg';
// Styles
import styles from './index.module.scss';
import { updateUserPicture } from '../../../services/userService';

interface Props {
  action: 'profile-picture' | 'cover-picture',
}

const EditUserPicture: FC_<Props> = ({ action, }) => {
  const dispatch = useDispatch();

  const {
    authState: { user, },
  } = useSelector<AppState_, {
    authState: AuthState_
  }>(state => ({
    authState: state.authState,
  }));

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const newPicture = e?.target?.files[0];

      if (newPicture) {
        const updatedPicture = await updateUserPicture({
          oldImageUrl: user?.coverPicture?.imageUrl,
          image: newPicture,
        }) as Image_;

        if (updatedPicture?.id && updatedPicture?.imageUrl) {
          const reduxUserAction = updateUserAction({
            ...user,
            ...(action === 'profile-picture' ? { profilePicture: updatedPicture, } : null),
            ...(action === 'cover-picture' ? { coverPicture: updatedPicture, } : null),
          });

          dispatch(reduxUserAction);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <label className={`${styles.container} ${styles[action]}`} htmlFor={action}>
      <Icon size={Sizes.SM} alt='Camera Icon' color={Colors.BACKGROUND} Component={AddIcon} hasHoverEffect={true} />
      <input id={action} type='file' onChange={handleChange} />
    </label>
  );
};

export default EditUserPicture;
