import React from 'react';
import FriendCard from '../FriendCard/FriendCard';
import styles from './friend-list.module.scss';

function renderPosts(friends) {
    return friends.map(friend => {
        return (<FriendCard key={friend._id} {...friend} />);
    });
}

function FriendList({ friends }) {
    return (
        <div className={styles['friends-container']}>
            {renderPosts(friends)}
        </div>
    )
}

export default FriendList;