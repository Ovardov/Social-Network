// Libraries
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import ButtonContainers from '../../Global/Buttons/ButtonsContainer';
import Button from '../../Global/Buttons/Button';
import Avatar from '../../Global/Avatar';
import Dropdown from '../../Global/Dropdown';
import Modal from '../../Global/Modal';
import Icon from '../../Global/Icon';
// Services
import { deleteComment, dislikeComment, likeComment, updateComment } from '../../../services/commentService';
// Actions
import { UserState as UserState_ } from '../../../redux/actions/User';
import { removePostCommentAction } from '../../../redux/actions/Posts';
// Utils
import { ActionModes, Colors, Sizes } from '../../../utils/enums';
import { capitalizeFirstLetter } from '../../../utils/helper';
// Models
import { AppState as AppState_ } from '../../../redux';
import Comment_ from '../../../models/Comment';
// Icons
import EditIcon from '../../../../public/images/edit-icon.svg';
import DeleteIcon from '../../../../public/images/delete-icon.svg';
import LikeOutlinedIcon from '../../../../public/images/like-outlined-icon.svg';
import LikeFilledIcon from '../../../../public/images/like-filled-icon.svg';
// Styles
import styles from './index.module.scss';
import inputStyles from '../../Global/InputField/input-field.module.scss';

type CommentDetailProps = {
  comment: Comment_,
  setComments: React.Dispatch<React.SetStateAction<Comment_[]>>
}

const CommentDetail: FC<CommentDetailProps> = ({ comment, setComments, }) => {
  const { id, content, author, likesCount, isLikedByMe, } = comment;
  const user = useSelector<AppState_, UserState_>(state => state.user);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [commentActionMode, setCommentActionMode] = useState<ActionModes>(ActionModes.READ);
  const [newContent, setNewContent] = useState(content);

  const commentDropdownOptions = [
    {
      id: 1,
      onClickHandler: () => setCommentActionMode(ActionModes.EDIT),
      name: 'Edit',
      optionIcon: EditIcon,
    },
    {
      id: 2,
      onClickHandler: () => setCommentActionMode(ActionModes.DELETE),
      name: 'Delete',
      optionIcon: DeleteIcon,
    }
  ];

  const onEditComment = async () => {
    try {
      setIsLoading(true);

      if (newContent.length < 1) {
        // ToDo -> Show validation error
        return;
      }

      const updatedComment = await updateComment(id, { content: newContent, });
      setIsLoading(false);

      if (updatedComment.id) {
        setComments((comments: Comment_[]) => comments.map((comment: Comment_) => (comment.id === updatedComment.id ? updatedComment : comment)));
      }

      setCommentActionMode(ActionModes.READ);
    } catch (e) {
      setIsLoading(false);
      // ToDo -> Global error handling
    }
  };

  const onDeleteComment = async () => {
    try {
      setIsLoading(true);

      const deletedComment = await deleteComment(id);

      setIsLoading(false);

      setCommentActionMode(ActionModes.READ);

      if (deletedComment.id) {
        dispatch(removePostCommentAction(deletedComment.post));
        setComments((allComments: Comment_[]) => allComments.filter((comment: Comment_) => comment.id !== deletedComment.id));
      }
    } catch (e) {
      setIsLoading(false);
      // ToDo -> Global error handling
    }
  };

  const onLikeComment = async () => {
    try {
      setIsLoading(true);

      const updatedComment = await likeComment(id);
      setIsLoading(false);

      if (updatedComment.id) {
        setComments((comments: Comment_[]) => comments.map((comment: Comment_) => (comment.id === updatedComment.id ? updatedComment : comment)));
      }

      setCommentActionMode(ActionModes.READ);
    } catch (e) {
      setIsLoading(false);
      // ToDo -> Global error handling
    }
  };

  const onDisikeComment = async () => {
    try {
      setIsLoading(true);

      const updatedComment = await dislikeComment(id);
      setIsLoading(false);

      if (updatedComment.id) {
        setComments((comments: Comment_[]) => comments.map((comment: Comment_) => (comment.id === updatedComment.id ? updatedComment : comment)));
      }

      setCommentActionMode(ActionModes.READ);
    } catch (e) {
      setIsLoading(false);
      // ToDo -> Global error handling
    }
  };

  if (commentActionMode === ActionModes.DELETE) {
    return (
      <Modal
        title={capitalizeFirstLetter(ActionModes.DELETE)}
        onClose={() => setCommentActionMode(ActionModes.READ)}
        hasHeader
      >
        <p>Are you sure you want to delete this comment?</p>

        <ButtonContainers
          columns={2}
          widthType='full-width'
        >
          <Button
            type='button'
            isLoading={isLoading}
            text='No'
            color={Colors.SECONDARY}
            onClickHandler={() => setCommentActionMode(ActionModes.READ)}
          />

          <Button
            type='button'
            isLoading={isLoading}
            text='Yes'
            color={Colors.PRIMARY}
            onClickHandler={onDeleteComment}
          />
        </ButtonContainers>
      </Modal>
    );
  }

  return (
    <div className={styles.comment}>
      <Avatar type='image' size={Sizes.MD} user={author} />

      {commentActionMode === ActionModes.READ && (
        <>
          <p className={styles.content}>{content}</p>

          <li
            className={styles['likes-container']}
            onClick={() => isLikedByMe ? onDisikeComment() : onLikeComment()}
          >
            <Icon size={Sizes.SM} color={Colors.LIKE} Component={isLikedByMe ? LikeFilledIcon : LikeOutlinedIcon} alt='Like Icon' hasHoverEffect />

            <span className={styles.likes}>
              {likesCount ?? 0}
            </span>
          </li>
        </>
      )}

      {
        commentActionMode === ActionModes.EDIT && (
          <p className={`${inputStyles.container} ${styles['edit-field-container']}`}>
            <input
              name='comment'
              placeholder='You look awesome.'
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              onBlur={onEditComment}
              className={inputStyles.input}
              autoFocus
              disabled={isLoading}
            />
          </p>
        )
      }

      {/* If current comment is written by me */}
      {author.username === user.username && (
        <div className={styles['dropdown-container']}>
          <Dropdown options={commentDropdownOptions} />
        </div>
      )}
    </div >
  );
};

export default CommentDetail;
