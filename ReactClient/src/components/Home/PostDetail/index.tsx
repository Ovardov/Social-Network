// Libraries
import React, { FC as FC_, useState, useEffect } from 'react';
// Components
import Modal from '../../Global/Modal';
import Loader from '../../Global/Loader';
import UserInfo from '../../Global/UserInfo';
import CommentDetail from '../Comment';
// Services
import { getPostComments, getPostLikes } from '../../../services/postService';
// Utils
import { Colors, PostDetailModes } from '../../../utils/enums';
// Models
import Like_ from '../../../models/Like';
import Comment_ from '../../../models/Comment';
import Post_ from '../../../models/Post';

type PostDetailProps = {
  mode: PostDetailModes
  post: Post_
  onModalClose: () => void
  modalTitle: string
}

const PostDetail: FC_<PostDetailProps> = ({ mode, post, onModalClose, modalTitle, }) => {
  const { id: postId, } = post;

  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState<Like_[]>([]);
  const [comments, setComments] = useState<Comment_[]>([]);

  useEffect(() => {
    const initDetails = async () => {
      setIsLoading(true);

      try {
        if (mode === PostDetailModes.LIKES) {
          const allLikes = await getPostLikes(postId);
          setLikes(allLikes);
        } else if (mode === PostDetailModes.COMMENTS) {
          const alLComments = await getPostComments(postId);
          setComments(alLComments);
        }
      } catch (err) {
        // To Do -> Show error
        console.log(err);
      }

      setIsLoading(false);
    };

    if (mode) {
      initDetails();
    }
  }, [mode, postId]);

  return (
    <Modal
      title={modalTitle}
      onClose={onModalClose}
      hasHeader
    >
      <>
        {isLoading && <Loader type='local' color={Colors.PRIMARY} />}

        {/* Likes */}
        {mode === PostDetailModes.LIKES && likes?.length > 0 && likes.map(({ likedBy, }: Like_) => (
          <UserInfo key={likedBy.username} user={likedBy} />
        ))}

        {/* Comments */}
        {mode === PostDetailModes.COMMENTS && comments?.length > 0 && comments.map((comment: Comment_) => (
          <CommentDetail key={comment.id} comment={comment} setComments={setComments} />
        ))}
      </>
    </Modal>
  );
};

export default PostDetail;
