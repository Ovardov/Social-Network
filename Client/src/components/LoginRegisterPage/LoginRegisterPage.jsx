import React from 'react';
import Login from './Forms/Login/Login';
import Register from './Forms/Register/Register';
import styles from './login-register-page.module.scss';

function LoginRegisterPage(props) {
    const { pathname } = props.location;

    return (
        <section className={styles.container}>
            <section className={styles.content}>
                <div className={styles.description}>
                    <h1 className={styles.message}>Welcome to the Social Network!</h1>
                </div>

                <section className={styles.form}>
                    {pathname === '/login' && <Login {...props} />}
                    {pathname === '/register' && <Register {...props} />}
                </section>
            </section>
        </section>
    )
}

export default LoginRegisterPage;

