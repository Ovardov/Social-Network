import React from 'react';
import styles from './notification.module.scss';

function renderErrors(errors) {
    return errors.map((error, index) => {
        return <p key={index} className={styles.message}>{error}</p>
    })
}

function Notification({errors}) {
    return (
        <div className={styles.container}>
            {errors && renderErrors(errors)}
        </div>
    )
}

export default Notification;