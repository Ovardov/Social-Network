import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';
import AddFriend from '../../AddFriend/AddFriend';
import styles from './suggested-list.module.scss'

function renderUsers(users) {
    return users.map(user => {
        return (<li>
            <Avatar username={user.username} name={user.name} profilePicture={user.profilePicture} />
            <span className={styles.info}>
                <Link className={styles.name} to={`/profile/${user.username}`}>{user.name}</Link>
                <span className={styles.home}>{user.home}</span>
            </span>
            <AddFriend id={user._id} />
        </li>
        )
    })
}

function SuggestedList({ users }) {
    return (
        <ul className={styles.list}>
            {renderUsers(users)}
        </ul>
    )
}

export default SuggestedList;