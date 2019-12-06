import React from 'react';
import styles from './about-list.module.scss';


function AboutList({ userInfo, setUserInfo }) {
    return (
        <section className={styles.container}>
            <section className={styles.work}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-briefcase"></i>
                </span>

                {userInfo.work && <span>Works at {userInfo.work}</span>}

                {!userInfo.work && <input placeholder="Add a workplace" onBlur={e => setUserInfo({ ...userInfo, work: e.target.value })}></input>}

                <span className={styles['action-container']}>
                    {userInfo.work ? <i class="fas fa-edit"></i> : <i class="fas fa-plus"></i>}
                </span>
            </section>

            <section className={styles.education}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-graduation-cap"></i>
                </span>

                {userInfo.education
                    ? <span>Studied at {userInfo.education}</span>
                    : <input placeholder="Add a school" onChange={e => setUserInfo({ ...userInfo, education: e.target.value })}></input>
                }

                <span className={styles['action-container']}>
                    {userInfo.education ? <i class="fas fa-edit"></i> : <i class="fas fa-plus"></i>}
                </span>
            </section>

            <section className={styles.home}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-home"></i>
                </span>

                {userInfo.home
                    ? <span>Lives in {userInfo.home}</span>
                    : <input placeholder="Add your current city" onBlur={e => setUserInfo({ ...userInfo, home: e.target.value })}></input>
                }

                <span className={styles['action-container']}>
                    {userInfo.home ? <i class="fas fa-edit"></i> : <i class="fas fa-plus"></i>}
                </span>
            </section>

            <section className={styles['sectionfe-events']}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-heart"></i>
                </span>

                {userInfo.relationshipStatus
                    ? <span>{userInfo.relationshipStatus}</span>
                    : <input placeholder="Relationship Status" onBlur={e => setUserInfo({ ...userInfo, relationshipStatus: e.target.value })}></input>
                }

                <span className={styles['action-container']}>
                    {userInfo.relationshipStatus ? <i class="fas fa-edit"></i> : <i class="fas fa-plus"></i>}
                </span>
            </section>
        </section>
    )
}

export default AboutList;