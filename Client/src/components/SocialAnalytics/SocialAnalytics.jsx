import React from 'react';
import styles from './social-analystics.module.scss'

function SocialAnalytics({likes, comments}) {
    return (
        <section className={styles['social-container']}>
            <div className={styles.like}>
                <i className="far fa-heart"></i>
                {likes.length}
            </div>

            <div className={styles.comment}>
                <i className="far fa-comment"></i>
                {comments.length}
            </div>
        </section>
    )
}

export default SocialAnalytics;