 # Mini-Redux
 Библиотека для реализации Redux data flow

 ## Устновка зависимостей и сборка:
 ```
 yarn
 yarn run build

 ```

 ## Подключение как библиотеки:

```
yarn add https://github.com/AlexandraSmirnova/shri-mini-redux.git
```

## Пример использования:
1. Создание экшена:
```js
export const setDataAction = (data) => ({ type: SET_DATA_TYPE, payload: data });
```

2. Создание редьюсера:
```js
const initialSearchStore = {...}

export const reducer = (state = initialSearchStore, action) => {
    switch (action.type) {
        case SET_DATA_TYPE:
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state;
    }
}
```
3. Создание стора:
```js
const store = new Store(reducer);
```

4. Создание View:
```js
class SearchView extends View {
    constructor(el, store) {
        super(el, store);
        this._onInput = this._onInput.bind(this);
        this._el.addEventListener('change', this._onInput);
    }

    _onInput(event) {
        this._store.dispatch(setDataAction(event.target.value));
    }

    destroy() {
        super.destroy();
        this._el.removeEventListener('change', this._onInput);
    }

    render({ data }) {
        return `
            <div>${data}</div>
            <input value=${data}>
        `;
    }
```
