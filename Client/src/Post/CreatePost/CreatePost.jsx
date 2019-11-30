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
                    <Avatar name="Sean Doran" profilePicture="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1575099159/tjtegxh6a0adt5rwea9u.png" />

                    <textarea placeholder="Share what you are thinking here..." onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                </p>

                <p>
                    <label className={styles['photo-container']} htmlFor="file-uploader">
                        <i className="fas fa-image"></i>

                        <input id="file-uploader" type="file" onChange={(e) => setFile(e.target.files[0])} />

                        <span className={styles.ready}>
                            {file && file.name}
                            {file && <i class="fas fa-check-circle"></i>}
                        </span>
                    </label>


                    <input type="submit" value="POST" />
                </p>
            </form>
        </div>
    )
}

export default CreatePost;