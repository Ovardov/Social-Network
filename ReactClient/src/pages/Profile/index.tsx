import React, { useEffect, useState, FC as FC_, useMemo } from 'react';
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
import ProfileTimeline from '../../components/Profile/Timeline';
import ProfileAbout from '../../components/Profile/About';
import ProfileFriends from '../../components/Profile/FriendsPage';
import ProfileGallery from '../../components/Profile/GalleryPage';
// Services
import { logout } from '../../services/authService';
import { getProfileData } from '../../services/userService';
// Models
import { ProfileParams } from '../../models/Profile';
import { AppState as AppState_ } from '../../redux';
// Actions
import { AuthState as AuthState_, removeAuthAction } from '../../redux/actions/Auth';
// Models
import User_ from '../../models/User';
import Post_ from '../../models/Post';
// Utils
import { Colors, Sizes } from '../../utils/enums';
// Styles
import styles from './index.module.scss';

const ProfilePage: FC_ = () => {
  const dispatch = useDispatch();
  const { location: { pathname, }, push, } = useHistory();
  const { username, } = useParams<ProfileParams>();
  const [isOpenCoverPicture, setIsOpenCoverPicture] = useState(false);
  const [isOpenProfilePicture, setIsOpenProfilePicture] = useState(false);
  const [userData, setUserData] = useState<User_>(null);

  const {
    authState: { user, },
  } = useSelector<AppState_, {
    authState: AuthState_
  }>(state => ({
    authState: state.authState,
  }));

  useEffect(() => {
    const initUserData = async () => {
      try {
        const res = await getProfileData(username) as User_;

        setUserData(res);
      } catch (err) {
        console.log(err);
      }
    };

    if (!userData) {
      initUserData();
    }
  });

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(removeAuthAction());
      push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const lastNineFriends = useMemo(() => {
    return (userData?.friends || []).slice(0, 9);
  }, [userData?.friends]);


  const { lastNinePhotos, allImages, } = useMemo(() => {
    const allImages = (userData?.posts || [])
      .filter((post: Post_) => post?.image?.imageUrl)
      .map((post: Post_) => post.image);

    const lastNinePhotos = allImages.slice(0, 9);

    return {
      allImages,
      lastNinePhotos,
    };
  }, [userData?.posts]);

  return (
    <>
      <section className={styles.container}>
        {/* User Photos */}
        <div className={styles.photos}>
          {/* Cover picture */}
          <img
            className={styles.cover}
            src={userData?.coverPicture?.imageUrl}
            alt={userData?.fullName}
            onClick={() => setIsOpenCoverPicture(true)}
          />

          {username === user.username && <EditUserPicture user={userData} action='cover-picture' />}

          {isOpenCoverPicture && (
            <Modal hasHeader={false} onClose={() => setIsOpenCoverPicture(false)} fullWidth>
              <Image aspectRatio='16-9' imageSrc={userData?.coverPicture?.imageUrl} imageAlt={userData?.fullName} />
            </Modal>
          )}

          {/* Profile picture */}
          <div className={styles['profile-picture']}>
            {username === user.username && <EditUserPicture user={userData} action='profile-picture' />}

            <span onClick={() => setIsOpenProfilePicture(true)}>
              <Avatar type='image' size={Sizes.XL} name={userData?.fullName} imageSrc={userData?.profilePicture?.imageUrl} />
            </span>
          </div>

          {isOpenProfilePicture && (
            <Modal hasHeader={false} onClose={() => setIsOpenProfilePicture(false)}>
              <Image aspectRatio='1-1' imageSrc={userData?.profilePicture?.imageUrl} imageAlt={userData?.fullName} />
            </Modal>
          )}
        </div>

        {/* Navigation */}
        <ProfileNavigation />

        {/* User Info */}
        <div className={styles['user-info']}>

          <div className={styles['info-container']}>
            <span className={styles.number}>{userData?.friendsCount || 0}</span>
            <span className={styles.category}>Friends</span>
          </div>

          <div className={styles['info-container']}>
            <h3 className={styles['user-full-name']}>{userData?.fullName}</h3>

            {user.username === username ? (
              <Button text='Logout' color={Colors.PRIMARY} onClickHandler={handleLogout} />
            ) : (
              <FriendStatus username={username} />
            )}
          </div>

          <div className={styles['info-container']}>
            <span className={styles.number}>{userData?.postsCount || 0}</span>
            <span className={styles.category}>Posts</span>
          </div>
        </div>

        {/* Content */}
        {pathname === `/profile/${username}` && (
          <ProfileTimeline
            lastNineFriends={lastNineFriends}
            lastNinePhotos={lastNinePhotos}
            posts={userData?.posts}
          />
        )}

        {pathname === `/profile/${username}/about` && <ProfileAbout />}
        {pathname === `/profile/${username}/friends` && <ProfileFriends />}
        {pathname === `/profile/${username}/gallery` && <ProfileGallery images={allImages} />}
      </section>
    </>
  );
};

export default ProfilePage;
