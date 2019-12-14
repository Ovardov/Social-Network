import React, { useState, useEffect } from 'react';
import SuggestedList from './SuggestedList/SuggestedList';
import userService from '../services/userService';
import styles from './suggested-friend.module.scss';
import Loader from '../shared/Loader/Loader';

function SuggestedFriend({ expectedFriends, props }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.loadSuggestedFriends(expectedFriends)
            .then(res => {
                setUsers(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [expectedFriends]);

    return (
        <div className={styles.container}>
            <p>Suggested Friends</p>
            {users && <SuggestedList props={props} users={users} />}
        </div>
    )
}

export default SuggestedFriend;