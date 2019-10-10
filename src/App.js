import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';

class App extends Component {

    state = {
        people: [
            {username: 'Inigo Montoya', quote: 'You killed my father.  Prepare to die!'}
        ]
    }

    nameChangedHandler = (event) => {
        console.log('change handler triggered');
        this.setState({
            people: [
                {username: event.target.value, quote: 'You killed my father.  Prepare to die!'}
            ]
        });
    };
    
    render() {

        const style = {
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        return (
            <div className="App">
                <div style={style}>
                    <UserInput
                        username={this.state.people[0].username} changed={this.nameChangedHandler}/>
                </div>
                <div>
                    <UserOutput username={this.state.people[0].username} quote={this.state.people[0].quote} />
                    <UserOutput username="Monkey" quote="Monkey Magic!"/>
                    <UserOutput username="Fred" quote={'Yabba dabba doooooo!'}/>
                </div>
            </div>
        );
    }
};


export default App;

// {this.state.people.map((person) => <Person name={person.name} age={person.age} />)};
