import React from 'react';
import userService from '../../services/userService';
import styles from './edit-profile-page.module.scss';

function EditProfilePage({user, setUser, setShowContentPage}) {   

    const handleSubmit = (e) => {
        e.preventDefault();

        userService.update(user)
            .then(() => setShowContentPage('About'))
            .catch(err => console.log(err));
    }

    return (
        <section className={styles.container}>
            <form onSubmit={handleSubmit} >
                <p>
                    <label htmlFor="work">Work</label>
                    <input type="text" id="work" onChange={e => setUser({...user, work: e.target.value})} value={user.work}/>
                    <i class="fas fa-briefcase"></i>
                </p>

                <p>
                    <label htmlFor="education">Education</label>
                    <input type="text" id="education" onChange={e => setUser({...user, education: e.target.value})} value={user.education}/>
                    <i class="fas fa-graduation-cap"></i>
                </p>

                <p>
                    <label htmlFor="home">Current City</label>
                    <input type="text" id="home" onChange={e => setUser({...user, home: e.target.value})} value={user.home}/>
                    <i class="fas fa-home"></i>
                </p>

                <p>
                    <label htmlFor="relationship-status">Relationship Status</label>
                    <input type="text" id="relationship-status" onChange={e => setUser({...user, relationshipStatus: e.target.value})} value={user.relationshipStatus}/>
                    <i class="fas fa-heart"></i>
                </p>

                <p>
                    <label htmlFor="bio">Bio</label>
                    <textarea type="text" id="bio" onChange={e => setUser({...user, about: e.target.value})}>{user.about}</textarea>
                </p>

                <input type="submit"/>
            </form>
        </section>
    )
}

export default EditProfilePage;