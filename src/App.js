import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/todo-list'
import CreateTodo from './components/create-todo'
import AppContext from './app-context'

export default class App extends Component {
    render() {
        return (
            <AppContext>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <div className="App-intro">
                        <TodoList />

                        <CreateTodo />
                    </div>
                </div>
            </AppContext>
        );
    }
}
