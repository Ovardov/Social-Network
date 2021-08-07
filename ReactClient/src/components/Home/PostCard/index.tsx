// Libraries
import React, { useMemo, useState, FC as FC_ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Avatar from '../../Global/Avatar';
import Icon from '../../Global/Icon';
import Image from '../../Global/Image';
import Dropdown from '../../Global/Dropdown';
import PostAction from '../PostAction';
// Services
import { likePost, dislikePost } from '../../../services/postService';
// Redux
import { updatePostAction } from '../../../redux/actions/Posts';
// Utils
import { PostActionModes } from '../../../utils/enums';
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
import { capitalizeFirstLetter } from '../../../utils/helper';

type Props = {
  post: Post_
}

const PostCard: FC_<Props> = ({ post, }) => {
  const [mode, setMode] = useState<PostActionModes>(null);
  const { id, author, content, image, likes, comments, createdAt, } = post;

  const {
    authState: { user, },
  } = useSelector<AppState_, {
    authState: AuthState_
  }>(state => ({
    authState: state.authState,
  }));

  const dispatch = useDispatch();

  // ToDo -> In server
  const isLikedByMe = useMemo(() => {
    return likes.find(like => like?.likedBy?.username === user?.username);
  }, [likes, user.username]);

  const onLikePost = async () => {
    try {
      // ToDo -> Make fetch types
      const likedPost = await likePost(id) as Post_;

      dispatch(updatePostAction(likedPost));
    } catch (e) {
      // ToDo -> Global error handling
    }
  };

  const onDislikePost = async () => {
    try {
      const dislikedPost = await dislikePost(id) as Post_;

      dispatch(updatePostAction(dislikedPost));
    } catch (e) {
      // ToDo -> Global error handling
    }
  };

  const dropdownOptions = [
    {
      id: 1,
      onClickHandler: () => setMode(PostActionModes.EDIT),
      name: 'Edit',
      optionIcon: EditIcon,
    },
    {
      id: 2,
      onClickHandler: () => setMode(PostActionModes.DELETE),
      name: 'Delete',
      optionIcon: DeleteIcon,
    }
  ];

  if (mode) {
    return (
      <PostAction
        mode={mode} 
        post={post}
        onModalClose={() => setMode(null)}
        modalTitle={`${capitalizeFirstLetter(mode)} Post`}
      />
    );
  }

  return (
    <article className={styles.container}>
      {/* Author info */}
      <header className={styles.header}>
        <Avatar
          type='image-with-info'
          size='md'
          imageSrc={author?.profilePicture?.imageUrl}
          name={author?.fullName}
          createdAt={createdAt}
        />

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
            imageSrc={image?.imageUrl}
            imageAlt={content || ''}
          />
        )}

        {/* Like and comment buttons */}
        <ul className={styles['action-buttons-list']}>
          <li
            className={`${styles['action-button']} ${styles['like-button']} ${isLikedByMe ? styles['status-liked'] : ''}`}
            onClick={async () =>
              isLikedByMe
                ? await onDislikePost()
                : await onLikePost()
            }
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
              {likes?.length || 0}
            </span>
          </li>
          <li className={styles.icon}>
            <Icon size='sm' color='comment' Component={CommentFilledIcon} alt='Comment Icon' />

            <span className={styles.comments}>
              {comments?.length ?? 0}
            </span>
          </li>
        </ul>
      </footer>
    </article>
  );
};

export default PostCard;
