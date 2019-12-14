import React from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './post-list.module.scss';

function renderPosts(posts, props, handlePostDelete, setPosts, user) {
    return posts.map(post => {
        return (<PostCard key={post._id} {...post} posts={posts} setPosts={setPosts} props={props} handlePostDelete={handlePostDelete} user={user} />);
    });
}

function PostList({ posts, props, handlePostDelete, setUser, user, setPosts }) {
    return (
        <div className={styles.container}>
            {renderPosts(posts, props, handlePostDelete, setPosts, setUser, user)}
        </div>
    )
}

export default PostList;