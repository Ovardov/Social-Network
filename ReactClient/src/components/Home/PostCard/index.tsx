// Libraries
import React, { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
// Components
import Avatar from '../../Global/Avatar';
import Icon from '../../Global/Icon';
import Image from '../../Global/Image';
import Dropdown from '../../Global/Dropdown';
// Utils
import { getTimeDifference } from '../../../utils/date';
// Images
import LikeOutlinedIcon from '../../../../public/images/like-outlined-icon.svg';
import LikeFilledIcon from '../../../../public/images/like-filled-icon.svg';
import CommentOutlinedIcon from '../../../../public/images/comment-outlined-icon.svg';
import CommentFilledIcon from '../../../../public/images/comment-filled-icon.svg';
import EditIcon from '../../../../public/images/edit-icon.svg';
import DeleteIcon from '../../../../public/images/delete-icon.svg';
// Models
import { AppState as AppState_ } from '../../../redux';
import { AuthState as AuthState_ } from '../../../redux/actions/Auth';
import Post_ from '../../../models/Post';
// Styles
import styles from './index.module.scss';

// ToDo -> Remove any type
const PostCard: FC<Post_> = ({
  _id: postId,
  author,
  content,
  image,
  likes,
  comments,
  createdAt,
}) => {
  const { authState: { user, }, } = useSelector<AppState_, { authState: AuthState_ }>(state => ({ authState: state.authState, }));

  const dropdownOptions = [
    {
      id: 1,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClickHandler: () => {},
      name: 'Edit',
      optionIcon: EditIcon,
    },
    {
      id: 2,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClickHandler: () => {},
      name: 'Delete',
      optionIcon: DeleteIcon,
    }
  ];

  const timeDifference = useMemo(() => getTimeDifference(createdAt), [
    createdAt
  ]);

  // ToDo -> In server
  const isLikedByMe = useMemo(() => {
    for (const like of likes) {
      if (like.likedBy.username === user.username) {
        return true;
      }
    }

    return false;
  }, [likes, user.username]);

  return (
    <article className={styles.container}>
      {/* Author info */}
      <header className={styles.header}>
        <Avatar
          size='md'
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
            aspectRatio='16-9'
            imageSrc={image.imageUrl}
            imageAlt={content || ''}
          />
        )}

        {/* Like and comment buttons */}
        <ul className={styles['action-buttons-list']}>
          <li
            className={`${styles['action-button']} ${styles['like-button']} ${isLikedByMe ? styles['status-liked'] : ''}`}
            // onClick={async () =>
            //   isLikedByMe
            //     ? await unlikePostHandler(postId)
            //     : await likePostHandler(postId)
            // }
          >
            <Icon size='sm' color='like' Component={LikeOutlinedIcon} alt='Like Icon' />
          </li>
          <li
            className={`${styles['action-button']} ${styles['comment-button']} ${styles['status-commented']}`}
          >
            <Icon size='sm' color='comment' Component={CommentOutlinedIcon} alt='Comment Icon' />
          </li>
        </ul>
      </div>

      {/* All reactions */}
      <footer className={styles.footer}>
        <ul className={styles['icons-list']}>
          <li className={styles.icon}>
            <Icon size='sm' color='like' Component={LikeFilledIcon} alt='Like Icon' />

            <span className={`${styles.likes}`}>
              {likes ? likes.length : 0}
            </span>
          </li>
          <li className={styles.icon}>
            <Icon size='sm' color='comment' Component={CommentFilledIcon} alt='Comment Icon' />

            <span className={styles.comments}>
              {comments ? comments.length : 0}
            </span>
          </li>
        </ul>
      </footer>
    </article>
  );
};

export default PostCard;
