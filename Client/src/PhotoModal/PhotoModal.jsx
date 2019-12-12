import React from 'react';
import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";


function PhotoModal({ images, isOpen, setIsOpen, photoIndex, setPhotoIndex }) {
    return (
        <div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </div>
    );
}

export default PhotoModal;