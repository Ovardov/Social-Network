import React from 'react';
import Avatar from '../../Avatar/Avatar';
import AddFriend from '../../AddFriend/AddFriend';
import styles from './suggested-list.module.scss'

function renderUsers(users) {
    return users.map(user => {
        return (<li>
            <Avatar username={user.username} name={user.name} profilePicture={user.profilePicture} />
            <span className={styles.info}>
                <span className={styles.name}>{user.name}</span>
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