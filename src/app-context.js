import React, { Component } from 'react'
import uuid from 'uuid/v4'

export const {Provider, Consumer} = React.createContext();

export function contextMerger(context, data) {

    if (context.data !== data) {
        return {
            ...context,
            data
        }
    }
    return context
}

export function withAppContext(Component) {
    // Using a named function will name the forwarded ref.
    // https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
    return React.forwardRef(function appContext(props, ref) {
        return (
            <Consumer>{appContext => (
                <Component {...props} appContext={appContext} ref={ref} />
            )}</Consumer>
        )

    })
}

export default class AppContext extends Component {
    state = {
        todos: {
            1: {
                id: 1,
                text: 'not done',
                done: false,
            },
            2: {
                id: 2,
                text: 'done',
                done: true,
            }
        }
    }

    providedContext = {
        setStatus: async (id, done = true) => {

            this.setState(state => {
                if (state.todos[id] == null) {
                    throw new Error(`Todo not found: ${id}`)
                }
                const todo = {
                    ...state.todos[id],
                    done
                }

                return {
                    todos: {
                        ...state.todos,
                        [todo.id]: todo
                    }
                }

            })
        },
        createTodo: async (text) => {
            console.log('this', this)
            const todo = {
                id: uuid(),
                done: false,
                text
            }

            this.setState(state => {
                return {
                    // Always replace with a new object.
                    todos: {
                        ...state.todos,
                        [todo.id]: todo
                    }
                }
            })
        }
    }

    render() {
        this.providedContext = contextMerger(this.providedContext, this.state)
        console.log(this.providedContext)
        // this.providedContext.createTodo('Hello')

        return (
            <Provider value={this.providedContext}>
                {this.props.children}
            </Provider>
        );
    }
}
