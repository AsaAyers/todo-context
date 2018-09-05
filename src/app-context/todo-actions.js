import uuid from 'uuid/v4'

export default (getState, setState) => ({
    setStatus: async function (id, done = true) {
        const state = getState()
        if (state.todos[id] == null) {
            throw new Error(`Todo not found: ${id}`)
        }

        setState(state => {
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
    createTodo: async function (text) {
        const todo = {
            id: uuid(),
            done: false,
            text
        }

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
