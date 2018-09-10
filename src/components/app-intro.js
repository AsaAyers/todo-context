import React, { PureComponent } from 'react'
import TodoList from './todo-list'
import CreateTodo from './create-todo'

export default class AppInfo extends PureComponent {
    render() {
        console.log('Render <AppIntro')
        return (
            <div className="App-intro">
                <TodoList />
                <CreateTodo />
            </div>
        )
    }
}
