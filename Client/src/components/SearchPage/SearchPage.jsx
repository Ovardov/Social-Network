import React, { useContext } from 'react';
import { UserContext } from '../App/App';
import Avatar from '../Avatar/Avatar';
import styles from './search-page.module.scss';
import FriendStatus from '../FriendStatus/FriendStatus';

function renderUsers(users, loggedUser, props) {
    return users.map(user => {
        let isFriends = user && user.friends ? user.friends.map(friend => friend.username === loggedUser) : false;
        isFriends = isFriends !== false ? isFriends.includes(true) : false;

        return <div key={user._id} className={styles['user-container']}>
            <Avatar username={user.username} name={user.name} profilePicture={user.profilePicture} />

            <div className={styles['user-info']}>
                <p className={styles.name}>{user.name}</p>
               {user.home && <p className={styles.home}>Lives in {user.home}</p>}
               {user.work && <p className={styles.work}>Works at {user.work}</p>}
            </div>

            {user.username !== loggedUser && <FriendStatus props={props} id={user._id} isFriends={isFriends} />}
        </div>
    })
}

function SearchPage(props) {
    const { users } = props.history.location.state;
    const { username } = useContext(UserContext);

    return (
        <div className={styles.container}>
            <div className={styles['user-list']}>
                {users.length !== 0 ? renderUsers(users, username, props) : <p className={styles['no-users']}>No users found</p>}
            </div>
        </div>
    )
}

export default SearchPage;