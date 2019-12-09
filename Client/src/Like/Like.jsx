import React from 'react';
import postService from '../services/postService';
import styles from './like.module.scss';

function Like({ id }) {

    const handleClick = () => {
        postService.addLike(id)
            .then(res => console.log(res));
    }

    return (
        <button className={styles['like-button']} onClick={handleClick}>
            <i className="fas fa-heart"></i>
        </button>
    )
}

export default Like;