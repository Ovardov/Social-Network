import React from 'react';
import PostList from '../../Post/PostList/PostList';
import LastPhotos from '../../LastPhotos/LastPhotos';
import LastFriends from '../../LastFriends/LastFriends';
import styles from './timeline-page.module.scss';

function TimelinePage({ friends, posts, props }) {
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
                <LastPhotos posts={posts} />
                <LastFriends friends={friends} />
            </section>

            <section className={styles['right-column']}>
                <PostList posts={posts} props={props}/>
            </section>
        </div>
    )
}

export default TimelinePage;