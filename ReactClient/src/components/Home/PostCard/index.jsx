// Libraries
import React, { useMemo } from 'react'
// Components
import Avatar from '../../Global/Avatar'
import Icon from '../../Global/Icon'
import Image from '../../Global/Image'
import Dropdown from '../../Global/Dropdown'
// Hooks
import { useAuth } from '../../../hooks/useAuth'
// Services

// Utils
import { getTimeDifference } from '../../../utils/date'
// Images
import LikeOutlinedIcon from '../../../../public/images/like-outlined-icon.svg'
import LikeFilledIcon from '../../../../public/images/like-filled-icon.svg'
import CommentOutlinedIcon from '../../../../public/images/comment-outlined-icon.svg'
import CommentFilledIcon from '../../../../public/images/comment-filled-icon.svg'
import EditIcon from '../../../../public/images/edit-icon.svg'
// Styles
import styles from './index.module.scss'

const PostCard = ({
  _id: postId,
  author,
  content,
  image,
  likes,
  comments,
  createdAt,
  likePostHandler,
  unlikePostHandler,
}) => {
  const { user } = useAuth()

  const dropdownOptions = [
    {
      id: 1,
      onClickHandler: () => {},
      name: 'Edit',
      optionIcon: EditIcon
    },
  ]

  const timeDifference = useMemo(() => getTimeDifference(createdAt), [
    createdAt,
  ])

  const isLikedByMe = useMemo(() => {
    for (const like of likes) {
      if (like.likedBy.username === user.username) {
        return true
      }
    }

    return false
  }, [likes.length])

  return (
    <article className={styles.container}>
      {/* Author info */}
      <header className={styles.header}>
        <Avatar
          size="md"
          imageSrc={
            author.profilePicture ? author.profilePicture.imageUrl : null
          }
          imageAlt={author.fullName}
        />

        <div className={styles.author}>
          <h2 className={styles.name}>{author.fullName}</h2>
          <p className={styles.date}>{timeDifference}</p>
        </div>

        <div className={styles['dropdown-container']}>
          <Dropdown options={dropdownOptions} />
        </div>
      </header>

      {/* Post Info */}
      <div className={styles['post-data']}>
        {content && <p className={styles.content}>{content}</p>}

        {image && (
          <Image
            aspectRatio="16-9"
            imageSrc={image.imageUrl}
            imageAlt={content || ''}
          />
        )}

        {/* Like and comment buttons */}
        <ul className={styles['action-buttons-list']}>
          <li
            className={`${styles['action-button']} ${styles['like-button']} ${
              isLikedByMe ? styles['status-liked'] : ''
            }`}
            onClick={async () =>
              isLikedByMe
                ? await unlikePostHandler(postId)
                : await likePostHandler(postId)
            }
          >
            <Icon size="sm" color="like" Component={LikeOutlinedIcon} />
          </li>
          <li
            className={`${styles['action-button']} ${styles['comment-button']} ${styles['status-commented']}`}
          >
            <Icon size="sm" color="comment" Component={CommentOutlinedIcon} />
          </li>
        </ul>
      </div>

      {/* All reactions */}
      <footer className={styles.footer}>
        <ul className={styles['icons-list']}>
          <li className={styles.icon}>
            <Icon size="sm" color="like" Component={LikeFilledIcon} />

            <span className={`${styles.likes}`}>
              {likes ? likes.length : 0}
            </span>
          </li>
          <li className={styles.icon}>
            <Icon size="sm" color="comment" Component={CommentFilledIcon} />

            <span className={styles.comments}>
              {comments ? comments.length : 0}
            </span>
          </li>
        </ul>
      </footer>
    </article>
  )
}

export default PostCard
