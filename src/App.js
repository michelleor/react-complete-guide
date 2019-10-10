import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

    state = {
        people: [
            { name: 'Max', age: 28 },
            { name: 'Manu', age: 29 },
            { name: 'Stephanie', age: 26 }
        ],
        otherState: 'some other value'
    };

    switchNameHandler = (newName) => {
        this.setState({
            people: [
                { name: newName, age: 28 },
                { name: 'Manu', age: 29 },
                { name: 'Stephanie', age: 27 }
            ]
        });
    };

    nameChangedHandler = (event) => {
        this.setState({
            people: [
                { name: 'Max', age: 28 },
                { name: event.target.value, age: 29 },
                { name: 'Stephanie', age: 27 }
            ]
        });
    };
    
    render() {

        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <p>This is really working!</p>
                <button
                    style={style}
                    onClick={this.switchNameHandler.bind(this, 'Maximilian')}
                >Switch Name</button>
                <Person
                    name={this.state.people[0].name}
                    age={this.state.people[0].age}/>
                <Person
                    name={this.state.people[1].name}
                    age={this.state.people[1].age}
                    changed = {this.nameChangedHandler}
                    click = { () => this.switchNameHandler('Anon') }>
                    My Hobbies: Racing
                </Person>
                <Person
                    name={this.state.people[2].name}
                    age={this.state.people[2].age}
                />
            </div>
        );
    }
};


export default App;

// {this.state.people.map((person) => <Person name={person.name} age={person.age} />)};
