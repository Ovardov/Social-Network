import React from 'react';
import { Link } from 'react-router-dom';
import styles from './avatar.module.scss';

function Avatar({ name, image }) {
    return (
        <div className={styles.container}>
            <Link to="/profile/1">
                <img className={styles["avatar-image"]} src={image} alt={name} />
            </Link>
        </div>
    )
}

export default Avatar;