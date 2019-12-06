import React from 'react';
import styles from './gallery-card.module.scss';

function GalleryCard({ id, description, image, thumbnailUrl }) {
    return (
        <li className={styles.container}>
            <a className={styles['image-container']}>
                <img src={image} alt={description}/>
            </a>
        </li>
    )
}

export default GalleryCard;