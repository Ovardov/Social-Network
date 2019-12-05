import React, { Fragment } from 'react';

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

export default StepOne;