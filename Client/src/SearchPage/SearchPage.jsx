import React from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './search-page.module.scss';
import AddFriend from '../AddFriend/AddFriend';

function renderUsers(users) {
    return users.map(user => {
        return <div className={styles['user-container']}>
            <Avatar name={user.name} profilePicture={user.profilePicture} />

            <div className={styles['user-info']}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.home}>Lives in New York</p>
                <p className={styles.work}>Works at Google</p>
            </div>

            <AddFriend id={user._id}/>
        </div>
    })
}

function SearchPage(props) {
    const { users } = props.history.location.state;

    return (
        <div className={styles.container}>
            <div className={styles['user-list']}>
                {users.length !== 0 ? renderUsers(users) : <p className={styles['no-users']}>No users found</p>}
            </div>
        </div>
    )
}

export default SearchPage;