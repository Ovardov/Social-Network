// Libraries
import React, { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
// Components
import PostCard from '../PostCard';
// Models
import Post_ from '../../../models/Post';
import { UserState as UserState_ } from '../../../redux/actions/User';
import { PostsState as PostsState_ } from '../../../redux/actions/Posts';
import { AppState as AppState_ } from '../../../redux';
import { ProfileParams } from '../../../models/Profile';
// Utils
import { checkIsLoggedUser } from '../../../utils/helper';
// Styles
import styles from './index.module.scss';

const PostList: FC = () => {
  const { username: usernameFromParams, } = useParams<ProfileParams>();
  const { posts, user, } = useSelector<AppState_, { posts: PostsState_, user: UserState_ }>(state => ({ posts: state.posts, user: state.user, }));

  const isMyProfile = checkIsLoggedUser(usernameFromParams, user);
  const postsToShow = isMyProfile ? user.posts : posts;

  // Memoized posts
  const renderPosts = useMemo(() => {
    return postsToShow.map((post: Post_) => {
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
      {posts.length > 0 && renderPosts}
      {posts.length === 0 && (
        <p className={styles.message}>Welcome to Social Network</p>
      )}
    </div>
  );
};

export default PostList;
