import React from 'react';
import FriendCard from '../FriendCard/FriendCard';
import styles from './friend-list.module.scss';

function renderPosts(friends, lastFriends) {
    return friends.map(friend => {
        return (<FriendCard key={friend._id} {...friend} lastFriends={lastFriends}/>);
    });
}

function FriendList({ friends, lastFriends }) {
    return (
        <div className={styles['friends-container']}>
            {renderPosts(friends, lastFriends)}
        </div>
    )
}

export default FriendList;