// Libraries
import React, { useState } from 'react'
// Components
import CreatePost from '../../components/Home/CreatePost'
import ErrorsList from '../../components/Global/ErrorsList'
// Services
import { createPost } from '../../services/postService'
// Styles
import styles from './index.module.scss'
import PostList from '../../components/Home/PostList'

const HomePage = ({ postData }) => {
  const [posts, setPosts] = useState(postData || [])
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCreatePost = async (data, { resetForm }) => {
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

  return (
    <div className={styles.container}>
      {/* Errors Box */}
      {errors.length > 0 && <ErrorsList errors={errors} />}

      <CreatePost onSubmit={handleCreatePost} isLoading={isLoading} />

      <PostList posts={posts} />
    </div>
  )
}

export default HomePage
