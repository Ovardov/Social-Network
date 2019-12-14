import React, { Fragment, useState } from 'react';
import FriendList from '../FriendList/FriendList';
import Search from '../../Search/Search';
import styles from './friend-page.module.scss';

function FriendPage(props) {
    const allFriends = props.friends;

    const [searchName, setSearchName] = useState('');

    const filteredFriends = allFriends.filter(friend => friend.username.toLowerCase().includes(searchName.toLowerCase()));
  
    return (
        <Fragment>
            <div className={styles['search-container']}>
                <Search changeSet={setSearchName} withoutButton={true}/>
            </div>

            <FriendList friends={searchName === '' ? allFriends : filteredFriends} />
        </Fragment>
    )
}

export default FriendPage;