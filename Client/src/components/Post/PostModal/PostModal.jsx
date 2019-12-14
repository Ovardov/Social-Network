import React, { Fragment } from 'react';
import ClosedModal from './ClosedModal';
import OpenedModal from './OpenedModal';

function PostModal(post) {
    const {isOpened, setIsOpened} = post;

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