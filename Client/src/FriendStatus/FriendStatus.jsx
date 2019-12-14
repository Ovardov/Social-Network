import React, { Fragment, useContext } from 'react';
import userService from '../services/userService';
import { UserContext } from '../App/App';

function FriendStatus({ id, isFriends, props }) {
    const {username} =  useContext(UserContext);

    const handleAddFriend = () => {
        userService.addFriend(id)
            .then((res) => {
                if(res === 'Added Successfully') {
                    props.history.push({pathname: `/profile/${username}`, state: {showContentPage: 'Friends'}});
                }
            })
            .catch(err => console.log(err))
    }

    const handleRemoveFriend = () => {
        userService.removeFriend(id)
            .then((res) => {
                if(res === 'Removed Successfully') {
                    props.history.push({pathname: `/profile/${username}`, state: {showContentPage: 'Friends'}});
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Fragment>
            {isFriends === true
                ? <button className="button add-friend" onClick={handleRemoveFriend}>
                    <i className="fas fa-user-plus"></i>
                    Remove Friend
                  </button>

                : <button className="button add-friend" onClick={handleAddFriend}>
                    <i className="fas fa-user-plus"></i>
                    Add Friend
                  </button>
            }
        </Fragment>
    )
}

export default FriendStatus;