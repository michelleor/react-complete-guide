import React, {Component} from 'react';

import Person from './Person/Person';

class Persons extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    // componentDidMount() {
    //     console.log('[Persons.js] componentDidMound')
    // }

    // getSnapshotBeforeUpdate(previousProps) {
    //     console.log('Persons.js] getSnapshotBeforeUpdate', previousProps);
    //     return {message: 'Thing one and thing two'};
    // }
    //
    // componentDidUpdate(previousProps, previousState, snapshot) {
    //     console.log('[Persons.js] componentDidUpdate', previousProps, previousState, snapshot)
    //     console.log('Props are now: ', this.props)
    // }

    render() {
        console.log('[Persons.js] rendering...');

        return this.props.persons.map((person, index) => {
            return (<Person
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={event => this.props.changed(event, person.id)}
            />);
        });
    }
}

export default Persons;
