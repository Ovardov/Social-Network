// Libraries
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
// Components
import PostCard from '../PostCard'
// Hooks

// Services

// Utils

// Styles
import styles from './index.module.scss'

const renderPosts = (posts) => {
  return posts.map((post) => {
    return (
      post.author &&
      post.author.username &&
      post.author.fullName && (
        <PostCard key={post.createdAt + post.author.username} {...post} />
      )
    )
  })
}

const PostList = ({ posts }) => {
  const memoizedRenderPosts = useCallback(() => renderPosts(posts), [posts])

  return (
    <div className={styles.container}>
      {posts.length > 0 ? (
        memoizedRenderPosts()
      ) : (
        <p className={styles.message}>Welcome to Social Network</p>
      )}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default PostList
