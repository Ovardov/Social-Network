import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar/Avatar';
import TimelinePage from '../Timeline/TimelinePage/TimelinePage';
import AboutPage from '../About/AboutPage/AboutPage';
import FriendPage from '../Friend/FriendPage/FriendPage';
import GalleryPage from '../Gallery/GalleryPage/GalleryPage';
import userService from '../services/userService';
import friends from '../friends';
import photos from '../photos';
import styles from './profile-page.module.scss';

function ProfilePage(props) {
    const [showContentPage, setShowContentPage] = useState('Timeline');
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    const handleShowContentPage = (event) => {
        setShowContentPage(event.target.innerText);
    }


    useEffect(() => {
        const {username} = props.match.params

        userService.loadUser(username)
            .then(user => {
                setPosts(user[0].posts);
                setUserInfo({ username: user[0].username, name: user[0].name, profilePicture: user[0].profilePicture });
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.photos}>
                <img className={styles.cover} src="https://miro.medium.com/max/785/1*H-25KB7EbSHjv70HXrdl6w.png" alt="" />

                <div className={styles['profile-picture']}>
                    <Avatar username={userInfo.username} name={userInfo.name} profilePicture={userInfo.profilePicture} />
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

            <div className={styles.content}>
                {showContentPage === 'Timeline' && <TimelinePage posts={posts} userInfo={userInfo} />}
                {showContentPage === 'About' && <AboutPage photos={photos} />}
                {showContentPage === 'Friends' && <FriendPage friends={friends} />}
                {showContentPage === 'Gallery' && <GalleryPage photos={photos} />}
            </div>
        </section>
    )
}


export default ProfilePage;