import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';
import styles from './post-card.module.scss';
import PostModal from '../../PostModal/PostModal';
import Like from '../../Like/Like';
import SocialAnalytics from '../../SocialAnalytics/SocialAnalytics';


class PostCard extends Component {
    render() {
        const { _id, date, author, description, image, likes, comments } = this.props;

        return (
            <section className={styles.container}>
                <header className={styles['user-container']}>
                    <Avatar {...author} />
                    <div className={styles['user-info']}>
                        <Link to={`/profile/${author.username}`}>{author.name}</Link>
                        <span>{date}</span>
                    </div>

                    <div className={styles['more-info-container']}>
                        <i className="fas fa-ellipsis-v more-info"></i>
                    </div>
                </header>

                <main className={styles['post-container']}>
                    <section className={styles.description}>{description}</section>

                    <PostModal {...this.props}/>

                    <section className={styles['action-buttons']}>
                       <Like id={_id}/>

                        <a className={styles.button} >
                            <i className="fas fa-comment"></i>
                        </a>
                    </section>
                </main>

                <footer>
                    <SocialAnalytics likes={likes} comments={comments}/>
                </footer>
            </section>
        )
    }
}

export default PostCard;