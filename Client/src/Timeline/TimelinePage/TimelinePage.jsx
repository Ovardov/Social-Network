import React from 'react';
import PostList from '../../Post/PostList/PostList';
import styles from './timeline-page.module.scss';
import LastPhotos from '../../LastPhotos/LastPhotos';

function TimelinePage({ posts, props }) {
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
                <LastPhotos posts={posts} />
            </section>

            <section className={styles['right-column']}>
                <PostList posts={posts} props={props}/>
            </section>
        </div>
    )
}

export default TimelinePage;