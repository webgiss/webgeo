import { applyMiddleware, compose, createStore, Reducer } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, History } from 'history';

/**
 * @callback InitRedux
 * @param {string} baseUrl The base url of the routing system
 * @param {State} initialState The initial redux state
 * @param {(history: History<{}>)=>Reducer<State, Action>} reducerCreator
 * @template State
 * @template Action
 */

/**
 * @type {InitRedux<State, Action>}
 * @template State
 * @template Action
 */
export default (baseUrl, initialState, reducerCreator) => {
    // Create browser history to use in the Redux store
    const history = createBrowserHistory({ basename: baseUrl });
    const reducer = reducerCreator(history);

    const middleware = [
        thunk,
        routerMiddleware(history),
    ]

    const enhancers = []

    const isDevelopment = process.env.NODE_ENV === 'development';

    //@ts-ignore
    if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        //@ts-ignore
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    return { history, store };
};

 
