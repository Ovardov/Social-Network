import React from 'react';
import AboutList from '../AboutList/AboutList';
import styles from './about-page.module.scss';

function AboutPage() {
    return (
        <div className={styles.container}>
            <section className={styles['left-column']}>
               <AboutList />
            </section>

            <section className={styles['right-column']}>
                <div className={styles.description}>
                    <h4>About Me</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime voluptas earum asperiores nisi, saepe, sunt corporis illo soluta consequatur rerum odio quas minus recusandae sapiente nihil repudiandae mollitia alias quam?Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis maiores vitae tenetur suscipit tempora distinctio modi similique placeat officiis, aliquam beatae dolore esse nulla, qui fuga repellendus quos, neque officia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui optio at porro, excepturi ad, dignissimos itaque aliquam voluptas recusandae nemo praesentium! Temporibus sequi sunt quos impedit natus amet magnam illo?</p>
                </div>
            </section>
        </div>
    )
}

export default AboutPage;