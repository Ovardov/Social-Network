import React from 'react';
import PostList from '../../Post/PostList/PostList';
import Weather from '../../Weather/Weather';
import styles from './timeline-page.module.scss';

function TimelinePage({ posts, props }) {
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
                <Weather />
            </section>

            <section className={styles['right-column']}>
                <PostList posts={posts} props={props}/>
            </section>
        </div>
    )
}

export default TimelinePage;