import React from 'react';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";


function PhotoModal({ images, isOpen, setIsOpen, photoIndex, setPhotoIndex }) {
    return (
        <div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    onCloseRequest={() => setIsOpen(false)}
                    nextSrc={images.length > 1 && images[(photoIndex + 1) % images.length]}
                    prevSrc={images.length > 1 && images[(photoIndex + images.length - 1) % images.length]}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </div>
    );
}

export default PhotoModal;