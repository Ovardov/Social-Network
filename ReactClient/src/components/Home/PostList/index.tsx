// Libraries
import React, { useMemo, FC } from 'react';
// Components
import PostCard from '../PostCard';
// Models
import Post_ from '../../../models/Post';
// Styles
import styles from './index.module.scss';

interface Props {
  posts: Post_[]
}

const PostList: FC<Props> = ({ posts = [], }) => {

  // Memoized posts
  const renderPosts = useMemo(() => {
    return posts.map((post: Post_) => {
      return (
        <PostCard
          key={post.createdAt + post.author.username}
          post={post}
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
