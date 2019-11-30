import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import TimelinePage from '../Timeline/TimelinePage/TimelinePage';
import AboutPage from '../About/AboutPage/AboutPage';
import FriendPage from '../Friend/FriendPage/FriendPage';
import GalleryPage from '../Gallery/GalleryPage/GalleryPage';
import userService from '../services/userService';
import friends from '../friends';
import photos from '../photos';
import styles from './profile-page.module.scss';

class ProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showContentPage: 'Timeline',
            posts: [],
            userInfo: {}
        }
    }

    handleShowContentPage = (event) => {
        this.setState({
            showContentPage: event.target.innerText
        })
    }

    componentDidMount() {
        const userId = '5de21c7d193ea81b04381a49';

        userService.loadUser(userId)
            .then(user => {
                this.setState({
                    posts: user[0].posts,
                    userInfo: {
                        name: user[0].name,
                        profilePicture: user[0].profilePicture
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })

    }

    render() {
        const showContentPage = this.state.showContentPage;
        const userInfo = this.state.userInfo;
        const posts = this.state.posts;

        return (
            <section className={styles.container}>
                <div className={styles.photos}>
                    <img className={styles.cover} src="https://miro.medium.com/max/785/1*H-25KB7EbSHjv70HXrdl6w.png" alt="" />

                    <div className={styles['profile-picture']}>
                        <Avatar name={userInfo.name} profilePicture={userInfo.profilePicture} />
                    </div>
                </div>

                <div className={styles.menu}>
                    <ul>
                        <div className={styles.left}>
                            <li className={showContentPage === 'Timeline' ? `${styles.active}` : ""} >
                                <button className="button" onClick={this.handleShowContentPage}>Timeline</button>
                            </li>
                            <li className={showContentPage === 'About' ? `${styles.active}` : ""} >
                                <button className="button" onClick={this.handleShowContentPage}>About</button>
                            </li>
                        </div>
                        <div className={styles.right}>
                            <li className={showContentPage === 'Friends' ? `${styles.active}` : ""} >
                                <button className="button" onClick={this.handleShowContentPage}>Friends</button>
                            </li>
                            <li className={showContentPage === 'Gallery' ? `${styles.active}` : ""} >
                                <button className="button" onClick={this.handleShowContentPage}>Gallery</button>
                            </li>
                        </div>
                    </ul>
                </div>

                <div className={styles.content}>
                    {showContentPage === 'Timeline' && <TimelinePage posts={posts} userInfo={userInfo}/>}
                    {showContentPage === 'About' && <AboutPage photos={photos} />}
                    {showContentPage === 'Friends' && <FriendPage friends={friends} />}
                    {showContentPage === 'Gallery' && <GalleryPage photos={photos} />}
                </div>
            </section>
        )
    }
}

export default ProfilePage;