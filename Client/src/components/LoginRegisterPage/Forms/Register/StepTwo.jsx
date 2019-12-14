import React, { Fragment} from 'react';

function StepTwo({ setUsername, setPassword, setRepeatPassoword }) {
    return (
        <Fragment>
            <p>
                <input type="text" id="register-username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="register-username">Username</label>
                <i class="fas fa-user"></i>
            </p>

            <p>
                <input type="password" id="register-password" onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="register-password">Password</label>
                <i class="fas fa-lock"></i>
            </p>

            <p>
                <input type="password" id="register-repeat-passoword" onChange={(e) => setRepeatPassoword(e.target.value)}/>
                <label htmlFor="register-repeat-passoword">Repeat Password</label>
                <i class="fas fa-lock"></i>
            </p>
        </Fragment>
    )
}

export default StepTwo;