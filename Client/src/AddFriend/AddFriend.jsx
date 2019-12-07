import React from 'react';
import userService from '../services/userService';

function AddFriend(id) {

    const handleClick = () => {
        userService.addFriend(id)
            .then((res) => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <button className="button add-friend" onClick={handleClick}>
            <i class="fas fa-user-plus"></i>
            Add Friend
        </button>
    )
}

export default AddFriend;