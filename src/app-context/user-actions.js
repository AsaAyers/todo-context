
export default ({getState, setState}) => ({
    logout: async function () {
        setState({ user: null })
    }
})
