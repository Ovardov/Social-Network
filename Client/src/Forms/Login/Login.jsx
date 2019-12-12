import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from '../../App/App';
import Notification from '../../Notification/Notification';
import userService from '../../services/userService';
import styles from '../forms.module.scss';


function Login(props) {
    const [username, setLoginUsername] = useState('');
    const [password, setLoginPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    const { setIsLogged, setName, setUsername, setProfilePicture } = useContext(UserContext);


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username,
            password
        }

        userService.login(data)
            .then((res) => {
                if (res.hasOwnProperty('name') && res.hasOwnProperty('username')) {
                    setIsLogged(true);
                    setName(res.name);
                    setUsername(res.username);
                    setProfilePicture(res.profilePicture)

                    props.history.push('/');
                } else {
                    setErrors([res]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <Notification errors={errors} />
            <p>
                <input type="text" id="log-in-username" onChange={(e) => setLoginUsername(e.target.value)} value={username} />
                <label htmlFor="log-in-username">Username</label>
                <i className="fas fa-user"></i>
            </p>

            <p>
                <input type="password" id="log-in-password" onChange={(e) => setLoginPassword(e.target.value)} value={password}/>
                <label htmlFor="log-in-password">Password</label>
                <i className="fas fa-lock"></i>
            </p>

            <button type="submit" className="button">Login</button>

            <Link to="/register" className={styles.link}>Create an account!</Link>
        </form>
    )
}

export default Login;