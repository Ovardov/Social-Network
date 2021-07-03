// Libraries
import React, { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
// Components
import PostCard from '../PostCard';
// Models
import { AppState as AppState_ } from '../../../redux/index';
import Post_ from '../../../models/Post';
import { PostsState as PostsState_ } from '../../../redux/actions/Posts';
// Styles
import styles from './index.module.scss';

// ToDo - Remove Any type
const PostList: FC = () => {
  const {
    postsState: { posts, },
  } = useSelector<AppState_, {
    postsState: PostsState_
  }>(state => ({
    postsState: state.postsState,
  }));

  // Memoized posts
  const renderPosts = useMemo(() => {
    return posts.map((post: Post_) => {
      return (
        <PostCard
          key={post.createdAt + post.author.username}
          {...post}
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
