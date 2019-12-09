import React, { Fragment } from 'react';
import userService from '../services/userService';

function FriendStatus({ id, isFriends }) {
    const handleAddFriend = () => {
        userService.addFriend(id)
            .then((res) => console.log(res))
            .catch(err => console.log(err))
    }

    const handleRemoveFriend = () => {
        userService.removeFriend(id)
            .then((res) => console.log(res))
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