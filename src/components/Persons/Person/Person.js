import React, {Component} from 'react';

import classes from './Person.css';
import PropTypes from 'prop-types'
import AuthContext from "../../../context/auth-context";

class Person extends Component {

    static contextType = AuthContext;

    componentDidMount() {
        console.log('[Person.js] Context: ', this.context)
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <div className={classes.Person}>

                { this.context.isAuthenticated ? <p>'Logged in'</p> : <p>'Please log in'}</p> }

                < p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                </p>
                <p>{this.props.children}</p>
                <input
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}/>
            </div>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    changes: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    isAuth: PropTypes.bool
};

export default Person;
