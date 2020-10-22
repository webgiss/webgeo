import { SET_COORD, SET_ZOOM, SET_STYLE, NEED_ADDRESS_END, USE_MILLIGRATICULE, URL_STYLE, URL_MAP, SET_POPUP_STATUS } from "../constants/geomap";
import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, createLocationChangeReducer } from "./utils/createReducer";

const markResolution = 1000;

const getLatLonText = (value, directionArray) => {
    let indexSign = 0
    if (value < 0) {
        indexSign = 1
        value = -value
    }
    let valueDeg = Math.floor(value)
    value = (value - valueDeg) * 60
    let valueMin = Math.floor(value)
    value = (value - valueMin) * 60
    let valueSec = Math.floor(value * 100) / 100
    return `${valueDeg}° ${valueMin}' ${valueSec}" ${directionArray[indexSign]}`
}

const impactLatLonChange = (state) => {
    let { lat, lon } = state;
    [lat, lon] = [lat, lon].map((x) => Math.floor(x * markResolution) / markResolution)
    const nlat = normalizeLatLon(lat)
    const nlon = normalizeLatLon(lon)
    const latText = getLatLonText(lat, ['N', 'S'])
    const lonText = getLatLonText(lon, ['E', 'W'])
    const marks = [
        { lat, lon },
        { lat: lat + 1 / markResolution, lon },
        { lat, lon: lon + 1 / markResolution },
        { lat: lat + 1 / markResolution, lon: lon + 1 / markResolution },
    ]
    return { ...state, nlat, nlon, latText, lonText, marks };
}

const normalizeLatLon = (x) => Math.floor(x * 1000000) / 1000000;

const initialState = impactLatLonChange({
    lat: 48.87,
    lon: 2.33,
    zoom: 15,
    style: 'fr',
    address: null,
    addrcoord: null,
    marks: [],
    addresses: [],
    useMilliGraticule: false,
    popupStatus: false,
});

const updateAddress = (state, lat, lon, address, addrcoord) => {
    let addresses = state.addresses
    if (address) {
        let matchAddresses = addresses.filter((ad) => (ad.lat === lat) && (ad.lon === lon))
        if (matchAddresses.length >= 1) {
            addresses = addresses.map((ad) => {
                if ((ad.lat === lat) && (ad.lon === lon)) {
                    return { lat, lon, address }
                }
            })
        } else {
            addresses = [...addresses, { lat, lon, address, addrcoord }]
            if (addresses.length > 10) {
                addresses = addresses.slice(addresses.length - 10, addresses.length)
            }
        }
    } else {
        address = null
    }

    if (state.lat === lat && state.lon === lon) {
        state = { ...state, address, addrcoord, addresses }
    } else {
        state = { ...state, addresses }
    }
    return state
}

const findAddress = (state, lat, lon) => {
    let matchAddresses = state.addresses.filter((ad) => (ad.lat === lat) && (ad.lon === lon))
    if (matchAddresses.length >= 1) {
        const { address, addrcoord } = matchAddresses[matchAddresses.length - 1]
        return { address, addrcoord }
    }
    return { address: null, addrcoord: null };
}

export default createReducer({
    [LOCATION_CHANGE]: createLocationChangeReducer({
        [URL_MAP]: (state, value) => {
            const [zoomStr, latStr, lonStr] = value.split('/')
            const zoom = Number.parseInt(zoomStr)
            const lat = Number.parseFloat(latStr)
            const lon = Number.parseFloat(lonStr)
            let posChanged = false
            // console.log({ lat, lon, zoom })
            if (!isNaN(zoom)) {
                if (zoom !== state.zoom) {
                    state = { ...state, zoom };
                }
            }
            if (!isNaN(lat)) {
                if (lat !== state.lat) {
                    state = impactLatLonChange({ ...state, lat, address: null });
                    posChanged = true
                }
            }
            if (!isNaN(lon)) {
                if (lon !== state.lon) {
                    state = impactLatLonChange({ ...state, lon, address: null });
                    posChanged = true
                }
            }
            if (posChanged && (!state.address)) {
                const { address, addrcoord } = findAddress(state, state.lat, state.lon)
                if (address) {
                    state = { ...state, address, addrcoord }
                }
            }
            return state;
        },
        [URL_STYLE]: (state, value) => {
            const style = value;
            if (style !== state.style) {
                state = { ...state, style };
            }
            return state;
        }
    }),
    [SET_COORD]: (state, action) => {
        let { lat, lon } = action;
        const { address, addrcoord } = findAddress(state, lat, lon)
        return impactLatLonChange({ ...state, lat, lon, address, addrcoord });
    },
    [SET_ZOOM]: (state, action) => {
        const { zoom } = action;
        state = { ...state, zoom };
        return state;
    },
    [SET_STYLE]: (state, action) => {
        const { style } = action;
        state = { ...state, style };
        return state;
    },
    [USE_MILLIGRATICULE]: (state, action) => {
        const { useMilliGraticule } = action;
        state = { ...state, useMilliGraticule };
        return state;
    },
    [NEED_ADDRESS_END]: (state, action) => {
        const { lat, lon, address, addrcoord } = action;
        state = updateAddress(state, lat, lon, address, addrcoord)
        return state;
    },
    [SET_POPUP_STATUS]: (state, action) => {
        const { popupStatus } = action;
        if (state.popupStatus !== popupStatus) {
            state = { ...state, popupStatus }
        }
        return state;
    }
}, initialState);
