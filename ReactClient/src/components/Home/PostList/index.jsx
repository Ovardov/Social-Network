// Libraries
import React from 'react'
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
    return <PostCard key={post.id} />
  })
}

const PostList = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.length > 0 ? (
        renderPosts(posts)
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
