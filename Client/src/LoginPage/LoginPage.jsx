import React from 'react';
import Login from '../Forms/Login/Login';
import styles from './login-page.module.scss';

function LoginPage(props) {
    return (
        <section className={styles.container}>
            <section className={styles.content}>
                <div className={styles.description}>
                    <h1 className={styles.message}>Welcome to the Social Network!</h1>
                </div>

                <section className={styles.form}>
                    <Login {...props}/>
                </section>
            </section>
        </section>
    )
}

export default LoginPage;

