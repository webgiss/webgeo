import exportValues from '../utils/exportValues';

/**
 * @typedef Store<State>
 * @type {import('redux').Store<State>}
 * @template State
 */

/**
 * @typedef Dispatch
 * @type {import('redux').Dispatch}
 */

/** 
 * @typedef SubscribeParams
 * @type { { dispatch: Dispatch; store: Store<State>; history: import('history').History<{}>;} }
 * @template State
 */

/** 
 * @callback ValueGetter
 * @param { State } state
 * @return { Value }
 * @template State
 * @template Value
 * 
 */

/**
 * @callback ValueChangedCallback
 * @param { Value } currentValue
 * @param { Value } previousValue
 * @param { State } currentState
 * @param { SubscribeParams<State> } subscribeParams
 * @template State
 * @template Value
 */

/**
 * @typedef ChangeManagerItem
 * @type {Object} changeManagerItem
 * @property {string} changeManagerItem.name
 * @property {ValueGetter<State, Value>} changeManagerItem.getValue
 * @property {ValueChangedCallback<State, Value>} changeManagerItem.onNewValue
 * @template State
 * @template Value
 */

 /**
  * @typedef StateRegistration
  * @type {Object} self
  * @property {string} name
  * @property {ValueGetter<State, Value>} getStateValue
  * @property {ValueChangedCallback<State, Value>} onNewValue
  * @property {Value} currentValue
  * @template State
  * @template Value
  */

/**
 * @interface IProvider
 * @template State
 */
class IProvider {

    /**
     * @method
     * @name IProvider#onInitialState
     * @param {State} initialState
     * @return State
     */
    onInitialState(initialState) { }

    /**
     * @param { SubscribeParams<State> } subscribeParams 
     */
    onStartApplication(subscribeParams) { }

    /**
     * @param {State} currentState 
     * @param {SubscribeParams<State>} subscribeParams 
     */
    onNewState(currentState, subscribeParams) { }


    /**
     * @return {ChangeManagerItem<State, any>[]}
     */
    changeManager() { }

    /**
     * 
     */
    onInit() {}
}


/**
 * @class {ReactReduxInit} Init the react redux tool chain
 * @template State
 */
export class ReactReduxInit {
    /**
     * @param {import('./view').InitView} initView 
     * @param {import('./redux').InitRedux<State, import('redux').AnyAction>} initRedux 
     */
    constructor(initView, initRedux) {
        /** @type {IProvider<State>[]} */
        this._providers = [];
        this._unsubscribe = undefined;
        this._reducer = undefined;
        this._rootElement = undefined;
        this._baseUrl = undefined;
        /** @type {()=>JSX.Element} */
        this._routes = undefined;
        this._initView = initView;
        this._initRedux = initRedux;
        /** @type {StateRegistration<State, any>[]} */
        this._stateRegistrations = [];
    }

    /**
     * @param {IProvider} provider 
     */
    addProvider(provider) {
        this._providers.push(provider);
    }

    /** @param {Element} data */
    set reducer(data) { this._reducer = data; }
    /** @param {Element} data */
    set rootElement(data) { this._rootElement = data; }
    /** @param {string} data */
    set baseUrl(data) { this._baseUrl = data; }
    /** @param {()=>JSX.Element} data */
    set routes(data) { this._routes = data; }
    /**@param {Store<State>} data */
    set store(data) { this._store = data; }
    get store() { return this._store; }

    /**
     * @param {String} name
     * @param {ValueGetter<State, Value>} getStateValue
     * @param {ValueChangedCallback<State, Value>} onNewValue
     * @template Value
     */
    registerStateChange(name, getStateValue, onNewValue) {
        let stateRegistration = {
            name,
            getStateValue,
            onNewValue,
            currentValue: undefined,
        };
        this._stateRegistrations.push(stateRegistration);
    }

    init() {
        /** @type {State} */
        let initialState = undefined;

        this._providers.forEach((provider) => {
            if (provider.onInitialState !== undefined) {
                initialState = provider.onInitialState(initialState);
            }
        });

        let { history, store } = this._initRedux(this._baseUrl, initialState, this._reducer);
        this.store = store;

        let dispatch = store.dispatch;
        /** @type SubscribeParams<State> */
        let subscribeParams = { dispatch, store, history };

        this._providers.forEach(provider => {
            if (provider.onStartApplication !== undefined) {
                initialState = provider.onStartApplication(subscribeParams);
            }
        });

        exportValues(subscribeParams);

        let subscribeProviders = this._providers.filter(provider => provider.onNewState !== undefined);
        let changeManagerProviders = this._providers.filter(provider => provider.changeManager !== undefined);

        if (changeManagerProviders.length > 0) {
            changeManagerProviders.forEach(provider => {
                provider.changeManager().forEach((changeManager) => {
                    this.registerStateChange(
                        changeManager.name,
                        (state) => changeManager.getValue(state),
                        (currentValue, previousValue, currentState, subscribeParams) => changeManager.onNewValue(currentValue, previousValue, currentState, subscribeParams)
                    );
                })
            });
        }

        if (subscribeProviders.length > 0 || this._stateRegistrations.length > 0) {
            let currentState = undefined;
    
            let stateRegistrations = this._stateRegistrations;

            exportValues({ stateRegistrations });

            this._unsubscribe = store.subscribe(() => {
                let previousState = currentState;
                currentState = store.getState();

                stateRegistrations.forEach((stateRegistration) => {
                    let previousValue = stateRegistration.currentValue;
                    stateRegistration.currentValue = stateRegistration.getStateValue(currentState);
                    if (stateRegistration.currentValue !== previousValue) {
                        stateRegistration.onNewValue(stateRegistration.currentValue, previousValue, currentState, subscribeParams);
                    }
                });

                if (previousState !== currentState) {
                    subscribeProviders.map(provider => provider.onNewState(currentState, subscribeParams));
                }
            });
        }

        this._initView(store, history, this._rootElement, this._routes);

        this._providers.forEach((provider) => {
            if (provider.onInit !== undefined) {
                provider.onInit();
            }
        });
    }

    dispose() {
        if (this._unsubscribe !== undefined) {
            this._unsubscribe();
            this._unsubscribe = undefined;
        }
    }
}



