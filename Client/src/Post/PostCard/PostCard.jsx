import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App/App';
import EditPost from '../EditPost/EditPost';
import Avatar from '../../Avatar/Avatar';
import PostModal from '../../PostModal/PostModal';
import Like from '../../Like/Like';
import SocialAnalytics from '../../SocialAnalytics/SocialAnalytics';
import styles from './post-card.module.scss';


function PostCard(props) {
    const { _id, date, author, description, image, likes, comments, handlePostDelete, setPosts, posts } = props;

    const { username } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);

    const hoursWithMinutes = new Date(date).toLocaleTimeString();
    const day = new Date(date).toDateString();
    const formattedDate = `${hoursWithMinutes} - ${day}`;

    return (
        <Fragment>
            {isEditing === true && <EditPost postId={_id} oldValue={description} author={author} posts={posts} setPosts={setPosts} setIsEditing={setIsEditing} props={props} />}
            {isEditing === false && (
                <section className={styles.container}>
                    <header className={styles['user-container']}>
                        <Avatar {...author} />
                        <div className={styles['user-info']}>
                            <Link to={`/profile/${author.username}`}>{author.name}</Link>
                            <span>{formattedDate}</span>
                        </div>

                        {username === author.username && (
                            <div className={styles['action-buttons']}>
                                <button className="button" onClick={() => setIsEditing(true)}><i className="fas fa-edit"></i></button>
                                <button className="button" onClick={() => handlePostDelete(_id)}><i className="fas fa-trash"></i></button>
                            </div>
                        )}
                    </header>

                    <main className={styles['post-container']}>
                        <section className={styles.description}>{description}</section>

                        {image && <PostModal {...props} />}

                        <section className={styles['action-buttons']}>
                            <Like id={_id} likes={likes} posts={posts} setPosts={setPosts} />

                        </section>
                    </main>

                    <footer>
                        <SocialAnalytics likes={likes} comments={comments} />
                    </footer>
                </section>
            )}
        </Fragment>
    )
}

export default PostCard;