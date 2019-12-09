import React from 'react';
import styles from './suggested-list.module.scss'
import UserInfo from '../../UserInfo/UserInfo';

function renderUsers(users) {
    return users.map(user => {
        return <li key={user._id}><UserInfo user={user}/></li>
    });
}

function SuggestedList({ users }) {
    return (
        <ul className={styles.list}>
            {renderUsers(users)}
        </ul>
    )
}

export default SuggestedList;