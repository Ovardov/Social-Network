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
import Loader from '../../components/Global/Loader';
// Services
import { logout } from '../../services/authService';
import { getProfileData } from '../../services/userService';
// Models
import { ProfileParams } from '../../models/Profile';
import { AppState as AppState_ } from '../../redux';
// Actions
import { UserState as UserState_, removeUserAction, updateUserAction } from '../../redux/actions/User';
// Models
import User_ from '../../models/User';
import Post_ from '../../models/Post';
// Utils
import { Colors, Sizes } from '../../utils/enums';
import { checkIsLoggedUser, compareTwoObjects } from '../../utils/helper';
// Styles
import styles from './index.module.scss';
import { setPostsAction } from '../../redux/actions/Posts';

const ProfilePage: FC_ = () => {
  const dispatch = useDispatch();
  const { location: { pathname, }, push, } = useHistory();
  const { username: usernameFromParams, } = useParams<ProfileParams>();
  const [isOpenCoverPicture, setIsOpenCoverPicture] = useState(false);
  const [isOpenProfilePicture, setIsOpenProfilePicture] = useState(false);
  const [userData, setUserData] = useState<User_>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector<AppState_, UserState_>(state => state.user);

  const isMyProfileOpened = checkIsLoggedUser(usernameFromParams, user);

  useEffect(() => {
    const initUserData = async () => {
      try {
        setIsLoading(true);
        const res = await getProfileData(usernameFromParams) as User_;

        if (isMyProfileOpened) {
          dispatch(updateUserAction(res));
        } else {
          dispatch(setPostsAction(res.posts));
        }

        setUserData(res);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    initUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameFromParams]);

  useEffect(() => {
    if (isMyProfileOpened) {
      const isDataEqual = compareTwoObjects(user, userData);

      if (!isDataEqual) {
        setUserData(user);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isMyProfileOpened]);

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(removeUserAction());
      dispatch(setPostsAction([]));
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

  if (isLoading || !userData) {
    return <Loader type='global' color={Colors.PRIMARY} />;
  }

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
            loading='lazy'
          />

          {isMyProfileOpened && <EditUserPicture action='cover-picture' />}

          {isOpenCoverPicture && (
            <Modal hasHeader={false} onClose={() => setIsOpenCoverPicture(false)} fullWidth>
              <Image
                aspectRatio='16-9'
                imageSrc={userData?.coverPicture?.imageUrl}
                imageAlt={userData?.fullName}
              />
            </Modal>
          )}

          {/* Profile picture */}
          <div className={styles['profile-picture']}>
            {isMyProfileOpened && <EditUserPicture action='profile-picture' />}

            <span onClick={() => setIsOpenProfilePicture(true)}>
              <Avatar
                type='image'
                size={Sizes.XL}
                user={userData}
              />
            </span>
          </div>

          {isOpenProfilePicture && (
            <Modal hasHeader={false} onClose={() => setIsOpenProfilePicture(false)}>
              <Image
                aspectRatio='1-1'
                imageSrc={userData?.profilePicture?.imageUrl}
                imageAlt={userData?.fullName} />
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

            {isMyProfileOpened ? (
              <Button text='Logout' color={Colors.PRIMARY} onClickHandler={handleLogout} />
            ) : (
              <FriendStatus username={usernameFromParams} />
            )}
          </div>

          <div className={styles['info-container']}>
            <span className={styles.number}>{userData?.postsCount || 0}</span>
            <span className={styles.category}>Posts</span>
          </div>
        </div>

        {/* Content */}
        {pathname === `/profile/${usernameFromParams}` && (
          <ProfileTimeline
            lastNineFriends={lastNineFriends}
            lastNinePhotos={lastNinePhotos}
          />
        )}

        {pathname === `/profile/${usernameFromParams}/about` && <ProfileAbout userData={userData} />}
        {pathname === `/profile/${usernameFromParams}/friends` && <ProfileFriends />}
        {pathname === `/profile/${usernameFromParams}/gallery` && <ProfileGallery images={allImages} />}
      </section>
    </>
  );
};

export default ProfilePage;
