import React from 'react';
import styles from './gallery-card.module.scss';

function GalleryCard({ id, title, url, thumbnailUrl }) {
    return (
        <li className={styles.container}>
            <a className={styles['image-container']}>
                <img src={url} alt={title}/>
            </a>
        </li>
    )
}

export default GalleryCard;