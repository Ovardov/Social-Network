// Libraries
import React, { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
// Components
import PostCard from '../PostCard';
// Hooks
import useProfile from '../../../hooks/useProfile';
// Models
import Post_ from '../../../models/Post';
import { UserState as UserState_ } from '../../../redux/actions/User';
import { PostsState as PostsState_ } from '../../../redux/actions/Posts';
import { AppState as AppState_ } from '../../../redux';
// Styles
import styles from './index.module.scss';

const PostList: FC = () => {
  const { posts, user, } = useSelector<AppState_, { posts: PostsState_, user: UserState_ }>(state => ({ posts: state.posts, user: state.user, }));

  const { isAuthenticatedUser, } = useProfile();
  const postsToShow = isAuthenticatedUser ? user.posts : posts;

  // Memoized posts
  const renderPosts = useMemo(() => {
    return postsToShow?.map((post: Post_) => {
      return (
        <PostCard
          key={post.createdAt + post.author.username}
          post={post}
        />
      );
    });
  }, [postsToShow]);

  return (
    <div className={styles.container}>
      {postsToShow?.length > 0 && renderPosts}
      {postsToShow?.length === 0 && (
        <p className={styles.message}>Welcome to Social Network</p>
      )}
    </div>
  );
};

export default PostList;
