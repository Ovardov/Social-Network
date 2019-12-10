import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';
import styles from './friend-card.module.scss';


function FriendCard({ name, profilePicture, home, username }) {

    return (
        <Link to={`/profile/${username}`}>
            <section className={styles.container}>
                <div className={styles['image-container']}>
                    <Avatar name={name} profilePicture={profilePicture}></Avatar>

                    <div className={styles['message-container']}>
                        <i className="fas fa-user-circle message-icon"></i>
                    </div>
                </div>

                <h5>{name}</h5>
                <p>Lives in {home}</p>
            </section>
        </Link>
    )

}

export default FriendCard;