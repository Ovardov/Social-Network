import React, {Fragment} from 'react';
import GaleryList from '../GalleryList/GalleryList';

function GalleryPage({photos}) {
    return (
        <Fragment>
            <GaleryList photos={photos} />
        </Fragment>
    )
}

export default GalleryPage;