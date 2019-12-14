import React, { useState, useEffect, useContext, Fragment } from 'react';
import { FadeLoader } from "react-spinners";
import { UserContext } from '../App/App';
import Avatar from '../Avatar/Avatar';
import TimelinePage from '../Timeline/TimelinePage/TimelinePage';
import AboutPage from '../About/AboutPage/AboutPage';
import FriendPage from '../Friend/FriendPage/FriendPage';
import GalleryPage from '../Gallery/GalleryPage/GalleryPage';
import EditProfilePage from './EditProfilePage/EditProfilePage';
import FriendStatus from '../FriendStatus/FriendStatus';
import Logout from '../Logout/Logout';
import userService from '../services/userService';
import styles from './profile-page.module.scss';
import EditPicture from '../EditPicture/EditPicture';
import PhotoModal from '../PhotoModal/PhotoModal';

function ProfilePage(props) {
    let showContentPageFromProps = '';
    if(props.location.state && props.location.state.hasOwnProperty('showContentPage')) {
        showContentPageFromProps = props.location.state.showContentPage;
    }

    const profileUsername = props.match.params.username;

    const [showContentPage, setShowContentPage] = useState(showContentPageFromProps || 'Timeline');
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenProfilePicture, setIsOpenProfilePicture] = useState(false);
    const [isOpenCoverPicture, setIsOpenCoverPicture] = useState(false);

    const { username } = useContext(UserContext);

    const isFriends = user && user.friends ? user.friends.map(friend => friend.username === username)[0] : false;

    const handleShowContentPage = (event) => {
        setShowContentPage(event.target.innerText);
    }

    useEffect(() => {
        userService.loadUser(profileUsername)
            .then(user => {
                const allPosts = user[0].posts.sort((a, b) => new Date(b.date) - new Date(a.date))
                delete user[0].posts;

                setPosts(allPosts);
                setUser(user[0]);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [profileUsername]);

    return (
        <Fragment>
            {isLoading === true && (
                <div className="loader">
                    <FadeLoader size={160} color={"#4080FF"} loading={isLoading} />
                </div>
            )}

            {isLoading === false && (
                <section className={styles.container}>
                    <div className={styles.photos}>
                        <div className={styles['cover-picture']}>
                            <img className={styles.cover} src={user.coverPicture} alt="" onClick={() => setIsOpenCoverPicture(true)} />

                            {username === user.username && <EditPicture user={user} setUser={setUser} action="coverPicture" />}
                            <PhotoModal images={[user.coverPicture]} isOpen={isOpenCoverPicture} setIsOpen={setIsOpenCoverPicture} photoIndex={0} />
                        </div>


                        <div className={styles['profile-picture']}>
                            <Avatar username={user.username} name={user.name} profilePicture={user.profilePicture} setIsOpen={setIsOpenProfilePicture} />

                            {username === user.username && <EditPicture user={user} setUser={setUser} action="profilePicture" />}
                            <PhotoModal images={[user.profilePicture]} isOpen={isOpenProfilePicture} setIsOpen={setIsOpenProfilePicture} photoIndex={0} />
                        </div>
                    </div>

                    <div className={styles.menu}>
                        <ul>
                            <div className={styles.left}>
                                <li className={showContentPage === 'Timeline' ? `${styles.active}` : ""} >
                                    <button className="button" onClick={handleShowContentPage}>Timeline</button>
                                </li>
                                <li className={showContentPage === 'About' ? `${styles.active}` : ""} >
                                    <button className="button" onClick={handleShowContentPage}>About</button>
                                </li>
                            </div>
                            <div className={styles.right}>
                                <li className={showContentPage === 'Friends' ? `${styles.active}` : ""} >
                                    <button className="button" onClick={handleShowContentPage}>Friends</button>
                                </li>
                                <li className={showContentPage === 'Gallery' ? `${styles.active}` : ""} >
                                    <button className="button" onClick={handleShowContentPage}>Gallery</button>
                                </li>
                            </div>
                        </ul>
                    </div>

                    <div className={styles['user-info']}>
                        <div className={styles['info-container']}>
                            <div>{user.friends.length}</div>
                            <span>Friends</span>
                        </div>
                        <div className={styles['info-container']}>
                            <h3>{user.name}</h3>
                            {user.username === username ? <Logout {...props} /> : <FriendStatus props={props} id={user._id} isFriends={isFriends} />}
                        </div>
                        <div className={styles['info-container']}>
                            <div>{posts.length}</div>
                            <span>Posts</span>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {showContentPage === 'Timeline' && <TimelinePage user={user} posts={posts} setPosts={setPosts} props={props} />}
                        {showContentPage === 'About' && <AboutPage user={user} setShowContentPage={setShowContentPage} />}
                        {showContentPage === 'Friends' && <FriendPage friends={user.friends} />}
                        {showContentPage === 'Gallery' && <GalleryPage posts={posts} />}
                        {showContentPage === 'Edit' && <EditProfilePage user={user} setUser={setUser} props={props} setShowContentPage={setShowContentPage} />}
                    </div>
                </section>
            )}
        </Fragment>
    )
}


export default ProfilePage;