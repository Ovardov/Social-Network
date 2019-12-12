import React from 'react';
import { Link } from 'react-router-dom';
import styles from './avatar.module.scss';

function Avatar({ username, name, profilePicture, setIsOpen }) {
    return (
        <span className={styles.container} onClick={() => setIsOpen(true)}>
            <Link to={`/profile/${username}`}>
                <img className={styles["avatar-image"]} src={profilePicture} alt={name}/>
            </Link>
        </span>
    )
}

export default Avatar;