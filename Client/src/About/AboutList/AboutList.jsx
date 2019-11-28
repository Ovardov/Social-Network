import React from 'react';
import styles from './about-list.module.scss';


function AboutList() {
    return (
        <ul className={styles.container}>
            <li className={styles.work}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-briefcase"></i>
                </span>
                <span>Works at Google</span>
                <span className={styles['edit-container']}>
                    <i class="fas fa-edit"></i>
                </span>
            </li>
            <li className={styles.education}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-graduation-cap"></i>
                </span>
                <span>Studied at SoftUni</span>
                <span className={styles['edit-container']}>
                    <i class="fas fa-edit"></i>
                </span>
            </li>
            <li className={styles.home}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-home"></i>
                </span>
                <span>Lives in New York</span>
                <span className={styles['edit-container']}>
                    <i class="fas fa-edit"></i>
                </span>
            </li>
            <li className={styles['life-events']}>
                <span className={styles['icon-container']}>
                    <i class="fas fa-heart"></i>
                </span>
                <span>Married to Ani Kerozova</span>
                <span className={styles['edit-container']}>
                    <i class="fas fa-edit"></i>
                </span>
            </li>
        </ul>
    )
}

export default AboutList;