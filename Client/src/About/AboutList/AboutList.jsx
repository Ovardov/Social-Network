import React from 'react';
import styles from './about-list.module.scss';


function AboutList({ userInfo, setShowContentPage }) {
    return (
        <section className={styles.container}>
            <section className={styles.work}>
                <span className={styles['icon-container']}>
                    <i className="fas fa-briefcase"></i>
                </span>

                <span>{userInfo.work ? `Works at ${userInfo.work}` : 'Add a workplace' }</span>

                <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                    {userInfo.work ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                </button>
            </section>

            <section className={styles.education}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-graduation-cap"></i>
                </span>

                <span>{userInfo.education ? `Studied at ${userInfo.education}` : 'Add a school' }</span>

                <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                    {userInfo.education ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                </button>
            </section>

            <section className={styles.home}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-home"></i>
                </span>

                <span>{userInfo.home ? `Lives in ${userInfo.home}` : 'Add your current city' }</span>

                <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                    {userInfo.home ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                </button>
            </section>

            <section className={styles['sectionfe-events']}>
                <span className={styles['icon-container']}>
                    <i className="fas fa-heart"></i>
                </span>

                <span>{userInfo.relationshipStatus ? `${userInfo.relationshipStatus}` : 'Add your relationship status' }</span>

                <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                    {userInfo.relationshipStatus ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                </button>
            </section>
        </section>
    )
}

export default AboutList;