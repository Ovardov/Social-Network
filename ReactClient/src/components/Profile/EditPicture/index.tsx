import React, { FC as FC_ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Icon from '../../Global/Icon';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
// Models
import Image_ from '../../../models/Image';
import { AppState as AppState_ } from '../../../redux';
import { UserState as UserState_, updateUserAction } from '../../../redux/actions/User';
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

  const user = useSelector<AppState_, UserState_>(state => state.user);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const newPicture = e?.target?.files[0];

      if (newPicture && action) {
        const oldImageUrl = action === 'profile-picture'
          ? user?.profilePicture?.imageUrl
          : user?.coverPicture?.imageUrl;


        const updatedPicture = await updateUserPicture({
          oldImageUrl,
          image: newPicture,
        }) as Image_;

        if (updatedPicture?.id && updatedPicture?.imageUrl) {
          const newData = action === 'profile-picture'
            ? { profilePicture: updatedPicture, }
            : { coverPicture: updatedPicture, };

          const reduxUserAction = updateUserAction({
            ...user,
            ...newData,
          });

          dispatch(reduxUserAction);
        }

        e.target.value = '';
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
