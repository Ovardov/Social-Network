import React from 'react';
import styles from './avatar.module.scss';

function Avatar({ name, image }) {
    return (
        <div className={styles.container}>
            <img className={styles["avatar-image"]} src={image} alt={name} />
        </div>
    )
}

export default Avatar;