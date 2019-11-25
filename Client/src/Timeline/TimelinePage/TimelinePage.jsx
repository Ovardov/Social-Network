import React, { Fragment } from 'react';
import PostList from '../../Post/PostList/PostList';
import Weather from '../../Weather/Weather';
import styles from './timeline-page.module.scss';

function TimelinePage({ posts }) {
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
                <Weather />
            </section>

            <section className={styles['right-column']}>
                <PostList posts={posts} />
            </section>
        </div>
    )
}

export default TimelinePage;