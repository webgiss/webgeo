import { URL_FORMAT, URL_GEOHASH, URL_GOOGLE, URL_HUMAN, URL_MAP, URL_STYLE, URL_ZOOM } from "@/utils/urlConstants";
import { parseLatLon } from "@/utils/latlon"
import Geohash from "@/utils/Geohash"
import { createSlice } from "@/redux/tools/createSlice";
import { getLatLonTextCan, normalizeLatLon } from "@/utils/geomap";

const markResolution = 1000;

const updateAddress = (state, lat, lon, address, addrcoord) => {
    if (address) {
        if (lat === state.lat && lon === state.lon) {
            state.address = address
            state.addrcoord = addrcoord
        }

        let matchAddresses = state.addresses.filter((ad) => (ad.lat === lat) && (ad.lon === lon))
        if (matchAddresses.length >= 1) {
            state.addresses = state.addresses.map((ad) => {
                if ((ad.lat === lat) && (ad.lon === lon)) {
                    return { lat, lon, address }
                }
            })
        } else {
            console.log('updateAddress', { lat, lon, address, addrcoord, adresses: state.addresses})
            // state.addresses.push({ lat, lon, address, addrcoord })
            if (state.addresses.length > 10) {
                state.addresses = state.addresses.slice(state.addresses.length - 10, state.addresses.length)
            }
        }
    } else {
        state.address = null;
        state.addrcoord = null;
    }
}

const impactLatLonChange = (state) => {
    let { lat, lon } = state;
    state.nlat = normalizeLatLon(lat)
    state.nlon = normalizeLatLon(lon)
    const { text: latText, can: latCan } = getLatLonTextCan(lat, ['N', 'S']);
    const { text: lonText, can: lonCan } = getLatLonTextCan(lon, ['E', 'W']);
    state.latText = latText
    state.lonText = lonText
    state.latCan = latCan
    state.lonCan = lonCan
    state.geohash = Geohash.encode(lat, lon, 12);

    [lat, lon] = [lat, lon].map((x) => Math.floor(x * markResolution) / markResolution)
    state.marks = [
        { lat, lon },
        { lat: lat + 1 / markResolution, lon },
        { lat, lon: lon + 1 / markResolution },
        { lat: lat + 1 / markResolution, lon: lon + 1 / markResolution },
    ]
}

const findAddress = (state) => {
    let matchAddresses = state.addresses.filter((ad) => (ad.lat === state.lat) && (ad.lon === state.lon))
    if (matchAddresses.length >= 1) {
        const { address, addrcoord } = matchAddresses[matchAddresses.length - 1]
        state.address = address
        state.addrcoord = addrcoord
    } else {
        state.address = null
        state.addrcoord = null
    }
}

const updateStateWithLatLonZoomStr = (state, latStr, lonStr, zoomStr) => {
    const zoom = Number.parseInt(zoomStr)
    const lat = Number.parseFloat(latStr)
    const lon = Number.parseFloat(lonStr)
    let posChanged = false

    if (!isNaN(zoom)) {
        if (zoom !== state.zoom) {
            state.zoom = zoom
        }
    }

    if (!isNaN(lat)) {
        if (lat !== state.lat) {
            state.lat = lat
            state.address = null
            posChanged = true
        }
    }

    if (!isNaN(lon)) {
        if (lon !== state.lon) {
            state.lon = lon
            state.address = null
            posChanged = true
        }
    }

    if (posChanged) {
        impactLatLonChange(state)
        if (!state.address) {
            findAddress(state)
        }
    }
}

const ensureUrlFormat = (state, format) => {
    if (state.urlFormat !== format) {
        state.urlFormat = format;
    }
}

export const createLocationChangeReducer = (state, action) => (pathReducersByParam) => {
    const hash = action?.payload?.hash
    if (hash) {
        // console.log('createLocationChangeReducer', { hash, action })
        if (hash.substring(0, 1) === '#') {
            const parts = hash.substring(1).split('&')
            parts.forEach((part) => {
                const [key, ...valuetmp] = part.split('=')
                const value = valuetmp.join('=')
                if (pathReducersByParam[key]) {
                    pathReducersByParam[key](state, value, { action, hash, key, value })
                }
            })

        }
    }
}

