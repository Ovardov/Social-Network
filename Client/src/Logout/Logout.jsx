import React, { useContext } from 'react';
import { UserContext } from '../App/App';
import userService from '../services/userService';

function Logout(props) {
    const { setIsLogged, setName, setUsername } = useContext(UserContext);

    const handleLogout = () => {
        userService.logout()
            .then((res) => {
                if (res === 'Logout successfully!') {
                    setIsLogged(false);
                    setName('');
                    setUsername('');
                    props.history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <button className="button" onClick={handleLogout}>Logout</button>
    )
}

export default Logout;