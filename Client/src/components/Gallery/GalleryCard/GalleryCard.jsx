import React from 'react';
import styles from './gallery-card.module.scss';

function GalleryCard({ id, description, image, setIsOpen, index, setPhotoIndex }) {

    const handleClick = () => {
        setIsOpen(true);
        setPhotoIndex(index);
    }

    return (
        <li className={styles.container}>
            <button className={styles['image-container']} type="button" onClick={handleClick}>
                <img src={image} alt={description} />
            </button>
        </li>
    )
}

export default GalleryCard;