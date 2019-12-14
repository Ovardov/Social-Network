import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.scss';

function NotFound() {
    return (
        <section className={styles.container}>

            <div className={styles.info}>
                <h2>404 - Page Not Found</h2>
                <Link className="button" to="/">Go to Homepage</Link>
            </div>

            <img src="https://res.cloudinary.com/dxxq5xtsy/image/upload/v1576342536/o7hfrt963jvu4oqzdbov.png" alt="404" />
        </section>
    )
}

export default NotFound;