import React, { useState } from 'react';
import GalleryList from '../Gallery/GalleryList/GalleryList';
import PhotoModal from '../PhotoModal/PhotoModal';
import styles from './last-photos.module.scss';

function LastPhotos({ posts }) {
    const lastNinePosts = posts.slice(0, 9);
    const images = lastNinePosts.map(post => post.image);
    
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <section className={styles.container}>
            <p>Last 9 Photos</p>

            <GalleryList posts={lastNinePosts} setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex} />
            <PhotoModal isOpen={isOpen} images={images} setIsOpen={setIsOpen} photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} />
        </section>
    )
}

export default LastPhotos;