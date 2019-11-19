import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import styles from './profile-page.module.scss';

function ProfilePage() {
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
                        <li className={styles.active}>
                            <Link className="button" children to="/profile/1">Timeline</Link>
                        </li>
                        <li>
                            <Link className="button" to="/profile/1/about">About</Link>
                        </li>
                    </div>
                    <div className={styles.right}>
                        <li>
                            <Link className="button" to="/profile/1/friends">Friends</Link>
                        </li>
                        <li>
                            <Link className="button" to="/profile/1/photos">Photos</Link>
                        </li>
                    </div>
                </ul>
            </div>
        </section>
    )
}

export default ProfilePage;