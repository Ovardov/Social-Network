import React, { Component, Fragment } from 'react';
import { FaHeart, FaComment, FaRegHeart, FaRegComment } from 'react-icons/fa';
import Avatar from '../../Avatar/Avatar';
import styles from './post-card.module.scss';


class PostCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { date, author, description, image, likes, comments } = this.props;

        return (
            <section className={styles.container}>
                <header className={styles['user-container']}>
                    <Avatar {...author} />
                    <div className={styles['user-info']}>
                        <a>{author.name}</a>
                        <span>{date}</span>
                    </div>

                    <div className={styles['more-info-container']}>
                        <i class="fas fa-ellipsis-v more-info"></i>
                    </div>
                </header>

                <main className={styles['post-container']}>
                    <section className={styles.description}>{description}</section>

                    <section className={styles['image-container']}>
                        <a href={image}>
                            <img src={image} alt={description} />
                        </a>
                    </section>

                    <section className={styles['action-buttons']}>
                        <a className={styles.button} >
                            <i class="fas fa-heart"></i>
                        </a>

                        <a className={styles.button} >
                            <i class="fas fa-comment"></i>
                        </a>
                    </section>
                </main>

                <footer>
                    <section className={styles['social-container']}>
                        <a href="#" className={styles['like']}>
                            <i class="far fa-heart"></i>
                            {likes.length}
                        </a>

                        <a href="#" className={styles['comment']}>
                            <i class="far fa-comment"></i>
                            {comments.length}
                        </a>
                    </section>
                </footer>
            </section>
        )
    }
}

export default PostCard;