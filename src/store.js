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

export default Store;