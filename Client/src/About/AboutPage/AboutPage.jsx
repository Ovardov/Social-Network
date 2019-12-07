import React from 'react';
import AboutList from '../AboutList/AboutList';
import styles from './about-page.module.scss';

function AboutPage({ userInfo, setShowContentPage }) {
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
                <AboutList userInfo={userInfo} setShowContentPage={setShowContentPage} />
            </section>

            <section className={styles['right-column']}>
                <div className={styles.description}>
                    <h4>About Me</h4>
                    <p>{userInfo.about ? `${userInfo.about}` : 'Add bio'}</p>

                    <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                        {userInfo.about ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                    </button>
                </div>
            </section>
        </div>
    )
}

export default AboutPage;