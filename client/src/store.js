// Packages
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from './reducers/rootReducer';
import { loadState, saveState } from './utils/localStorage';

let store;
const persistedState = loadState();

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk)
    )
  );
}

// throttle subscribe to not use expensive JSON stringify
// more than once a second.
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default function configureStore(initialState={}) {
 return store;
}
