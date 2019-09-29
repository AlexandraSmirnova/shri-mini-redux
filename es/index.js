const combineReducers = (reducersMap) => {
    return (state = {}, action) => {
        const nextState = {};
        Object.entries(reducersMap).forEach(([key, reducer]) => {
            nextState[key] = reducer(state[key], action);
        });
        return nextState
    }
};

class Store {
    constructor(reducer) {
        this._reducer = reducer;
        this._state = undefined;
        this._listeners = [];
        this.dispatch({
            type: '@@init'
        });
    }

    getState() {
        return this._state;
    }

    subscribe(subscriber) {
        this._listeners.push(subscriber);
        return () => {
            const index = this._listeners.indexOf(subscriber);
            this._listeners.splice(index, 1);
        };
    }

    dispatch(action) {
        console.log('action', action);
        this._state = this._reducer(this._state, action);
        this._notifyListeners();
    }

    _notifyListeners() {
        this._listeners.forEach((listener) => {
            listener(this._state);
        });
    }
}

class View {
    constructor(el, store) {
        this._el = el;
        this._store = store;
        this._unsubscribe = store.subscribe(
            this._prepareRender.bind(this)
        );
        this._prepareRender(store.getState());
    }

    _prepareRender(state) {
        this._el.innerHTML = this.render(state);
    }

    render() {
        throw new Error('This method should be overriden');
    }

    distroy() {
        this._el.innerHTML = '';
        this._unsubscribe();
    }
}

var index = {
    combineReducers,
    Store,
    View,
};

export default index;
