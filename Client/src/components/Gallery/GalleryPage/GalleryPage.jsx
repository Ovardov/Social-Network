import React, { useState, Fragment } from 'react';
import GaleryList from '../GalleryList/GalleryList';
import PhotoModal from '../../PhotoModal/PhotoModal';

function GalleryPage({ posts }) {
    const postsWithImage = posts.filter(post=> post.image);
    const images = postsWithImage.map(post => post.image);

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <Fragment>
            <GaleryList posts={postsWithImage} setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex}/>
            <PhotoModal isOpen={isOpen} images={images} setIsOpen={setIsOpen} photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} />
        </Fragment>
    )
}

export default GalleryPage;