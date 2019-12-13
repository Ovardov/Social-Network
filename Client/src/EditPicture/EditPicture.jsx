import React, { Fragment, useState } from 'react';
import userService from '../services/userService';
import cloudinaryService from '../services/cloudinaryService';
import styles from './edit-picture.module.scss';


function ProfilePicture({handleChange, setField}) {
    return (
        <label className={styles.container} htmlFor="profile-picture-uploader">
            <i className="fas fa-plus"></i>
            <input id="profile-picture-uploader" type="file" onChange={(e) => handleChange(e.target.files[0])} onClick={() => setField('profilePicture')} />
        </label>
    )
}

function CoverPicture({handleChange, setField}) {
    return (
        <label className={`${styles.container} ${styles.cover}`} htmlFor="cover-picture-uploader">
            <i className="fas fa-camera"></i>
            <input id="cover-picture-uploader" type="file" onChange={(e) => handleChange(e.target.files[0])} onClick={() => setField('coverPicture')} />
        </label>
    )
}

function EditPicture({ action, user, setUser }) {
    const [field, setField] = useState('');

    const handleChange = async (file) => {

        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'accfphta');

        try {
            const res = await cloudinaryService.uploadImage(formData);
            const imageUrl = res['secure_url'];

            const data = {
                username: user.username,
                [field]: imageUrl
            }

           await userService.update(data);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            {action === 'profilePicture' && <ProfilePicture handleChange={handleChange} setField={setField} />}
            {action === 'coverPicture' && <CoverPicture handleChange={handleChange} setField={setField} />}
        </Fragment>
    )
}

export default EditPicture;

