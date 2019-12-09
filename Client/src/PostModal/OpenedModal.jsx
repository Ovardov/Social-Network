import React, { useState } from 'react';
import UserInfo from '../UserInfo/UserInfo';
import Avatar from '../Avatar/Avatar';
import postService from '../services/postService';
import styles from './opened-modal.module.scss';
import SocialAnalytics from '../SocialAnalytics/SocialAnalytics';
import Like from '../Like/Like';

function renderComments(comments) {
    return comments.map(comment => {
        return <section className={styles.comment}>
            <Avatar {...comment.author} />
            <p className={styles.description}>{comment.description}</p>
        </section>
    });
}

function OpenedModal({ _id, date, author, image, description, likes, comments, setIsOpened }) {
    const postId = _id;
    const [createComment, setCreateComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            description: createComment
        }

        postService.addComment(postId, data)
            .then(res => console.log(res));
    }

    return (
        <section className={styles.container} >
            <button className="button" onClick={() => setIsOpened(false)}>X</button>

            <section className={styles['image-container']}>
                <img src={image} alt={description} />
            </section>

            <section className={styles['post-info-container']}>
                <section className={styles['post-info']}>
                    <UserInfo className={styles.user} user={author} date={date} likes={likes} comments={comments} />

                    <SocialAnalytics likes={likes} comments={comments} />
                    <Like id={postId}/> 
                </section>

                <section className={styles.comments}>
                    <section>
                        {renderComments(comments)}
                    </section>
                </section>

                <section className={styles['create-comments']}>
                    <Avatar {...author} />

                    <form onSubmit={handleSubmit}>
                        <textarea type="text" placeholder="Write a comment..." onChange={(e) => setCreateComment(e.target.value)} />
                        <button type="submit" className="button">Send</button>
                    </form>
                </section>
            </section>
        </section >
    )
}

export default OpenedModal;