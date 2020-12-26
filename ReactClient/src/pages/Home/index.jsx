// Libraries
import React, { useState } from 'react'
// Components
import CreatePost from '../../components/Home/CreatePost'
import ErrorsList from '../../components/Global/ErrorsList'
// Services
import { createPost } from '../../services/postService'
// Styles
import styles from './index.module.scss'

const HomePage = () => {
  const [errors, setErrors] = useState([])

  const handleCreatePost = async (data) => {
    try {
      await createPost(data)
    } catch (err) {
      // To Do -> Custom error builder
      setErrors(JSON.parse(err.message).errors)
      console.log(errors)
    }
  }

  return (
    <div className={styles.test}>
      {/* Errors Box */}
      {errors.length > 0 && <ErrorsList errors={errors} />}

      <CreatePost onSubmit={handleCreatePost} />
    </div>
  )
}

export default HomePage
