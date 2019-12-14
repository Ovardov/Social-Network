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

function OpenedModal({ _id, date, author, image, description, likes, comments, setIsOpened, setPosts, posts, props }) {
    const postId = _id;
    const { username } = useContext(UserContext);

    const hoursWithMinutes = new Date(date).toLocaleTimeString();
    const day = new Date(date).toDateString();
    const formattedDate = `${hoursWithMinutes} - ${day}`;

    const isCreator = author.username === username;
    const isFriends = author.friends ? author.friends.map(friend => friend.username === username)[0] : false;

    const handleCommentDelete = (commentId) => {
        commentService.deleteComment(commentId)
            .then((res) => {
                if(res === 'Removed Successfully') {
                    const filteredComments = comments.filter(comment => comment._id !== commentId);
                    
                    const AllPosts = posts.map(post => post._id === postId ? {...post, comments: filteredComments} : {...post});
                    
                    setPosts(AllPosts);
                }
            });
    }

    return (
        <section className={styles.container} >
            <button className="button" onClick={() => setIsOpened(false)}>X</button>

            <section className={styles['image-container']}>
                <img src={image} alt={description} />
            </section>

            <section className={styles['post-info-container']}>
                <section className={styles['post-info']}>
                    <UserInfo className={styles.user} props={props} user={author} date={formattedDate} isFriends={isFriends} isCreator={isCreator} />

                    <SocialAnalytics likes={likes} comments={comments} />
                    <Like id={postId} likes={likes} setPosts={setPosts} posts={posts} />
                </section>

                <section className={styles.comments}>
                    <section>
                        <CommentCard comments={comments} posts={posts} setPosts={setPosts} handleCommentDelete={handleCommentDelete} />
                    </section>
                </section>

                <ActionComment id={postId} author={author} action="create" posts={posts} setPosts={setPosts} />
            </section>
        </section >
    )
}

export default OpenedModal;