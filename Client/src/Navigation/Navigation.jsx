import React from 'react';
import styles from './navigation.module.scss';

function Navigation() {
    return (
        <nav className={styles['site-navigation']}>
            <ul className={styles['notification-list']}>
                <li className={styles['notification-button']}>
                    <a href="/"><i class="fas fa-bell"></i></a>
                </li>
                <li className={styles['notification-button']}>
                    <a href="/"><i class="fas fa-comment-dots"></i></a>
                </li>
                <li className={styles['notification-button']}>
                    <a href="/"><i class="fas fa-user-friends"></i></a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;