import React, { useState, useContext } from 'react';
import { UserContext } from '../../App/App';
import Notification from '../../Notification/Notification';
import userService from '../../services/userService';
import styles from '../forms.module.scss';


function Login(props) {
    const [username, setLoginUsername] = useState('');
    const [password, setLoginPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { setIsLogged, setName, setUsername } = useContext(UserContext);

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

                    props.history.push('/');
                } else {
                    setErrors([...errors, res]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <p>
                <input type="text" id="log-in-username" onChange={(e) => setLoginUsername(e.target.value)} value={username} />
                <label htmlFor="log-in-username">Username</label>
                <i class="fas fa-user"></i>
            </p>

            <p>
                <input type="password" id="log-in-password" onChange={(e) => setLoginPassword(e.target.value)} value={password}/>
                <label htmlFor="log-in-password">Password</label>
                <i class="fas fa-lock"></i>
            </p>

            <button type="submit" className="button">Sign In</button>
            <Notification errors={errors}/>
        </form>

    )
}

export default Login;