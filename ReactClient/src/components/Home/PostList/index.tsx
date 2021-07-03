// Libraries
import React, { useMemo, FC } from 'react';
// Components
import PostCard from '../PostCard';
// Hooks

// Services

// Utils

// Styles
import styles from './index.module.scss';

// ToDo - Remove Any type
const PostList: FC<any> = ({ posts, likePostHandler, unlikePostHandler, deletePostHandler, }) => {
  // Memoized posts
  const renderPosts = useMemo(() => {
    return posts.map((post: any) => {
      return (
        <PostCard
          key={post.createdAt + post.author.username}
          {...post}
          likePostHandler={likePostHandler}
          unlikePostHandler={unlikePostHandler}
          deletePostHandler={deletePostHandler}
        />
      );
    });
  }, [posts]);

  return (
    <div className={styles.container}>
      {posts.length > 0 && renderPosts}
      {posts.length === 0 && (
        <p className={styles.message}>Welcome to Social Network</p>
      )}
    </div>
  );
};

export default PostList;
