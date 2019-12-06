import React, {Fragment} from 'react';
import GaleryList from '../GalleryList/GalleryList';

function GalleryPage({posts}) {
    return (
        <Fragment>
            <GaleryList posts={posts} />
        </Fragment>
    )
}

export default GalleryPage;