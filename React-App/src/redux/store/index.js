// import { createStore } from 'redux';
import rootReducer from '../reducers';
// export const Store = createStore(rootReducer);
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // Import thunk

const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))); // Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions



// Create the Redux store with thunk middleware
// const store = createStore(
//     rootReducer,
//     applyMiddleware(thunk) // Apply thunk middleware
// );

export default store;
