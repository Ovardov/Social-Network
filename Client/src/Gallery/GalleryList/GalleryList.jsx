import React from 'react';
import GalleryCard from '../GalleryCard/GalleryCard';
import styles from './gallery-list.module.scss';

function renderPhotos(photos) {
    return photos.map(photo => {
        return (<GalleryCard key={photo.id} {...photo} />);
    });
}

function GalleryList({ photos }) {
    return (
        <ul className={styles.container}>
            {renderPhotos(photos)}
        </ul>
    )
}

export default GalleryList;