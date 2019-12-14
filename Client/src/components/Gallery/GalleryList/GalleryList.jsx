import React from 'react';
import GalleryCard from '../GalleryCard/GalleryCard';
import styles from './gallery-list.module.scss';

function renderPhotos(posts, setIsOpen, setPhotoIndex) {
    return posts.map((post, index) => {
        return (<GalleryCard key={post._id} {...post} setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex} index={index}/>);
    });
}

function GalleryList({ posts, setIsOpen, setPhotoIndex }) {
    return (
        <ul className={styles.container}>
            {renderPhotos(posts, setIsOpen, setPhotoIndex)}
        </ul>
    )
}

export default GalleryList;