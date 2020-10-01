import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

/**
 * @callback InitView
 * @param {import("redux").Store<State, import("redux").AnyAction>} store
 * @param {import("history").History<{}>} history
 * @param {Element | DocumentFragment} rootElement
 * @param {()=>JSX.Element} Routes
 * @template State
 */

/**
 * @type {InitView<State>}
 * @template State
 */
export default (store, history, rootElement, Routes) => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </Provider>,
        rootElement
    );
} 
