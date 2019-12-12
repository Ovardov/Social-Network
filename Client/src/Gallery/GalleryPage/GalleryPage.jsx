import React, { useState, Fragment } from 'react';
import GaleryList from '../GalleryList/GalleryList';
import PhotoModal from '../../PhotoModal/PhotoModal';

function GalleryPage({ posts }) {
    const images = posts.map(post => post.image)
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <Fragment>
            <GaleryList posts={posts} setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex}/>
            <PhotoModal isOpen={isOpen} images={images} setIsOpen={setIsOpen} photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} />
        </Fragment>
    )
}

export default GalleryPage;