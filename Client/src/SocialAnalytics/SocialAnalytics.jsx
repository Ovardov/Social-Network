import React from 'react';
import styles from './social-analystics.module.scss'

function SocialAnalytics({likes, comments}) {
    return (
        <section className={styles['social-container']}>
            <a href="#" className={styles.like}>
                <i className="far fa-heart"></i>
                {likes.length}
            </a>

            <a href="#" className={styles.comment}>
                <i className="far fa-comment"></i>
                {comments.length}
            </a>
        </section>
    )
}

export default SocialAnalytics;