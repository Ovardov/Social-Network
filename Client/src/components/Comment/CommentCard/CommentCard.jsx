import React, { Fragment, useState, useContext } from 'react';
import { UserContext } from '../../App/App';
import Avatar from '../../Avatar/Avatar';
import ActionComment from '../ActionComment/ActionComment';
import styles from './comment-card.module.scss';

function CommentCard({ comments, handleCommentDelete, posts, setPosts }) {
    const { username } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);

    return comments.map(comment => {
        return (
            <Fragment>
                <section key={comment._id} className={styles.comment}>
                    <Avatar {...comment.author} />

                    <p className={styles.description}>
                        {comment.description}

                        {username === comment.author.username && isEditing === false && (
                            <div className={styles['action-buttons']}>
                                <button className="button" onClick={() => setIsEditing(true)}><i className="fas fa-edit"></i></button>
                                <button className="button" onClick={() => handleCommentDelete(comment._id)}><i className="fas fa-trash"></i></button>
                            </div>
                        )}
                    </p>
                </section>

                {username === comment.author.username && isEditing === true && (
                    <ActionComment id={comment._id} author={comment.author} action="edit" oldValue={comment.description} setIsEditing={setIsEditing} posts={posts} setPosts={setPosts}/>
                )}
            </Fragment>
        )
    });
}

export default CommentCard;