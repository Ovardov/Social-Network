import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';
import styles from './friend-card.module.scss';


function FriendCard({ name, profilePicture, home, username, lastFriends }) {
    return (
        <Link to={`/profile/${username}`}>
            <section className={styles.container}>
                <div className={styles['image-container']}>
                    <Avatar name={name} profilePicture={profilePicture}></Avatar>

                    {lastFriends !== true && (
                        <div className={styles['message-container']}>
                            <i className="fas fa-user-circle message-icon"></i>
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    {lastFriends !== true && <h5 className={home ? '' : styles.scale}>{name}</h5>}

                    {lastFriends !== true && home && <p>Lives in {home}</p>}
                </div>
            </section>
        </Link>
    )

}

export default FriendCard;