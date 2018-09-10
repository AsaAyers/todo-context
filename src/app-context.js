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

    constructor(...args) {
        super(...args)
        const getState = () => this.state
        const setState = this.setState.bind(this)

        this.providedContext = {
            ...todoActions(getState, setState),
            ...userActions(getState, setState)
        }
    }

    brokenRender() {
        // https://reactjs.org/docs/context.html#caveats
        //
        // Because context uses reference identity to determine when to
        // re-render, there are some gotchas that could trigger unintentional
        // renders in consumers when a provider’s parent re-renders. For
        // example, the code below will re-render all consumers every time the
        // Provider re-renders because a new object is always created for value:
        return (
            <Provider value={{
                ...this.providedContext,
                data: this.state
            }}>
                {this.props.children}
            </Provider>
        );
    }

    render() {
        console.log('Render <AppContext')
        this.providedContext = contextMerger(this.providedContext, this.state)

        return (
            <Provider value={this.providedContext}>
                {this.props.children}
            </Provider>
        );
    }
}
