import React, {Fragment} from 'react';
import GaleryList from '../GalleryList/GalleryList';
import styles from './gallery-page.module.scss';

function GalleryPage({photos}) {
    return (
        <Fragment>
            <GaleryList photos={photos} />
        </Fragment>
    )
}

export default GalleryPage;