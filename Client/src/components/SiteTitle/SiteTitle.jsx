import React from 'react';
import { Link } from 'react-router-dom';
import styles from './site-title.module.scss';

function SiteTitle() {
    return (
        <h1 className={styles['site-title']}>
            <Link to="/">SN</Link>
        </h1>
    )
}

export default SiteTitle;