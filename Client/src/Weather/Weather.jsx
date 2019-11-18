import React from 'react';
import Search from '../Search/Search';
import styles from './weather.module.scss';

function Weather() {
    return (
        <div className={styles.container}>
            <section className={styles.search}>
                <Search />
            </section>

            <section className={styles.information}>
                <p className={styles.icon}>
                    <i className="far fa-sun"></i>
                    {/* Sunny */}
                </p>
                <p className={styles.temperature}>20 &#8451;</p>
                <p className={styles.date}>Monday, 18 November 2019</p>
                <p className={styles.location}>
                    <i className="fas fa-map-marker-alt"></i>
                    Los Angeles
                </p>
            </section>
        </div>
    )
}

export default Weather;