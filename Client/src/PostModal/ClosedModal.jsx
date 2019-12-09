import React from 'react';
import styles from './closed-modal.module.scss';

function ClosedModal({image, description, setIsOpened}) {
    return (
        <section className={styles['image-container']} onClick={() => setIsOpened(true)}>
            <a href={image}>
                <img src={image} alt={description} />
            </a>
        </section>
    )
}

export default ClosedModal;