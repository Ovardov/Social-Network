import React from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './post-list.module.scss';

function renderPosts(posts, props) {
    return posts.map(post => {
        return (<PostCard key={post._id} {...post} {...props} />);
    });
}

function PostList({ posts, props }) {
    return (
        <div className={styles.container}>
            {renderPosts(posts, props)}
        </div>
    )
}

export default PostList;