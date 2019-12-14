import React, { useState, useContext } from 'react';
import { UserContext } from '../../App/App';
import Avatar from '../../Avatar/Avatar';
import styles from './action-comment.module.scss';
import commentService from '../../services/commentService';

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
                .then(updatedPost => {

                    debugger;
                    const allPosts = posts.map(post => post._id === updatedPost._id ? updatedPost : post);
                    setPosts(allPosts);
                });

        } else if (action === 'edit') {
            commentService.editComment(id, data)
                .then(res => {
                    if (res === 'Updated Successfully') {
                        setIsEditing(false);
                        
                        const allPosts = posts.map(post => {
                            const updatedComments = post.comments.map(comment => comment._id === id ? {...comment, description: newComment} : comment);
                            return {...post, comments: updatedComments};
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
                {action === 'create' && <textarea type="text" placeholder="Write a comment..." onChange={(e) => setNewComment(e.target.value)} />}
                {action === 'edit' && <textarea type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />}
                <button type="submit" className="button">Send</button>
            </form>
        </section>
    )
}

export default ActionComment;