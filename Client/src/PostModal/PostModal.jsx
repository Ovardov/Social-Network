import React, { useState, useEffect, Fragment } from 'react';
import postService from '../services/postService';
import ClosedModal from './ClosedModal';
import OpenedModal from './OpenedModal';
import styles from './post-modal.module.scss';

function PostModal({ id }) {
    const [post, setPost] = useState({});
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        postService.loadPosts(id)
            .then(post => {
                setPost(post[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <Fragment>
            {isOpened === true
                ? <OpenedModal {...post} setIsOpened={setIsOpened}/>
                : <ClosedModal image={post.image} description={post.description} setIsOpened={setIsOpened}/>
            }
        </Fragment>
    )
}

export default PostModal;