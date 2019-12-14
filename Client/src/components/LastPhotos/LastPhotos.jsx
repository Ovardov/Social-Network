import React, { useState } from 'react';
import GalleryList from '../Gallery/GalleryList/GalleryList';
import PhotoModal from '../PhotoModal/PhotoModal';
import styles from './last-photos.module.scss';

function LastPhotos({ posts }) {
    const postsWithImage = posts.filter(post => post.image);

    const firstNinePosts = postsWithImage.slice(0, 9);
    const images = firstNinePosts.map(post => post.image);

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <section className={styles.container}>
            <p>Last 9 Photos</p>

            <GalleryList posts={firstNinePosts} setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex} />
            <PhotoModal isOpen={isOpen} images={images} setIsOpen={setIsOpen} photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} />
        </section>
    )
}

export default LastPhotos;