import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import AddFriend from '../AddFriend/AddFriend';
import styles from './user-info.module.scss';

function UserInfo({ user, date }) {
    return (
        <section className={styles.container}>
            <Avatar username={user.username} name={user.name} profilePicture={user.profilePicture} />
            <span className={styles.info}>
                <Link className={styles.name} to={`/profile/${user.username}`}>{user.name}</Link>
                {date
                    ? <span className={styles['sub-info']}>{date}</span>
                    : <span className={styles['sub-info']}>{user.home}</span>
                }
            </span>
            <AddFriend id={user._id} />
        </section>
    )
}

export default UserInfo;