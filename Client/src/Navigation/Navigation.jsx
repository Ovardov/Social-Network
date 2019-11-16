import React from 'react';
import { MdNotifications, MdMessage, MdPeople } from 'react-icons/md';
import styles from './navigation.module.scss';

function Navigation() {
    return (
        <nav className={styles['site-navigation']}>
            <ul className={styles['notification-list']}>
                <li className={styles['notification-button']}>
                    <a href="/"><MdNotifications /></a>
                </li>
                <li className={styles['notification-button']}>
                    <a href="/"><MdMessage /></a>
                </li>
                <li className={styles['notification-button']}>
                    <a href="/"><MdPeople /></a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;