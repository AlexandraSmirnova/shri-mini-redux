const combineReducers = (reducersMap) => {
    return (state = {}, action) => {
        const nextState = {}
        Object.entries(reducersMap).forEach(([key, reducer]) => {
            nextState[key] = reducer(state[key], action)
        })
        return nextState
    }
}

export default combineReducers;