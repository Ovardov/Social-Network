import React from 'react';
import { Link } from 'react-router-dom';
import styles from './public-home-page.module.scss';

function PublicHomePage() {
    return (
        <section className={styles.container}>
            <section className={styles.content}>
                <img src="home-page.svg" alt="Friends" />

                <section className={styles.info}>
                    <h1 className={styles.name}>Social Network</h1>

                    <section className={styles.buttons}>
                        <Link to='/register' className="button">Register</Link>
                        <Link to='/login' className="button">Login</Link>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default PublicHomePage;

