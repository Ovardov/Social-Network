import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import styles from './edit-post.module.scss';
import postService from '../../../services/postService';

function EditPost({ postId, oldValue, author, setIsEditing, props, setPosts, posts }) {
    const [newDescription, setNewDescription] = useState(oldValue);


    const submitPost = (e) => {
        e.preventDefault();

        const data = {
            description: newDescription
        }

        postService.editPost(postId, data)
            .then((res) => {
                if (res === 'Edited Successfully') {
                    const allPosts = posts.map(post => {
                        return post._id === postId ? post = {...post, description: newDescription} : post;
                    });

                    setIsEditing(false);
                    setPosts(allPosts)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitPost}>
                <p>
                    <Avatar username={author.username} name={author.name} profilePicture={author.profilePicture} />

                    <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                </p>

                <p>
                    <input type="submit" value="EDIT" />
                </p>
            </form>
        </div>
    )
}

export default EditPost;