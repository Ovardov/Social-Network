import React from 'react';
import { Link } from 'react-router-dom';
import styles from './avatar.module.scss';

function Avatar({ username, name, profilePicture }) {
    return (
        <span className={styles.container}>
            <Link to={`/profile/${username}`}>
                <img className={styles["avatar-image"]} src={profilePicture} alt={name} />
            </Link>
        </span>
    )
}

export default Avatar;