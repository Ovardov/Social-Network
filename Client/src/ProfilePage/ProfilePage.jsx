import React, { useState, useEffect, useContext } from 'react';
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

function ProfilePage(props) {
    const profileUsername = props.match.params.username;

    const [showContentPage, setShowContentPage] = useState('Timeline');
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const { username } = useContext(UserContext);

    const isFriends = friends ? friends.map(friend => friend.username === username)[0] : false;

    const handleShowContentPage = (event) => {
        setShowContentPage(event.target.innerText);
    }

    useEffect(() => {
        userService.loadUser(profileUsername)
            .then(user => {
                setPosts(user[0].posts);
                setFriends(user[0].friends);
                setUserInfo({
                    username: user[0].username,
                    name: user[0].name,
                    profilePicture: user[0].profilePicture,
                    relationshipStatus: user[0].relationshipStatus,
                    home: user[0].home,
                    work: user[0].work,
                    education: user[0].education,
                    about: user[0].about,
                    id: user[0]._id
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, [profileUsername]);

    return (
        <section className={styles.container}>
            <div className={styles.photos}>
                <img className={styles.cover} src="https://miro.medium.com/max/785/1*H-25KB7EbSHjv70HXrdl6w.png" alt="" />

                <div className={styles['profile-picture']}>
                    <Avatar username={userInfo.profileUsername} name={userInfo.name} profilePicture={userInfo.profilePicture} />
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
                    <div>{friends.length}</div>
                    <span>Friends</span>
                </div>
                <div className={styles['info-container']}>
                    <h3>{userInfo.name}</h3>
                    {userInfo.username === username ? <Logout {...props} /> : <FriendStatus id={userInfo.id} isFriends={isFriends} />}
                </div>
                <div className={styles['info-container']}>
                    <div>{posts.length}</div>
                    <span>Posts</span>
                </div>
            </div>

            <div className={styles.content}>
                {showContentPage === 'Timeline' && <TimelinePage posts={posts} userInfo={userInfo} />}
                {showContentPage === 'About' && <AboutPage userInfo={userInfo} setShowContentPage={setShowContentPage} />}
                {showContentPage === 'Friends' && <FriendPage friends={friends} />}
                {showContentPage === 'Gallery' && <GalleryPage posts={posts} />}
                {showContentPage === 'Edit' && <EditProfilePage userInfo={userInfo} setUserInfo={setUserInfo} props={props} setShowContentPage={setShowContentPage} />}
            </div>
        </section>
    )
}


export default ProfilePage;