import React from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './post-list.module.scss';

function renderPosts(posts) {
    return posts.map(post => {
        return (<PostCard key={post._id} {...post} />);
    });
}

function PostList({ posts }) {
    return (
        <div className={styles.container}>
            {renderPosts(posts)}
        </div>
    )
}

export default PostList;