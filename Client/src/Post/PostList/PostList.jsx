import React, { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './post-list.module.scss';

function renderPosts(posts, userInfo) {
    console.log(posts);
    return posts.map(post => {
        
        return (<PostCard key={post.id} {...post} author={userInfo ? userInfo : post.author} />);
    });
}

function PostList({ posts, userInfo }) {
    const loader = posts ? posts : []

    return (
        <div className={styles.container}>
            {renderPosts(loader, userInfo)}
        </div>
    )
}

export default PostList;