const slice = createSlice({
    name: "geomap",
    initialState: {
        lat: 48.87,
        lon: 2.33,
        zoom: 15,
        geohash: null,
        style: 'org',
        address: null,
        addrcoord: null,
        marks: [],
        addresses: [],
        useMilliGraticule: false,
        popupStatus: false,
        aboutWindowOpened: false,
        inputCoordWindowOpened: false,
        inputCoord: '',
        inputCoordParsed: null,
        inputCoordParsedError: null,
        inputCoordZoom: 14,
    },
    reducers: {
        init(state) {
            impactLatLonChange(state)
        },
        setCoord(state, action) {
            const { lat, lon } = action.payload
            state.lat = lat
            state.lon = lon
            findAddress(state)
            impactLatLonChange(state)
        },
        setZoom(state, action) {
            const { zoom } = action.payload
            if (state.zoom !== zoom) {
                state.zoom = zoom
            }
        },
        setStyle(state, action) {
            const { style } = action.payload;
            if (state.style !== style) {
                state.style = style
            }
        },
        useMilliGraticule(state, action) {
            state.useMilliGraticule = action.payload;
        },
        setPopupStatus(state, action) {
            const { status } = action.payload;
            if (state.popupStatus !== status) {
                state.popupStatus = status
            }
        },
        openAboutWindow(state) {
            if (!state.aboutWindowOpened) {
                state.aboutWindowOpened = true
            }
        },
        closeAboutWindow(state) {
            if (state.aboutWindowOpened) {
                state.aboutWindowOpened = false
            }
        },
        openInputCoordWindow(state) {
            if (!state.inputCoordWindowOpened) {
                state.inputCoordWindowOpened = true
            }
        },
        closeInputCoordWindow(state) {
            if (state.inputCoordWindowOpened) {
                state.inputCoordWindowOpened = false
            }
        },
        updateInputCoordWindow(state, action) {
            const { data } = action.payload;
            const parsedLatLon = parseLatLon(data)
            // console.log('parsedLatLon', { parsedLatLon, data })
            if (parsedLatLon.parsed) {
                const { lat, lon } = parsedLatLon
                const { text: latText, can: latCan } = getLatLonTextCan(lat, ['N', 'S']);
                const { text: lonText, can: lonCan } = getLatLonTextCan(lon, ['E', 'W']);
                const inputCoordParsed = {
                    tech: { lat, lon },
                    human: { lat: latText, lon: lonText },
                    can: { lat: latCan, lon: lonCan },
                }
                state.inputCoord = data
                state.inputCoordParsed = inputCoordParsed
                state.inputCoordParsedError = null
            } else {
                const { message } = parsedLatLon
                state.inputCoord = data
                state.inputCoordParsed = null
                state.inputCoordParsedError = message
            }
        },
        importInputCoord(state) {
            if (state.inputCoordParsed) {
                const { lat, lon } = state.inputCoordParsed.tech;
                state.lat = lat;
                state.lon = lon;
                state.inputCoordWindowOpened = false
                findAddress(state)
                impactLatLonChange(state)
            }
        },
        locationChange(state, action) {
            createLocationChangeReducer(state, action)({
                [URL_MAP]: (state, value) => {
                    const [zoomStr, latStr, lonStr] = value.split('/')
                    updateStateWithLatLonZoomStr(state, latStr, lonStr, zoomStr)
                    ensureUrlFormat(state, URL_MAP)
                },
                [URL_STYLE]: (state, value) => {
                    if (state.style !== value) {
                        state.style = value
                    }
                },
                [URL_GOOGLE]: (state, value) => {
                    if (value.startsWith('@')) {
                        value = value.substring(1);
                    }
                    if (value.endsWith('z')) {
                        value = value.substring(0, value.length - 1);
                    }
                    const [latStr, lonStr, zoomStr] = value.split(',');
                    updateStateWithLatLonZoomStr(state, latStr, lonStr, zoomStr);
                    ensureUrlFormat(state, URL_GOOGLE)
                },
                [URL_GEOHASH]: (state, value) => {
                    const geohash = value
                    try {
                        const { lat, lon } = Geohash.decode(geohash)
                        updateStateWithLatLonZoomStr(state, lat, lon)
                    } catch {
                    }
                    ensureUrlFormat(state, URL_GEOHASH);
                },
                [URL_ZOOM]: (state, value) => {
                    const zoom = Number.parseInt(value);
                    if (!isNaN(zoom) && (state.zoom !== zoom)) {
                        state.zoom = zoom
                    }
                },
                [URL_FORMAT]: (state, value) => {
                    if (state.urlFormat !== value) {
                        state.urlFormat = value;
                    }
                },
                [URL_HUMAN]: (state, value) => {
                    value = decodeURI(value);
                    const parsedLatLon = parseLatLon(value)
                    if (parsedLatLon.parsed) {
                        updateStateWithLatLonZoomStr(state, parsedLatLon.lat, parsedLatLon.lon, null);
                    }
                    ensureUrlFormat(state, URL_HUMAN);
                },
            })
        },
    },
    asyncReducers: {
        needAddress: [
            async ({ lat, lon }, thunkAPI) => {
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
                    return { lat, lon, address, addrcoord };
                }

            },
            null,
            (state, action) => {
                const { lat, lon, address, addrcoord } = action.payload;
                updateAddress(state, lat, lon, address, addrcoord);
            },
            null,
        ],
    },
});

export const {
    setCoord,
    setZoom,
    setStyle,
    useMilliGraticule,
    setPopupStatus,
    openAboutWindow,
    closeAboutWindow,
    openInputCoordWindow,
    closeInputCoordWindow,
    updateInputCoordWindow,
    importInputCoord,
    locationChange,
    needAddress,
} = slice.actions;

export default slice