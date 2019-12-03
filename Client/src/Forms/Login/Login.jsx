import React, {useState} from 'react';
import userService from '../../services/userService';
import styles from './login.module.scss';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            username,
            password
        }

        userService.login(data)
            .then(() => {
                props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <p>
                <label htmlFor="log-in-username">Username</label>
                <input type="text" id="log-in-username" placeholder="Ovardov" onChange={(e) => setUsername(e.target.value)}/>
                <i class="fas fa-user"></i>
            </p>

            <p>
                <label htmlFor="log-in-password">Password</label>
                <input type="password" id="log-in-password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
                <i class="fas fa-lock"></i>
            </p>

            <input type="submit" value="Sign In" />
        </form>
    )
}

export default Login;