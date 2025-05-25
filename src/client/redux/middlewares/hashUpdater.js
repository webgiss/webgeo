import { createListenerMiddleware } from '@reduxjs/toolkit'
import { history } from '../../history';
import { URL_GEOHASH, URL_GOOGLE, URL_HUMAN, URL_MAP, URL_STYLE, URL_ZOOM } from '../../utils/urlConstants';

const getPath = (geomap) => {
    // console.log({ geomap })
    const { lat, lon, latCan, lonCan, zoom, style, geohash, urlFormat } = geomap;
    let canonicalPath = null;
    if (urlFormat === URL_GEOHASH) {
        canonicalPath = `#${URL_STYLE}=${style}&${URL_ZOOM}=${zoom}&${URL_GEOHASH}=${geohash}`;
    } else if (urlFormat === URL_GOOGLE) {
        canonicalPath = `#${URL_STYLE}=${style}&${URL_GOOGLE}=@${lat},${lon},${zoom}z`;
    } else if (urlFormat === URL_HUMAN) {
        canonicalPath = `#${URL_STYLE}=${style}&${URL_ZOOM}=${zoom}&${URL_HUMAN}=${latCan};${lonCan}`;
    } else {
        canonicalPath = `#${URL_STYLE}=${style}&${URL_MAP}=${zoom}/${lat}/${lon}`;
    }

    return canonicalPath
}

const hashUpdater = createListenerMiddleware()

hashUpdater.startListening({
    predicate: (action, currentState, previousState) => {
        // console.log({previousState, currentState})
        const currentPath = getPath(currentState.geomap);
        const previousPath = getPath(previousState.geomap);
        return currentPath !== previousPath;
    },
    effect: async (action, listenerApi) => {
        const { getState } = listenerApi;

        const path = getPath(getState().geomap);

        if (history.location.hash !== path) {
            history.push(path);
            window.h = history;
        }
    }
})

export default hashUpdater;