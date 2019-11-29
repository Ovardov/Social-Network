import React, { useState } from 'react';
import Avatar from '../../Avatar/Avatar';
import postService from '../../services/postService';
import cloudinaryService from '../../services/cloudinaryService';
import styles from './create-post.module.scss';

function CreatePost() {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const submitPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'accfphta');

        try {
            const res = await cloudinaryService.uploadImage(formData);

            const imageUrl = res['secure_url'];

            const data = {
                description,
                image: imageUrl
            }

            postService.addPost(data)
                .then(() => {
                    alert('Added successfully');
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitPost}>
                <p>
                    <Avatar name="Sean Doran" image="https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg" />

                    <textarea placeholder="Share what you are thinking here..." onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                </p>

                <p>
                    <label className={styles['photo-container']} htmlFor="file-uploader">
                        <i className="fas fa-image"></i>
                        
                        <input id="file-uploader" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </label>

                    <input type="submit" value="POST" onClick={submitPost} />
                </p>
            </form>
        </div>
    )
}

export default CreatePost;