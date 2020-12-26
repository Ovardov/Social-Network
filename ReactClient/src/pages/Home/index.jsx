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
    <div className={styles.test}>
      {/* Errors Box */}
      {errors.length > 0 && <ErrorsList errors={errors} />}

      <CreatePost onSubmit={handleCreatePost} isLoading={isLoading} />
    </div>
  )
}

export default HomePage
