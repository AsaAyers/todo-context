import uuid from 'uuid/v4'


export default function configureTodoApi(config) {
    // These should really be a call to the server, but since I don't have a
    // server I'm just implementing this here.
    const fakeServerStore = new Map()

    async function getTodos() {

        const data = {}
        for (const [key, value] of fakeServerStore) {
            data[key] = value
        }
        return data
    }
    async function createTodo(text) {
        const id = uuid()
        const todo = {
            id,
            done: false,
            text
        }
        fakeServerStore.set(id, todo)

        return todo
    }
    async function setStatus(id, done = true) {
        const todo = fakeServerStore.get(id)
        if (todo == null) {
            throw new Error(`Todo not found: ${id}`)
        }

        const updatedTodo = {
            ...todo,
            done
        }
        fakeServerStore.set(id, updatedTodo)
        return updatedTodo
    }

    createTodo('First Todo')


    return {
        getTodos,
        setStatus,
        createTodo,
    }
}
