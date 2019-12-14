import React from 'react';
import PostCard from '../PostCard/PostCard';
import styles from './post-list.module.scss';
import LazyLoad from 'react-lazyload';

const Loading = () => {
    return <div>Loading...</div>
}

function renderPosts(posts, props, handlePostDelete, setPosts, user) {
    return posts.map(post => {
        return (
            <LazyLoad key={post._id} placeholder={<Loading />}>
                <PostCard key={post._id} {...post} posts={posts} setPosts={setPosts} props={props} handlePostDelete={handlePostDelete} user={user} />
            </LazyLoad>
        );
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