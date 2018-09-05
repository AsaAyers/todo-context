import React from 'react'
import { withAppContext } from '../app-context'


export default withAppContext(class CreateTodo extends React.Component {
    state = {
        text: ""
    }

    createTodo = async (event) => {
        event.preventDefault()
        const { appContext } = this.props
        await appContext.createTodo(this.state.text)
        this.setState({
            text: ""
        })
    }

    updateText = (event) => this.setState({
        text: event.target.value
    })


    render() {
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

})
