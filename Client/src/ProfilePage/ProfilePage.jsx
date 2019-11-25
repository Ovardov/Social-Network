import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';
import FriendPage from '../Friend/FriendPage/FriendPage';
import TimelinePage from '../Timeline/TimelinePage/TimelinePage';
import friends from '../friends';
import data from '../data';
import styles from './profile-page.module.scss';

class ProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showContentPage: 'Timeline'
        }
    }

    handleShowContentPage = (event) => {
        this.setState({
            showContentPage: event.target.innerText
        })
    }

    render() {
        const showContentPage = this.state.showContentPage;

        const filteredData = data.filter((post) => post.author.name === "Sean Doran");

        return (
            <section className={styles.container}>
                <div className={styles.photos}>
                    <img className={styles.cover} src="https://miro.medium.com/max/785/1*H-25KB7EbSHjv70HXrdl6w.png" alt="" />

                    <div className={styles['profile-picture']}>
                        <Avatar name="Sean Doran" image="https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg" />
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
                            <li className={showContentPage === 'Photos' ? `${styles.active}` : ""} >
                                <button className="button" onClick={this.handleShowContentPage}>Photos</button>
                            </li>
                        </div>
                    </ul>
                </div>

                <div className={styles.content}>
                    {showContentPage === 'Timeline' && <TimelinePage posts={filteredData} />}
                    {showContentPage === 'Friends' && <FriendPage friends={friends} />}
                </div>
            </section>
        )
    }
}

export default ProfilePage;