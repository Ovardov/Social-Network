// Libraries
import React, { useState } from 'react'
// Components
import CreatePost from '../../components/Home/CreatePost'
import ErrorsList from '../../components/Global/ErrorsList'
// Hooks
import { useAuth } from '../../hooks/useAuth'
// Services
import { createPost, likePost, unlikePost } from '../../services/postService'
// Styles
import styles from './index.module.scss'
import PostList from '../../components/Home/PostList'

const HomePage = ({ postData }) => {
  const { user } = useAuth()

  const [posts, setPosts] = useState(postData || [])
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const createPostHandler = async (data, { resetForm }) => {
    setIsLoading(true)

    try {
      await createPost(data)
      resetForm({})
    } catch (err) {
      // To Do -> Custom error builder
      setErrors(JSON.parse(err.message).errors)
      console.log(errors)
    }

    setIsLoading(false)
  }

  const likePostHandler = async (postId) => {
    try {
      await likePost(postId)

      const { firstName, lastName, fullName, _id, username } = user

      const newLike = {
        post: postId,
        likedBy: {
          firstName,
          lastName,
          fullName,
          username,
          _id,
        },
      }

      // Save new like in post
      const postsWithAdditionalLike = posts.map((post) => {
        if (post._id === postId) {
          post.likes.push(newLike)
        }

        return post
      })

      setPosts([...postsWithAdditionalLike])
    } catch (err) {
      console.log("Error while liking post", err)
    }
  }

  const unlikePostHandler = async (postId) => {
    try {
      await unlikePost(postId)

      const { username } = user

      // Remove my like from post
      const postsWithRemovedLike = posts.map((post) => {
        if (post._id === postId) {
          const postWithRemovedMyLike = post.likes.filter(
            (like) => like.likedBy.username !== username
          )
          
          post.likes = postWithRemovedMyLike
        }

        return post
      })

      setPosts([...postsWithRemovedLike])
    } catch (err) {
      console.log("Error while unliking post", err)
    }
  }

  return (
    <div className={styles.container}>
      {/* Errors Box */}
      {errors.length > 0 && <ErrorsList errors={errors} />}

      <CreatePost onSubmit={createPostHandler} isLoading={isLoading} />

      <PostList
        posts={posts}
        likePostHandler={likePostHandler}
        unlikePostHandler={unlikePostHandler}
      />
    </div>
  )
}

export default HomePage
