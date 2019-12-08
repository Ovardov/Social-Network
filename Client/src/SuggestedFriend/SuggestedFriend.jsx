import React, { useState, useEffect, useContext } from 'react';
import SuggestedList from './SuggestedList/SuggestedList';
import userService from '../services/userService';
import styles from './suggested-friend.module.scss';
import { UserContext } from '../App/App';

function SuggestedFriend() {
    const [users, setUsers] = useState([]);
    const { username } = useContext(UserContext);
    
    useEffect(() => {
        const limit = 3;
        const expectUsername = username;
        
        userService.loadUser(null, null, limit, expectUsername)
            .then(res => {
                setUsers(res);
            })
            .catch(err => {
                console.log(err);
            })
    }, [username]);

    return (
        <div className={styles.container}>
            <p>Suggested Friends</p>
            <SuggestedList users={users} />
        </div>
    )
}

export default SuggestedFriend;