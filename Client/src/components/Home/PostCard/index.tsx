// Libraries
import React, { useState, useMemo, FC as FC_ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Avatar from '../../Global/Avatar';
import Icon from '../../Global/Icon';
import Image from '../../Global/Image';
import Dropdown from '../../Global/Dropdown';
import Modal from '../../Global/Modal';
import Button from '../../Global/Buttons/Button';
import PostAction from '../PostAction';
import PostDetail from '../PostDetail';
import ButtonContainers from '../../Global/Buttons/ButtonsContainer';
// Services
import { likePost, dislikePost } from '../../../services/postService';
import { commentPost } from '../../../services/commentService';
// Redux
import { updatePostAction } from '../../../redux/actions/Posts';
// Utils
import { Colors, ActionModes, PostDetailModes, Sizes } from '../../../utils/enums';
import { capitalizeFirstLetter, checkIsLoggedUser } from '../../../utils/helper';
// Images
import LikeOutlinedIcon from '../../../../public/images/like-outlined-icon.svg';
import LikeFilledIcon from '../../../../public/images/like-filled-icon.svg';
import CommentOutlinedIcon from '../../../../public/images/comment-outlined-icon.svg';
import CommentFilledIcon from '../../../../public/images/comment-filled-icon.svg';
import EditIcon from '../../../../public/images/edit-icon.svg';
import DeleteIcon from '../../../../public/images/delete-icon.svg';
// Models
import { AppState as AppState_ } from '../../../redux';
import { UserState as UserState_ } from '../../../redux/actions/User';
import Post_ from '../../../models/Post';
// Styles
import styles from './index.module.scss';
import inputStyles from '../../Global/InputField/input-field.module.scss';

type Props = {
  post: Post_
}

type PostDetail = { likes: boolean } | { comments: boolean }

const PostCard: FC_<Props> = ({ post, }) => {
  const { id, author, content, image, createdAt, likesCount, likes, commentsCount, } = post;

  const [actionMode, setActionMode] = useState<ActionModes>(null);
  const [postDetailMode, setPostDetailMode] = useState<PostDetailModes>(null);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');

  const user = useSelector<AppState_, UserState_>(state => state.user);

  const dispatch = useDispatch();

  const isLikedByMe = useMemo(() => {
    return likes.find(like => like.likedBy.id === user.id);
  }, [likes, user]);

  const isLoggedUser = useMemo(() => {
    return checkIsLoggedUser(author.username, user);
  }, [user, author.username]);

  const onLikePost = async () => {
    try {
      const likedPost = await likePost(id);

      dispatch(updatePostAction(likedPost));
    } catch (e) {
      console.log(e);
    }
  };

  const onDislikePost = async () => {
    try {
      const dislikedPost = await dislikePost(id);

      dispatch(updatePostAction(dislikedPost));
    } catch (e) {
      console.log(e);
    }
  };

  const onCommentPost = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const postFormData = {
        content: newComment,
        postId: id,
      };

      const commentedPost = await commentPost(postFormData);

      dispatch(updatePostAction(commentedPost));
      setNewComment('');
      setIsCommentBoxOpen(false);
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  const dropdownOptions = [
    {
      id: 1,
      onClickHandler: () => setActionMode(ActionModes.EDIT),
      name: 'Edit',
      optionIcon: EditIcon,
    },
    {
      id: 2,
      onClickHandler: () => setActionMode(ActionModes.DELETE),
      name: 'Delete',
      optionIcon: DeleteIcon,
    }
  ];

  if (actionMode) {
    return (
      <PostAction
        mode={actionMode}
        post={post}
        onModalClose={() => setActionMode(null)}
        modalTitle={`${capitalizeFirstLetter(actionMode)} Post`}
      />
    );
  }

  if (postDetailMode) {
    return (
      <PostDetail
        mode={postDetailMode}
        post={post}
        onModalClose={() => setPostDetailMode(null)}
        modalTitle={capitalizeFirstLetter(postDetailMode)}
      />
    );
  }

  if (isCommentBoxOpen) {
    return (
      <Modal
        title='Add a coment'
        onClose={() => setIsCommentBoxOpen(false)}
        hasHeader
      >
        <form onSubmit={onCommentPost}>
          <p className={inputStyles.container}>
            <input
              name='comment'
              placeholder='You look awesome.'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={inputStyles.input}
              autoFocus />
          </p>

          <ButtonContainers
            columns={1}
            widthType='full-width'
          >
            <Button
              text='Save'
              type='submit'
              color={Colors.PRIMARY}
              isLoading={isLoading}
              disabled={newComment?.length < 1}
            />
          </ButtonContainers>
        </form>
      </Modal>
    );
  }

  return (
    <article className={styles.container}>
      {/* Author info */}
      <header className={styles.header} >
        <Avatar
          type='image-with-info'
          size={Sizes.MD}
          user={isLoggedUser ? user : author}
          createdAt={createdAt}
        />

        {isLoggedUser && (
          <div className={styles['dropdown-container']}>
            <Dropdown options={dropdownOptions} />
          </div>
        )}
      </header>

      {/* Post Info */}
      <div className={styles['post-data']}>
        {content && <p className={styles.content}>{content}</p>}

        {image?.imageUrl && (
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
            onClick={() =>
              isLikedByMe
                ? onDislikePost()
                : onLikePost()
            }
          >
            <Icon size={Sizes.SM} color={Colors.LIKE} Component={LikeOutlinedIcon} alt='Like Icon' />
          </li>
          <li
            className={`${styles['action-button']} ${styles['comment-button']} ${styles['status-commented']}`}
            onClick={() => setIsCommentBoxOpen(true)}
          >
            <Icon size={Sizes.SM} color={Colors.COMMENT} Component={CommentOutlinedIcon} alt='Comment Icon' />
          </li>
        </ul>
      </div>

      {/* All reactions */}
      <footer className={styles.footer}>
        <ul className={styles['icons-list']}>
          <li className={styles.icon} onClick={() => setPostDetailMode(PostDetailModes.LIKES)}>
            <Icon size={Sizes.SM} color={Colors.LIKE} Component={LikeFilledIcon} alt='Like Icon' />

            <span className={`${styles.likes}`}>
              {likesCount ?? 0}
            </span>
          </li>
          <li className={styles.icon} onClick={() => setPostDetailMode(PostDetailModes.COMMENTS)}>
            <Icon size={Sizes.SM} color={Colors.COMMENT} Component={CommentFilledIcon} alt='Comment Icon' />

            <span className={styles.comments}>
              {commentsCount ?? 0}
            </span>
          </li>
        </ul>
      </footer>
    </article >
  );
};

export default PostCard;
