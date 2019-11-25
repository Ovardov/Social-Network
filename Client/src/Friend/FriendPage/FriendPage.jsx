import React, { Fragment } from 'react';
import FriendList from '../FriendList/FriendList';
import Search from '../../Search/Search';
import styles from './friend-page.module.scss';

function FriendPage({ friends }) {
    return (
        <Fragment>
            <div className={styles['search-container']}>
                <Search />
            </div>

            <FriendList friends={friends} />
        </Fragment>
    )
}

export default FriendPage;