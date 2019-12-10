import React from 'react';
import GalleryCard from '../GalleryCard/GalleryCard';
import styles from './gallery-list.module.scss';

function renderPhotos(posts) {
    return posts.map(post => {
        return (<GalleryCard key={post._id} {...post} />);
    });
}

function GalleryList({ posts }) {
    return (
        <ul className={styles.container}>
            {renderPhotos(posts)}
        </ul>
    )
}

export default GalleryList;