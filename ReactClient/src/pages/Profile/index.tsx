import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Global/Avatar';
import Image from '../../components/Global/Image';
import Modal from '../../components/Global/Modal';
import EditUserPicture from '../../components/Profile/EditPicture';
// Components
import ProfileNavigation from '../../components/Profile/Navigation';
// Models
import { ProfileParams } from '../../models/Profile';
import { AppState as AppState_ } from '../../redux';
import { AuthState as AuthState_ } from '../../redux/actions/Auth';
import { Sizes } from '../../utils/enums';
// Styles
import styles from './index.module.scss';

const ProfilePage = () => {
  const { username, } = useParams<ProfileParams>();
  const [isOpenCoverPicture, setIsOpenCoverPicture] = useState(false);
  const [isOpenProfilePicture, setIsOpenProfilePicture] = useState(false);

  const {
    authState: { user, },
  } = useSelector<AppState_, {
    authState: AuthState_
  }>(state => ({
    authState: state.authState,
  }));

  return (
    <>
      <section className={styles.container}>
        <div className={styles.photos}>
          {/* Cover picture */}
          <img className={styles.cover} src={user.profilePicture.imageUrl} alt={user?.fullName} onClick={() => setIsOpenCoverPicture(true)} />

          {username === user.username && <EditUserPicture user={user} action='cover-picture' />}

          {isOpenCoverPicture && (
            <Modal hasHeader={false} onClose={() => setIsOpenCoverPicture(false)} fullWidth>
              <Image aspectRatio='16-9' imageSrc={user.profilePicture.imageUrl} imageAlt={user?.fullName} />
            </Modal>
          )}

          {/* Profile picture */}
          <div className={styles['profile-picture']}>
            {username === user.username && <EditUserPicture user={user} action='profile-picture' />}

            <span onClick={() => setIsOpenProfilePicture(true)}>
              <Avatar type='image' size={Sizes.XL} name={user?.fullName} imageSrc={user?.profilePicture?.imageUrl} />
            </span>
          </div>

          {isOpenProfilePicture && (
            <Modal hasHeader={false} onClose={() => setIsOpenProfilePicture(false)}>
              <Image aspectRatio='1-1' imageSrc={user.profilePicture.imageUrl} imageAlt={user?.fullName} />
            </Modal>
          )}
        </div>

        <ProfileNavigation />
      </section>
    </>
  );
};

export default ProfilePage;
