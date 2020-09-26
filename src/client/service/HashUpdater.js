import { URL_STYLE, URL_MAP } from '../constants/geomap';

const getPath = (geomap) => {
    const { lat, lon, zoom, style } = geomap;
    const canonicalPath = `#${URL_STYLE}=${style}&${URL_MAP}=${zoom}/${lat}/${lon}`;
    return canonicalPath
}

/**
 * @template State
 */
export default class HashUpdater {
    /**
     * 
     * @param {import('../init/reactRedux').ReactReduxInit<State>} reactReduxInit 
     */
    constructor(reactReduxInit) {
        this._reactReduxInit = reactReduxInit;
        this._reactReduxInit.addProvider(this)
    }

    onStartApplication() {
        // this._reactReduxInit.registerStateChange(
        //     'hash changed',
        //     (state) => state && state.router && state.router.location && state.router.location.hash,
        //     (currentHash, previousHash, state, { dispatch, store, history }) => {
        //         const { lat, lon, zoom, style } = state.geomap;
        //         const canonicalPath = `#style=${style}&map=${zoom}/${lat}/${lon}`;
        //         console.log({ currentHash, canonicalPath })
        //         if (currentHash !== canonicalPath) {
        //             history.push(canonicalPath);
        //         }
        //     }
        // )
        this._reactReduxInit.registerStateChange(
            'path changed',
            (state) => state && state.geomap && getPath(state.geomap),
            (currentPath, previousPath, state, { dispatch, store, history }) => {
                //console.log('path changed', {currentPath, previousPath})
                const hash = state && state.router && state.router.location && state.router.location.hash;

                // console.log('path changed', {hash, currentPath, previousPath})
                window.h = history
                // if (!hash || (hash === previousPath && hash !== currentPath)) {
                if (!hash || (hash !== currentPath)) {
                        history.push(currentPath);
                }
            }
        )
    }


}