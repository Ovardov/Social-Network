import React, { useState, useContext } from 'react';
import {UserContext} from '../../App/App';
import Avatar from '../../Avatar/Avatar';
import postService from '../../../services/postService';
import cloudinaryService from '../../../services/cloudinaryService';
import styles from './create-post.module.scss';

function CreatePost({props}) {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const isDisabled = description.length === 0 && file === null;

    const {username, name, profilePicture} = useContext(UserContext);

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
                image: imageUrl,
            }

            postService.addPost(data)
                .then((res) => {
                    if(res === 'Created Successfully') {
                        props.history.push(`/profile/${username}`);
                    }
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
                    <Avatar username={username} name={name} profilePicture={profilePicture} />

                    <textarea placeholder="Share what you are thinking here..." onChange={(e) => setDescription(e.target.value)}></textarea>
                </p>

                <p>
                    <label className={styles['photo-container']} htmlFor="file-uploader">
                        <i className="fas fa-image"></i>

                        <input id="file-uploader" type="file" onChange={(e) => setFile(e.target.files[0])} />

                        <span className={styles.ready}>
                            {file && file.name}
                            {file && <i className="fas fa-check-circle"></i>}
                        </span>
                    </label>

                    <input type="submit" disabled={isDisabled} value="POST" />
                </p>
            </form>
        </div>
    )
}

export default CreatePost;