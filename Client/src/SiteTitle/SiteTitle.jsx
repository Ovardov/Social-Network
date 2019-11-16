import React from 'react';
import styles from './site-title.module.scss';

function SiteTitle() {
    return (
        <h1 className={styles['site-title']}>
            <a href="/">SN</a>
        </h1>
    )
}

export default SiteTitle;