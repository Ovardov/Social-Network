import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { UserContext } from '../App/App';
import SiteTitle from '../SiteTitle/SiteTitle';
import Search from '../Search/Search';
import Avatar from '../Avatar/Avatar';
import userService from '../services/userService';
import styles from './header.module.scss';
import Loader from '../shared/Loader/Loader';

function Header(props) {
    const [searchName, setSearchName] = useState('');
    const [users, setUsers] = useState([]);
    const { username, name, profilePicture } = useContext(UserContext);

    useEffect(() => {
        userService.loadUser(null, searchName)
            .then(users => {
                setUsers(users);
            }).catch(err => {
                console.log(err);
            })

    }, [searchName]);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.history.push('/search', { users });
    }

    return (
        <header className={styles['site-header']}>
            <SiteTitle />
            <Search submit={handleSubmit} changeSet={setSearchName}/>
            <div className={styles['user-info']}>
                <Avatar username={username} name={name} profilePicture={profilePicture} />

                <div className={styles.description}>
                    <Link to={`/profile/${username}`} className={styles.name}>{name}</Link>
                    <Link to={`/profile/${username}`} className={styles['view-profile']}>View your profile</Link>
                </div>
            </div>
        </header>
    )
}

export default withRouter(Header);