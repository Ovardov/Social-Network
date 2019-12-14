import React, { useContext } from 'react';
import { UserContext } from '../../App/App';
import styles from './about-list.module.scss';


function AboutList({ user, setShowContentPage }) {
    const {username} = useContext(UserContext);

    return (
        <section className={styles.container}>
            <section className={styles.work}>
                <span className={styles['icon-container']}>
                    <i className="fas fa-briefcase"></i>
                </span>

                <span>{user.work ? `Works at ${user.work}` : 'Add a workplace'}</span>

                {username === user.username && (
                    <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                        {user.work ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                    </button>
                )}
            </section>

            <section className={styles.education}>
                <span className={styles['icon-container']}>
                    <i className="fas fa-graduation-cap"></i>
                </span>

                <span>{user.education ? `Studied at ${user.education}` : 'Add a school'}</span>

                {username === user.username && (
                    <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                        {user.education ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                    </button>
                )}
            </section>

            <section className={styles.home}>
                <span className={styles['icon-container']}>
                    <i className="fas fa-home"></i>
                </span>

                <span>{user.home ? `Lives in ${user.home}` : 'Add your current city'}</span>

                {username === user.username && (
                    <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                        {user.home ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                    </button>
                )}
            </section>

            <section className={styles['sectionfe-events']}>
                <span className={styles['icon-container']}>
                    <i className="fas fa-heart"></i>
                </span>

                <span>{user.relationshipStatus ? `${user.relationshipStatus}` : 'Add your relationship status'}</span>

                {username === user.username && (
                    <button className={styles['action-container']} onClick={() => setShowContentPage('Edit')}>
                        {user.relationshipStatus ? <i className="fas fa-edit"></i> : <i className="fas fa-plus"></i>}
                    </button>
                )}
            </section>
        </section>
    )
}

export default AboutList;