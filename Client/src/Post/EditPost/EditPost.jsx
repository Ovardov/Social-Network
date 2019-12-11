import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import styles from './edit-post.module.scss';
import postService from '../../services/postService';

function EditPost({ postId, oldValue, author, setIsEditing, props }) {
    const [description, setDescription] = useState(oldValue);


    const submitPost = (e) => {
        e.preventDefault();

        const data = {
            description
        }

        postService.editPost(postId, data)
            .then(() => {
                setIsEditing(false);
                props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitPost}>
                <p>
                    <Avatar username={author.username} name={author.name} profilePicture={author.profilePicture} />

                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                </p>

                <p>
                    <input type="submit" value="EDIT" />
                </p>
            </form>
        </div>
    )
}

export default EditPost;