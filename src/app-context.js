import React, { Component } from 'react'
import todoActions from './app-context/todo-actions'
import userActions from './app-context/user-actions'

// Tests may want to import the Provider to inject a mock app context
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
        user: {
            username: 'Asa'
        },
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
    getState = () => this.state


    providedContext = {
        ...todoActions(this.getState, this.setState.bind(this)),
        ...userActions(this.getState, this.setState.bind(this))
    }

    render() {
        this.providedContext = contextMerger(this.providedContext, this.state)

        return (
            <Provider value={this.providedContext}>
                {this.props.children}
            </Provider>
        );
    }
}
