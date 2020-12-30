// Libraries
import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
// Components
import Avatar from '../../Global/Avatar'
import Icon from '../../Global/Icon'
import Image from '../../Global/Image'
// Hooks

// Services

// Utils

// Images
import LikeOutlinedIcon from '../../../../public/images/like-outlined-icon.svg'
import LikeFilledIcon from '../../../../public/images/like-filled-icon.svg'
import CommentOutlinedIcon from '../../../../public/images/comment-outlined-icon.svg'
import CommentFilledIcon from '../../../../public/images/comment-filled-icon.svg'
// Styles
import styles from './index.module.scss'

const PostCard = () => {
  const { user } = useAuth()

  return (
    <article className={styles.container}>
      {/* Author info */}
      <header className={styles.header}>
        <Avatar
          size="md"
          imageSrc={user.profilePicture.imageUrl}
          imageAlt={user.fullName}
        />

        <div className={styles.author}>
          <h2 className={styles.name}>Aleksandar Ovardov</h2>
          <p className={styles.date}>1h</p>
        </div>
      </header>

      {/* Post Info */}
      <div className={styles['post-data']}>
        <p className={styles.content}>Parisian bridge</p>

        <Image
          aspectRatio="16-9"
          imageSrc="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1576368325/zvvcpghqi0vukceaz763.jpg"
          imageAlt="Test"
        />

        {/* Like and comment buttons */}
        <ul className={styles['action-buttons-list']}>
          <li
            className={`${styles['action-button']} ${styles['like-button']} ${styles['status-liked']}`}
          >
            <Icon size="xs" color="like" Component={LikeOutlinedIcon} />
          </li>
          <li
            className={`${styles['action-button']} ${styles['comment-button']} ${styles['status-commented']}`}
          >
            <Icon size="xs" color="comment" Component={CommentOutlinedIcon} />
          </li>
        </ul>
      </div>

      {/* All reactions */}
      <footer className={styles.footer}>
        <ul className={styles['icons-list']}>
          <li className={styles.icon}>
            <Icon size="xs" color="like" Component={LikeFilledIcon} />

            <span className={`${styles.likes}`}>3</span>
          </li>
          <li className={styles.icon}>
            <Icon size="xs" color="comment" Component={CommentFilledIcon} />

            <span className={styles.comments}>3</span>
          </li>
        </ul>
      </footer>
    </article>
  )
}

export default PostCard
