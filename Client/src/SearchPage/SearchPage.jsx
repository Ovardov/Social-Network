import React, { useContext, UseState } from 'react';
import { UserContext } from '../App/App';
import Avatar from '../Avatar/Avatar';
import styles from './search-page.module.scss';
import FriendStatus from '../FriendStatus/FriendStatus';

function renderUsers(users, loggedUser) {
    return users.map(user => {
        const isFriends = user.friends ? user.friends.map(friend => friend.username === loggedUser)[0] : false;

        return <div key={user._id} className={styles['user-container']}>
            <Avatar username={user.username} name={user.name} profilePicture={user.profilePicture} />

            <div className={styles['user-info']}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.home}>Lives in New York</p>
                <p className={styles.work}>Works at Google</p>
            </div>

            {user.username !== loggedUser && <FriendStatus id={user._id} isFriends={isFriends} />}
        </div>
    })
}

function SearchPage(props) {
    const { users } = props.history.location.state;
    const { username } = useContext(UserContext);

    return (
        <div className={styles.container}>
            <div className={styles['user-list']}>
                {users.length !== 0 ? renderUsers(users, username) : <p className={styles['no-users']}>No users found</p>}
            </div>
        </div>
    )
}

export default SearchPage;