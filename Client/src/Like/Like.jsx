import React, { useContext } from 'react';
import { UserContext } from '../App/App';
import postService from '../services/postService';
import styles from './like.module.scss';

function Like({ id, likes, posts, setPosts }) {
    const { username } = useContext(UserContext);
    debugger;
    let isLiked = likes.filter(like => like.username === username || like === username);

    const handleLike = () => {
        postService.addLike(id)
            .then(res => {
                posts.map(post => {
                    if (post._id === id) {
                        post.likes.push(username);
                    }
                })

                setPosts([...posts])
            });
    }

    const handleDislike = () => {
        postService.removeLike(id)
            .then(res => {
                posts.map(post => {
                    if (post._id === id) {
                        post.likes = post.likes.filter(like => like.username !== username && like !== username);
                    }
                });

                setPosts([...posts])
            });
    }

    return (
        <button className={isLiked.length > 0 ? styles['dislike-button'] : styles['like-button']} onClick={isLiked.length > 0 ? handleDislike : handleLike}>
            <i className="fas fa-heart"></i>
        </button>
    )
}

export default Like;