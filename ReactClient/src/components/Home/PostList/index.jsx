// Libraries
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
// Components
import PostCard from '../PostCard'
// Hooks

// Services

// Utils

// Styles
import styles from './index.module.scss'

const PostList = ({ posts, likePostHandler, unlikePostHandler }) => {
  // Memoized posts
  const renderPosts = useMemo(() => {
    return posts.map((post) => {
      return (
        <PostCard
          key={post.createdAt + post.author.username}
          {...post}
          likePostHandler={likePostHandler}
          unlikePostHandler={unlikePostHandler}
        />
      )
    })
  }, [posts])

  return (
    <div className={styles.container}>
      {posts.length > 0 && renderPosts}
      {posts.length === 0 && (
        <p className={styles.message}>Welcome to Social Network</p>
      )}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  likePostHandler: PropTypes.func.isRequired,
  unlikePostHandler: PropTypes.func.isRequired,
}

export default PostList
