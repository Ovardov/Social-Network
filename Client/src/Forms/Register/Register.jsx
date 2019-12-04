import React, { Fragment, useState } from 'react';
import userService from '../../services/userService';
import styles from '../forms.module.scss';

function StepOne({ setFirstName, setLastName }) {
    return (
        <Fragment>
            <p>
                <input type="text" id="register-first-name" onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="register-first-name">First Name</label>
                <i class="fas fa-user"></i>
            </p>

            <p>
                <input type="text" id="register-last-name" onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor="register-last-name">Last Name</label>
                <i class="fas fa-user"></i>
            </p>
        </Fragment>
    )
}

function StepTwo({ setUsername, setPassword, setRepeatPassoword }) {
    return (
        <Fragment>
            <p>
                <input type="text" id="register-username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="register-username">Username</label>
                <i class="fas fa-user"></i>
            </p>

            <p>
                <input type="password" id="register-password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="register-password">Password</label>
                <i class="fas fa-lock"></i>
            </p>

            <p>
                <input type="password" id="register-repeat-passoword" onChange={(e) => setRepeatPassoword(e.target.value)} />
                <label htmlFor="register-repeat-passoword">Repeat Password</label>
                <i class="fas fa-lock"></i>
            </p>
        </Fragment>
    )
}


function Register(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRepeatPassoword] = useState('');
    const [step, setStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = `${firstName} ${lastName}`;
        const data = {
            username,
            password,
            name
        }

        userService.register(data)
            .then(() => {
                props.history.push('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            {step === 1 && <StepOne setFirstName={setFirstName} setLastName={setLastName} />}
            {step === 2 && <StepTwo setUsername={setUsername} setPassword={setPassword} setRepeatPassoword={setRepeatPassoword} />}

            <p className={styles['register-buttons']}>
                {step === 2 && <button type="button" className="button" onClick={() => setStep(step - 1)}>Back</button>}
                {step === 1 && <button type="button" className="button" onClick={() => setStep(step + 1)}>Next</button>}
                {step === 2 && <button type="submit" className="button">Register</button>}
            </p>
        </form>
    )
}

export default Register;