import React, { Fragment} from 'react';

function StepTwo({ username, setUsername, setPassword, setRepeatPassoword }) {
    return (
        <Fragment>
            <p>
                <input type="text" id="register-username" placeholder="Ovardov" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="register-username">Username</label>
                <i class="fas fa-user"></i>
            </p>

            <p>
                <input type="password" id="register-password" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="register-password">Password</label>
                <i class="fas fa-lock"></i>
            </p>

            <p>
                <input type="password" id="register-repeat-passoword" placeholder="*******" onChange={(e) => setRepeatPassoword(e.target.value)}/>
                <label htmlFor="register-repeat-passoword">Repeat Password</label>
                <i class="fas fa-lock"></i>
            </p>
        </Fragment>
    )
}

export default StepTwo;