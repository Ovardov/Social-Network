import React, { useState, FC as FC_ } from 'react';
// Components
import Icon from '../../Global/Icon';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
// Models
import User_ from '../../../models/User';
// Icons
import AddIcon from '../../../../public/images/photo-camera-icon.svg';
// Styles
import styles from './index.module.scss';

interface Props {
  action: 'profile-picture' | 'cover-picture',
  user: User_;
}

const EditUserPicture: FC_<Props> = ({ action, user, }) => {
  const [field, setField] = useState('');

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      const newPicture = e?.target?.files[0];

      if (newPicture) {
        // To Do -> Update user info
        const res = new User_;

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
