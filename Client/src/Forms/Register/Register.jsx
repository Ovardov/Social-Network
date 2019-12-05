import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import * as yup from 'yup';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Notification from '../../Notification/Notification';
import userService from '../../services/userService';
import styles from '../forms.module.scss';

function Register(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [repeatPassword, setRepeatPassoword] = useState('');
    const [step, setStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        schema.validate({ firstName, lastName, username, password, repeatPassword }, { abortEarly: false })
            .then(() => {
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
            })
            .catch(err => {
                setErrors(err.errors)
            })
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <Notification errors={errors} />
            {step === 1 && <StepOne setFirstName={setFirstName} setLastName={setLastName} />}
            {step === 2 && <StepTwo setUsername={setUsername} setPassword={setPassword} setRepeatPassoword={setRepeatPassoword} />}

            <p className={styles['register-buttons']}>
                {step === 2 && <button type="button" className="button" onClick={() => setStep(step - 1)}>Back</button>}
                {step === 1 && <button type="button" className="button" onClick={() => setStep(step + 1)}>Next</button>}
                {step === 2 && <button type="submit" className="button">Register</button>}
            </p>

            <Link to="/login" className={styles.link}>Have an account already?</Link>
        </form>
    )
}

const schema = yup.object({
    firstName: yup.string('First Name should be a string')
        .required('First Name is required')
        .min(2, 'First Name should be more than 1 chars'),


    lastName: yup.string('Last Name should be a string')
        .required('Last Name is required')
        .min(2, 'Last Name should be more than 1 chars'),

    username: yup.string('Username shoud be a string')
        .required('Username is required')
        .min(4, 'Username should be more than 4 chars'),

    password: yup.string('Password must be a string')
        .required('Password is required')
        .min(6, 'Password must be more than 6 chars'),

    repeatPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});


export default Register;