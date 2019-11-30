import React from 'react';
import { Link } from 'react-router-dom';
import styles from './avatar.module.scss';

function Avatar({ name, profilePicture }) {
    return (
        <div className={styles.container}>
            <Link to="/profile/1">
                <img className={styles["avatar-image"]} src={profilePicture} alt={name} />
            </Link>
        </div>
    )
}

export default Avatar;