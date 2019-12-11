import React, { useContext } from 'react';
import { UserContext } from '../App/App';
import UserInfo from '../UserInfo/UserInfo';
import postService from '../services/postService';
import commentService from '../services/commentService';
import styles from './opened-modal.module.scss';
import SocialAnalytics from '../SocialAnalytics/SocialAnalytics';
import Like from '../Like/Like';
import ActionComment from '../Comment/ActionComment/ActionComment';
import CommentCard from '../Comment/CommentCard/CommentCard';

function OpenedModal({ _id, date, author, image, description, likes, comments, setIsOpened }) {
    const postId = _id;
    const { username } = useContext(UserContext);

    const isCreator = author.username === username;
    const isFriends = author.friends ? author.friends.map(friend => friend.username === username)[0] : false;

    const handleCommentDelete = (commentId) => {
        commentService.deleteComment(commentId)
            .then((res) => console.log(res));
    }

    return (
        <section className={styles.container} >
            <button className="button" onClick={() => setIsOpened(false)}>X</button>

            <section className={styles['image-container']}>
                <img src={image} alt={description} />
            </section>

            <section className={styles['post-info-container']}>
                <section className={styles['post-info']}>
                    <UserInfo className={styles.user} user={author} date={date} isFriends={isFriends} isCreator={isCreator} />

                    <SocialAnalytics likes={likes} comments={comments} />
                    <Like id={postId} />
                </section>

                <section className={styles.comments}>
                    <section>
                        <CommentCard comments={comments} handleCommentDelete={handleCommentDelete} />
                    </section>
                </section>

                <ActionComment id={postId} author={author} action="create" />
            </section>
        </section >
    )
}

export default OpenedModal;