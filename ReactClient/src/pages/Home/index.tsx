// Libraries
import React, { useState } from 'react'
// Components
import CreatePost from '../../components/Home/CreatePost'
import ErrorsList from '../../components/Global/ErrorsList'
import PostList from '../../components/Home/PostList'
import SearchBox from '../../components/Global/SearchBox'
// Hooks
import { useAuth } from '../../hooks/useAuth'
// Services
import { createPost, deletePost, likePost, unlikePost } from '../../services/postService'
// Styles
import styles from './index.module.scss'

const HomePage = ({ postData }: any) => {
  const { user } = useAuth()

  const [posts, setPosts] = useState(postData || [])
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // ToDo -> Remove formik
  const createPostHandler = async (data: Object, { resetForm }: any) => {
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

  const deletePostHandler = async(id: string) => {
    try {
      await deletePost(id)

      // Remove deleted post from all posts
      // ToDo -> Remove ANY type
      const newPosts = posts.filter((post: any) => post._id !== id)
      setPosts(newPosts)
    } catch(err) {
      // To Do -> Custom error builder
      setErrors(JSON.parse(err.message).errors)
      console.log(errors)
    }
  }

  const likePostHandler = async (postId: string) => {
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
      // ToDo -> Remove ANY type
      const postsWithAdditionalLike = posts.map((post: any) => {
        if (post._id === postId) {
          post.likes.push(newLike)
        }

        return post
      })

      setPosts([...postsWithAdditionalLike])
    } catch (err) {
      console.log('Error while liking post', err)
    }
  }

  const unlikePostHandler = async (postId: string) => {
    try {
      await unlikePost(postId)

      const { username } = user

      // Remove my like from post
      // ToDo -> Remove ANY type
      const postsWithRemovedLike = posts.map((post: any) => {
        if (post._id === postId) {
          const postWithRemovedMyLike = post.likes.filter(
            (like: any) => like.likedBy.username !== username
          )

          post.likes = postWithRemovedMyLike
        }

        return post
      })

      setPosts([...postsWithRemovedLike])
    } catch (err) {
      console.log('Error while unliking post', err)
    }
  }

  return (
    <div className={styles.container}>
      <section>
        {/* Errors Box */}
        {errors.length > 0 && <ErrorsList errors={errors} />}

        <CreatePost onSubmit={createPostHandler} isLoading={isLoading} />

        <PostList
          posts={posts}
          likePostHandler={likePostHandler}
          unlikePostHandler={unlikePostHandler}
          deletePostHandler={deletePostHandler}
        />
      </section>

      <section>
        <SearchBox />
      </section>
    </div>
  )
}

export default HomePage
