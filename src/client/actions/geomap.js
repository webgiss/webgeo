import { SET_COORD, SET_ZOOM, SET_STYLE, NEED_ADDRESS_START, NEED_ADDRESS_END, NEED_ADDRESS_FAIL, USE_MILLIGRATICULE, SET_POPUP_STATUS, OPEN_ABOUT_WINDOW, CLOSE_ABOUT_WINDOW, OPEN_INPUT_COORD_WINDOW, CLOSE_INPUT_COORD_WINDOW, IMPORT_INPUT_COORD, UPDATE_INPUT_COORD } from "../constants/geomap";


export const setCoord = (lat, lon) => ({ type: SET_COORD, lat, lon });
export const setZoom = (zoom) => ({ type: SET_ZOOM, zoom });
export const setStyle = (style) => ({ type: SET_STYLE, style });
export const changeMilliGraticule = (useMilliGraticule) => ({ type: USE_MILLIGRATICULE, useMilliGraticule });
export const setPopupStatus = (popupStatus) => ({ type: SET_POPUP_STATUS, popupStatus })
export const openAboutWindow = () => ({ type: OPEN_ABOUT_WINDOW })
export const closeAboutWindow = () => ({ type: CLOSE_ABOUT_WINDOW })
export const openInputCoordWindow = () => ({ type: OPEN_INPUT_COORD_WINDOW })
export const closeInputCoordWindow = () => ({ type: CLOSE_INPUT_COORD_WINDOW })
export const updateInputCoordWindow = (data) => ({ type: UPDATE_INPUT_COORD, data })
export const importInputCoordWindow = () => ({ type: IMPORT_INPUT_COORD })

export const needAddress = (lat, lon) => async (dispatch) => {
    dispatch({ type: NEED_ADDRESS_START, lat, lon });
    try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`);
        const text = await response.text();
        if (text) {
            const result = JSON.parse(text);
            // const address = result.features.map(f=>`${f.properties.label} (${f.properties.score})`).join('\n');
            let addrcoord = null;
            if (result.features.length > 0) {
                const feature = result.features[0]
                const [lon, lat] = feature.geometry.coordinates;
                addrcoord = [lat, lon]
            }
            const address = result.features.map(f => `${f.properties.label} (${Math.round(10000 * f.properties.score) / 100} %)`).join('\n');
            dispatch({ type: NEED_ADDRESS_END, lat, lon, address, addrcoord });
            return;
        }
        // console.log('pas de resultat')
        dispatch({ type: NEED_ADDRESS_FAIL, lat, lon });
    } catch (e) {
        console.log(`Exception : ${e};${JSON.stringify(e)}`)
        dispatch({ type: NEED_ADDRESS_FAIL, lat, lon });
    }
}
