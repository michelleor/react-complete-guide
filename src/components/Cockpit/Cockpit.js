import React, {useEffect, useRef, useContext} from 'react';

import classes from './Cockpit.css';
import AuthContext from "../../context/auth-context";
//import AuthContext from '../../context/auth-context'

const cockpit = ( props ) => {

    const toggleButtonRef = useRef(null);
    useEffect( () => {
        console.log('[Cockpit.js] useEffect');
        // setTimeout( () => {
        //     alert('Hello');
        // }, 2000);
        toggleButtonRef.current.click();
        return () => {
            console.log('[Cockpit.js] useEffect callback');
        }
    },[]);

    const authContext = useContext(AuthContext);
    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }

    if ( props.personsLength <= 2 ) {
      assignedClasses.push( classes.red ); // classes = ['red']
    }
    if ( props.personsLength <= 1 ) {
      assignedClasses.push( classes.bold ); // classes = ['red', 'bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join( ' ' )}>This is really working!</p>
            <button
                ref={toggleButtonRef}
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
                <button
                    onClick={authContext.login}>Log in</button>
        </div>
    );
};

export default React.memo(cockpit);