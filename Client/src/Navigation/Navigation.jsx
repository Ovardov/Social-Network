import React from 'react';
import styles from './navigation.module.scss';

function Navigation() {
    return (
        <nav className={styles['site-navigation']}>
            <ul className={styles['notification-list']}>
                <li className={styles['notification-button']}>
                    <a href="/"><i className="fas fa-bell"></i></a>
                </li>
                <li className={styles['notification-button']}>
                    <a href="/"><i className="fas fa-comment-dots"></i></a>
                </li>
                <li className={styles['notification-button']}>
                    <a href="/"><i className="fas fa-user-friends"></i></a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;