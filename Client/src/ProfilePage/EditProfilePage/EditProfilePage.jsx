import React, {useState, useEffect} from 'react';
import userService from '../../services/userService';
import styles from './edit-profile-page.module.scss';

function EditProfilePage({userInfo, setUserInfo, props, setShowContentPage}) {   

    const handleSubmit = (e) => {
        e.preventDefault();

        userService.update(userInfo)
            .then(() => setShowContentPage('About'))
            .catch(err => console.log(err));
    }

    return (
        <section className={styles.container}>
            <form onSubmit={handleSubmit} >
                <p>
                    <label htmlFor="work">Work</label>
                    <input type="text" id="work" onChange={e => setUserInfo({...userInfo, work: e.target.value})} value={userInfo.work}/>
                    <i class="fas fa-briefcase"></i>
                </p>

                <p>
                    <label htmlFor="education">Education</label>
                    <input type="text" id="education" onChange={e => setUserInfo({...userInfo, education: e.target.value})} value={userInfo.education}/>
                    <i class="fas fa-graduation-cap"></i>
                </p>

                <p>
                    <label htmlFor="home">Current City</label>
                    <input type="text" id="home" onChange={e => setUserInfo({...userInfo, home: e.target.value})} value={userInfo.home}/>
                    <i class="fas fa-home"></i>
                </p>

                <p>
                    <label htmlFor="relationship-status">Relationship Status</label>
                    <input type="text" id="relationship-status" onChange={e => setUserInfo({...userInfo, relationshipStatus: e.target.value})} value={userInfo.relationshipStatus}/>
                    <i class="fas fa-heart"></i>
                </p>

                <p>
                    <label htmlFor="bio">Bio</label>
                    <textarea type="text" id="bio" onChange={e => setUserInfo({...userInfo, about: e.target.value})}>{userInfo.about}</textarea>
                </p>

                <input type="submit"/>
            </form>
        </section>
    )
}

export default EditProfilePage;