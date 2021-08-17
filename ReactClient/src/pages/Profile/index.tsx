import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Avatar from '../../components/Global/Avatar';
import Button from '../../components/Global/Buttons/Button';
import Image from '../../components/Global/Image';
import Modal from '../../components/Global/Modal';
import EditUserPicture from '../../components/Profile/EditPicture';
// Components
import ProfileNavigation from '../../components/Profile/Navigation';
import FriendStatus from '../../components/Global/FriendStatus';
// Services
import { logout } from '../../services/authService';
// Models
import { ProfileParams } from '../../models/Profile';
import { AppState as AppState_ } from '../../redux';
// Actions
import { AuthState as AuthState_, removeAuthAction } from '../../redux/actions/Auth';
// Utils
import { Colors, Sizes } from '../../utils/enums';
// Styles
import styles from './index.module.scss';
import Timeline from '../../components/Profile/Timeline';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(removeAuthAction());
      history.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className={styles.container}>
        {/* User Photos */}
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

        {/* Navigation */}
        <ProfileNavigation />

        {/* User Info */}
        <div className={styles['user-info']}>

          <div className={styles['info-container']}>
            <span className={styles.number}>0</span>
            <span className={styles.category}>Friends</span>
          </div>

          <div className={styles['info-container']}>
            <h3 className={styles['user-full-name']}>{user.fullName}</h3>

            {user.username === username ? (
              <Button text='Logout' color={Colors.PRIMARY} onClickHandler={handleLogout} />
            ) : (
              <FriendStatus username={username} />
            )}
          </div>

          <div className={styles['info-container']}>
            <span className={styles.number}>0</span>
            <span className={styles.category}>Posts</span>
          </div>
        </div>

        {/* Content */}

        {/* Timeline */}
        <Timeline />
      </section>
    </>
  );
};

export default ProfilePage;
