import React from 'react';
import PostList from '../../Post/PostList/PostList';
import LastPhotos from '../../LastPhotos/LastPhotos';
import LastFriends from '../../LastFriends/LastFriends';
import styles from './timeline-page.module.scss';
import postService from '../../services/postService';


function TimelinePage({ user, posts, setPosts, props }) {

    const handlePostDelete = (id) => {
        postService.deletePost(id)
            .then((res) => {
                if (res === 'Deleted Successfully') {
                    const newPosts = user.posts.filter(post => post._id !== id);
                    setPosts(newPosts);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
                <LastPhotos posts={posts} />
                <LastFriends friends={user.friends} />
            </section>

            <section className={styles['right-column']}>
                <PostList posts={posts} props={props} handlePostDelete={handlePostDelete} setPosts={setPosts}/>
            </section>
        </div>
    )
}

export default TimelinePage;