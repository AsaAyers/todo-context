import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppContext from './app-context'
import AppIntro from './components/app-intro'

export default class App extends Component {
    state = { counter: 0 }

    increment = () => this.setState(state => ({
        counter: state.counter + 1
    }))

    render() {
        return (
            <AppContext>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 onClick={this.increment} className="App-title">Welcome to React {this.state.counter}</h1>
                    </header>
                    <AppIntro />
                </div>
            </AppContext>
        );
    }
}
