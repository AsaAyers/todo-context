import React from 'react'
import { Consumer, withAppContext } from '../app-context'


class CreateTodo extends React.PureComponent {
    state = {
        text: ""
    }

    createTodo = async (event) => {
        event.preventDefault()
        const { appContext } = this.props
        await this.props.createTodo(this.state.text)
        this.setState({
            text: ""
        })
    }

    updateText = (event) => this.setState({
        text: event.target.value
    })


    render() {
        console.log('Render <CreateTodo')
        const btnDisabled = (
            this.state.text.trim().length === 0
        )

        return (
            <form onSubmit={this.createTodo}>
                <input value={this.state.text} onChange={this.updateText} />
                <input type="submit" disabled={btnDisabled} value="Create" />
            </form>
        )
    }

}

export default function (props) {
    return (
        <Consumer>{(appState) => (
            <CreateTodo {...props} createTodo={appState.createTodo} />
        )}</Consumer>
    )
}
