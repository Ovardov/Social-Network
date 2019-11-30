import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';
import styles from './friend-card.module.scss';


function PostCard({ name, profilePicture, livesIn, id }) {

    return (
        <Link to={`/profile/${id}`}>
            <section className={styles.container}>
                <div className={styles['image-container']}>
                    <Avatar name={name} profilePicture={profilePicture}></Avatar>

                    <div className={styles['message-container']}>
                        <i class="fas fa-user-circle message-icon"></i>
                    </div>
                </div>

                <h5>{name}</h5>
                <p>Lives in {livesIn}</p>
            </section>
        </Link>
    )

}

export default PostCard;