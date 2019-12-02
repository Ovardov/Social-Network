import React from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './search-page.module.scss';

function renderUsers(users) {
    return users.map(user => {
        return <div className={styles['user-container']}>
            <Avatar name={user.name} profilePicture={user.profilePicture} />

            <div className={styles['user-info']}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.home}>Lives in New York</p>
                <p className={styles.work}>Works at Google</p>
            </div>

            <button className="button">
                <i class="fas fa-user-plus"></i>
                Add Friend
            </button>
        </div>
    })
}

function UserList(users) {
    return (
        <div className={styles['user-list']}>
            {renderUsers(users)}
        </div>
    )
}

function SearchPage(props) {
    const { users } = props.history.location.state;

    return (
        <div className={styles.container}>
            {UserList(users)}
        </div>
    )
}

export default SearchPage;