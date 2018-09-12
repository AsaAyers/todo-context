
export default ({getState, setState, todoApi}) => ({
    getTodos: async function() {
        const todos = await todoApi.getTodos()

        // Overwrite local todos
        setState({ todos })
    },
    setStatus: async function (id, done = true) {
        const todo = await todoApi.setStatus(id, done)

        setState(state => {
            return {
                todos: {
                    ...state.todos,
                    [todo.id]: todo
                }
            }

        })
    },
    createTodo: async function (text) {
        const todo = await todoApi.createTodo(text)

        setState(state => {
            return {
                // Always replace with a new object.
                todos: {
                    ...state.todos,
                    [todo.id]: todo
                }
            }
        })
    }
})
