import React from 'react';

import './UserOutput.css';

const person = (props) => {
    return (
        <div className="UserOutput">
            <p>Hi My name is {props.username}</p>
            <p>{props.quote}</p>
        </div>
    )
};

export default person;
