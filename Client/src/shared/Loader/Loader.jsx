import React from 'react';
import { FadeLoader } from 'react-spinners';
import styles from './loader.module.scss'

function Loader({isLoading}) {
    return (
        <div className={styles.loader}>
            <FadeLoader size={160} color={"#4080FF"} loading={isLoading} />
        </div>
    )
}

export default Loader;