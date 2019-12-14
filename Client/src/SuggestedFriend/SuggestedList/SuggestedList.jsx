import React from 'react';
import styles from './suggested-list.module.scss'
import UserInfo from '../../UserInfo/UserInfo';

function renderUsers(users, props) {
    return users.map(user => {
        return <li key={user._id}><UserInfo props={props} user={user}/></li>
    });
}

function SuggestedList({ users, props }) {
    return (
        <ul className={styles.list}>
            {renderUsers(users, props)}
        </ul>
    )
}

export default SuggestedList;