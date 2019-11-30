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
                <Avatar name="Sean Doran" profilePicture="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1575099159/tjtegxh6a0adt5rwea9u.png" />
               
                <div className={styles.description}>
                    <Link to="/profile/1" className={styles.name}>Sean Doran</Link>
                    <Link to="/profile/1" className={styles['view-profile']}>View your profile</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;