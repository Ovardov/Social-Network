import React from 'react';
import AboutList from '../AboutList/AboutList';
import styles from './about-page.module.scss';

function AboutPage({ user, setShowContentPage }) {
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
                <AboutList user={user} setShowContentPage={setShowContentPage} />
            </section>

            <section className={styles['right-column']}>
                <div className={styles.description}>
                    <h4>About Me</h4>
                    <p>{user.about ? `${user.about}` : 'Add bio'}</p>

                    <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                        {user.about ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                    </button>
                </div>
            </section>
        </div>
    )
}

export default AboutPage;