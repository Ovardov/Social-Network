import React from 'react';
import {Link} from 'react-router-dom';
import SiteTitle from '../SiteTitle/SiteTitle';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';
import Avatar from '../Avatar/Avatar';
import styles from './header.module.scss';

function Header() {
    return (
        <header className={styles['site-header']}>
            <SiteTitle />
            <Search />
            <Navigation />
            <div className={styles['user-info']}>
                <Avatar name="Sean Doran" image="https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg" />
               
                <div className={styles.description}>
                    <Link to="/profile/1" className={styles.name}>Sean Doran</Link>
                    <Link to="/profile/1" className={styles['view-profile']}>View your profile</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;