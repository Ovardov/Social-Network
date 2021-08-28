// Libraries
import React, { useMemo, FC } from 'react';
// Components
import PostCard from '../PostCard';
// Models
import Post_ from '../../../models/Post';
// Styles
import styles from './index.module.scss';
import { AppState as AppState_ } from '../../../redux';
import { useSelector } from 'react-redux';
import { PostsState as PostsState_ } from '../../../redux/actions/Posts';

const PostList: FC = () => {
  const posts = useSelector<AppState_, PostsState_>(state => state.posts);

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
