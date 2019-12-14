import React, { useState, useContext } from 'react';
import { UserContext } from '../../App/App';
import Avatar from '../../Avatar/Avatar';
import styles from './action-comment.module.scss';
import commentService from '../../../services/commentService';

function ActionComment({ id, action, oldValue, setIsEditing, posts, setPosts }) {
    const [newComment, setNewComment] = useState(oldValue || '');
    const { username, name, profilePicture } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            description: newComment
        }

        if (action === 'create') {
            commentService.addComment(id, data)
                .then(createdComment => {
                    if (createdComment.hasOwnProperty('_id')) {
                        const allPosts = posts.map(post => {
                            if (post._id === id) {
                                post.comments.push(createdComment);
                            }

                            return { ...post };
                        });

                        setPosts(allPosts);
                        setNewComment('');
                    }
                });

        } else if (action === 'edit') {
            commentService.editComment(id, data)
                .then(res => {
                    if (res === 'Updated Successfully') {
                        setIsEditing(false);

                        const allPosts = posts.map(post => {
                            const updatedComments = post.comments.map(comment => comment._id === id ? { ...comment, description: newComment } : comment);
                            return { ...post, comments: updatedComments };
                        });

                        setPosts(allPosts);
                    }
                });
        }
    }

    return (
        <section className={styles['comments']}>
            <Avatar username={username} name={name} profilePicture={profilePicture} />

            <form onSubmit={handleSubmit}>
                <textarea type="text" value={newComment} placeholder={action === 'create' ? 'Write a comment...' : ''} onChange={(e) => setNewComment(e.target.value)} />
                <button type="submit" className="button">Send</button>
            </form>
        </section>
    )
}

export default ActionComment;