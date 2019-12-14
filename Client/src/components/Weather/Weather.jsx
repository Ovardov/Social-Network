import React, { useState, useEffect } from 'react';
import Search from '../Search/Search';
import weatherService from '../../services/weatherService';
import styles from './weather.module.scss';

function Weather() {
    const [city, setCity] = useState('Sofia');
    const [temperature, setTemperature] = useState(0);
    const [weatherDescription, setWeatherDescription] = useState('');
    const [weatherIcon, setIcon] = useState(null);

    useEffect(() => {
        weatherService.loadWeather(city)
            .then(res => {
                setWeatherDescription(res.weather[0].main)
                setTemperature(Math.round(res.main.temp - 273.15));
                setIcon(res.weather[0].icon);
            })
            .catch(err => {
                console.log(err);
            })
    }, [city]);

    const getCity = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        setCity(data.get('search'))
    }

    const getDate = () => {
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className={styles.container}>
            <section className={styles.search}>
                <Search submit={getCity} />
            </section>

            <section className={styles.information}>
                <p className={styles.temperature}>{temperature} &#8451;</p>
                <p className={styles.icon}>
                    {weatherIcon && <img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt={weatherDescription} />}
                    {weatherDescription}
                </p>
                <p className={styles.location}>
                    <i className="fas fa-map-marker-alt"></i>
                    {city}
                </p>
                <p className={styles.date}>{getDate()}</p>
            </section>
        </div>
    )
}

export default Weather;