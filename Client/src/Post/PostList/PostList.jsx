import React from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './post-list.module.scss';

function renderPosts(posts, props, handlePostDelete, setUser, user) {
    return posts.map(post => {
        return (<PostCard key={post._id} {...post} {...props} handlePostDelete={handlePostDelete} setUser={setUser} user={user} />);
    });
}

function PostList({ posts, props, handlePostDelete, setUser, user }) {
    return (
        <div className={styles.container}>
            {renderPosts(posts, props, handlePostDelete, setUser, user)}
        </div>
    )
}

export default PostList;