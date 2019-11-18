import React from 'react';
import Avatar from '../../Avatar/Avatar';
import styles from './create-post.module.scss';

function CreatePost() {
    return (
        <div className={styles.container}>
            <form action="#" method="POST">
                <p>
                    <Avatar name="Sean Doran" image="https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg" />

                    <textarea placeholder="Share what you are thinking here..."></textarea>
                </p>

                <p>
                    <a className={styles['photo-container']}>
                        <i className="fas fa-image"></i>
                    </a>

                    <input type="submit" value="POST" />
                </p>
            </form>
        </div>
    )
}

export default CreatePost;