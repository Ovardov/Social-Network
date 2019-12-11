import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import styles from './action-comment.module.scss';
import commentService from '../../services/commentService';

function ActionComment({ id, author, action, oldValue, setIsEditing }) {
    const [comment, setComment] = useState(oldValue || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            description: comment
        }

        if (action === 'create') {
            commentService.addComment(id, data)
                .then(res => console.log(res));
        } else if (action === 'edit') {
            commentService.editComment(id, data)
                .then(res => {
                    console.log(res)
                    setIsEditing(false);
            });
        }
    }

    return (
        <section className={styles['comments']}>
            <Avatar {...author} />

            <form onSubmit={handleSubmit}>
                {action === 'create' && <textarea type="text" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)} />}
                {action === 'edit' && <textarea type="text" value={comment} onChange={(e) => setComment(e.target.value)} />}
                <button type="submit" className="button">Send</button>
            </form>
        </section>
    )
}

export default ActionComment;