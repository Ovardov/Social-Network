import React from 'react';
import styles from './last-friends.module.scss';
import FriendList from '../Friend/FriendList/FriendList';

function LastFriends({ friends }) {
    const lastNineFriends = friends.slice(0, 9);

    return (
        <section className={styles.container}>
            <p>Last 9 Friends</p>

            <FriendList friends={lastNineFriends} lastFriends={true} />
        </section>
    )
}

export default LastFriends;