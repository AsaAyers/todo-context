import React from 'react'
import { withAppContext } from '../app-context'


export default withAppContext(function TodoList({ appContext }) {
    // Each call to `onChange(todo.id)` creates a new function to use for the
    // `onChange` handler.
    const onChange = (id) => (event) => {
        appContext.setStatus(id, event.target.checked)
    }

    const list = Object.values(appContext.data.todos).map((todo) =>
        <li key={todo.id}>
            <input
                id={`todo-list__item${todo.id}`}
                type="checkbox"
                checked={todo.done}
                onChange={onChange(todo.id)}
            />
            <label htmlFor={`todo-list__item${todo.id}`}>
                {todo.text}
            </label>
        </li>
    )

    return (
        <div>
            <h1>TODOs</h1>

            <ul>
                {list}
            </ul>
        </div>
    )
})
