import React, {useState, useEffect} from 'react';
import AboutList from '../AboutList/AboutList';
import styles from './about-page.module.scss';

function AboutPage({userInfo, setUserInfo}) {   
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
               <AboutList userInfo={userInfo} setUserInfo={setUserInfo}/>
            </section>

            <section className={styles['right-column']}>
                <div className={styles.description}>
                    <h4>About Me</h4>
                    {userInfo.about && <p>{userInfo.about}</p>}
                    {!userInfo.about && <input placeholder="Add bio" onBlur={e => setUserInfo({ ...userInfo, about: e.target.value })}></input>}
                </div>
            </section>
        </div>
    )
}

export default AboutPage;