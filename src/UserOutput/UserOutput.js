import React from 'react';

const person = (props) => {
    return (
        <div className="UserOutput">
            <p>I'm {props.name} and I am {props.age} years old</p>
            <p onClick={props.click}>{props.children}</p>
        </div>
    )
};

export default person;
