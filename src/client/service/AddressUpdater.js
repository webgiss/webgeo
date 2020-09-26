import '../actions'

/**
 * @template state
 */
export default class AddressUpdater {
    /**
     * 
     * @param {import('../init/reactRedux').ReactReduxInit<State>} reactReduxInit 
     */
    constructor(reactReduxInit) {
        this._reactReduxInit = reactReduxInit;
        this._reactReduxInit.addProvider(this)
    }
    onStartApplication() {
        this._reactReduxInit.registerStateChange(
            'position changed',
            (state) => state && state.geomap && `${state.geomap.lat}-${state.geomap.lon}`,
            (currentPath, previousPath, state, { dispatch, store, history }) => {
                //console.log('path changed', {currentPath, previousPath})
                const hash = state && state.router && state.router.location && state.router.location.hash;

                const { popupStatus, address, lat, lon } = state.geomap;

                if (popupStatus && (!address)) {
                    dispatch(actions.geomap.needAddress(lat, lon))
                }
            }
        )
    }
}