import React from 'react';

const UserInput = (props) => {
    return (
        <div className="UserInput">
            <p>Type a new name: </p>
            <input type="text" onChange={props.changed} value={props.username}/>
        </div>
    )
};

export default UserInput;
