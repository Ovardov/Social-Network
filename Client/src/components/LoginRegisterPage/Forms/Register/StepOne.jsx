import React, { Fragment } from 'react';

function StepOne({ firstName, setFirstName, lastName, setLastName }) {
    return (
        <Fragment>
            <p>
                <input type="text" id="register-first-name" placeholder="Aleksandar" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="register-first-name">First Name</label>
                <i className="fas fa-user"></i>
            </p>

            <p>
                <input type="text" id="register-last-name" placeholder="Ovardov" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor="register-last-name">Last Name</label>
                <i className="fas fa-user"></i>
            </p>
        </Fragment>
    )
}

export default StepOne;