import { SET_COORD, SET_POPUP_STATUS, SET_STYLE, SET_ZOOM, USE_MILLIGRATICULE } from '../constants/geomap'
import geomap from './geomap'

const dummyState = {
    lat: 0.5,
    lon: 0.7,
    zoom: 4,
    style: 'fancy',
    address: null,
    addrcoord: null,
    marks: [],
    addresses: [],
    useMilliGraticule: false,
    popupStatus: false,
}

describe(`geomap reducer`, () => {
    it(`should initialize an empty state`, async () =>
        expect(
            Object.keys(geomap(null, { type: '' }))
        ).toEqual([
            'lat', 'lon', 'zoom', 'geohash', 'style', 'address', 'addrcoord',
            'marks', 'addresses', 'useMilliGraticule', 'popupStatus',
            'nlat', 'nlon', 'latText', 'lonText', 'latCan', 'lonCan'
        ])
    )
    describe(`SET_COORD action`, () => {
        it(`should set lat lon in state`, async () => {
            const state = geomap(dummyState, { type: SET_COORD, lat: 0.52131921, lon: -0.98765431 })
            expect(
                state
            ).toEqual(
                {
                    lat: 0.52131921,
                    lon: -0.98765431,
                    zoom: 4,
                    geohash: 'ebp6cwbucuzw',
                    style: 'fancy',
                    address: null,
                    addrcoord: null,
                    marks: [
                        {
                            "lat": 0.521,
                            "lon": -0.988,
                        },
                        {
                            "lat": 0.522,
                            "lon": -0.988,
                        },
                        {
                            "lat": 0.521,
                            "lon": -0.987,
                        },
                        {
                            "lat": 0.522,
                            "lon": -0.987,
                        }
                    ],
                    nlat: 0.521319,
                    nlon: -0.987655,
                    latText: '0° 31\' 16.74" N',
                    lonText: '0° 59\' 15.55" W',
                    latCan: '00:31:16.74N',
                    lonCan: '00:59:15.55W',
                    addresses: [],
                    useMilliGraticule: false,
                    popupStatus: false,
                }
            )
        })
        it(`should set lat lon in state and use address cache when available`, async () => {
            const addresses = [
                {
                    "lat": 0.52131921,
                    "lon": -0.98765431,
                    "address": "This is an address",
                    "addrcoord": [0.5214, -0.9879]
                },
                {
                    "lat": 0.5220,
                    "lon": 0.12345678,
                    "address": "This is another address",
                    "addrcoord": [0.5223, 0.12358]
                }
            ]
            const state = geomap({ ...dummyState, addresses }, { type: SET_COORD, lat: 0.52131921, lon: -0.98765431 })
            expect(
                state
            ).toEqual(
                {
                    lat: 0.52131921,
                    lon: -0.98765431,
                    zoom: 4,
                    "geohash": "ebp6cwbucuzw",
                    style: 'fancy',
                    address: "This is an address",
                    addrcoord: [0.5214, -0.9879],
                    marks: [
                        {
                            "lat": 0.521,
                            "lon": -0.988,
                        },
                        {
                            "lat": 0.522,
                            "lon": -0.988,
                        },
                        {
                            "lat": 0.521,
                            "lon": -0.987,
                        },
                        {
                            "lat": 0.522,
                            "lon": -0.987,
                        }
                    ],
                    nlat: 0.521319,
                    nlon: -0.987655,
                    "latText": "0° 31' 16.74\" N",
                    "lonText": "0° 59' 15.55\" W",
                    latCan: '00:31:16.74N',
                    lonCan: '00:59:15.55W',
                    addresses,
                    useMilliGraticule: false,
                    popupStatus: false,
                }
            )
        })
    })
    describe(`SET_ZOOM action`, () => {
        it(`should set zoom in state`, async () => {
            const state = geomap(dummyState, { type: SET_ZOOM, zoom: 17 });
            expect(state).toEqual({
                lat: 0.5,
                lon: 0.7,
                zoom: 17,
                style: 'fancy',
                address: null,
                addrcoord: null,
                marks: [],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
    })
    describe(`SET_STYLE action`, () => {
        it(`should set style in state`, async () => {
            const state = geomap(dummyState, { type: SET_STYLE, style: 'grut' });
            expect(state).toEqual({
                lat: 0.5,
                lon: 0.7,
                zoom: 4,
                style: 'grut',
                address: null,
                addrcoord: null,
                marks: [],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
    })
    describe(`LOCATION_CHANGE action`, () => {
        const defaultAction = {
            type: "@@router/LOCATION_CHANGE",
            payload: {
                location: {
                    pathname: "/",
                    search: "",
                    hash: "#style=grut&map=12/48.8565834593617/2.363348007202149"
                },
                action: "POP",
                isFirstRendering: false
            }
        }
        const getAction = (hash) => ({
            ...defaultAction,
            payload: {
                ...defaultAction.payload,
                location: {
                    ...defaultAction.payload.location,
                    hash
                }
            }
        })
        it(`should modify all properties`, async () => {
            const state = geomap(dummyState, defaultAction)
            expect(state).toEqual({
                lat: 48.8565834593617,
                lon: 2.363348007202149,
                nlat: 48.856583,
                nlon: 2.363348,
                latText: "48° 51' 23.7\" N",
                lonText: "2° 21' 48.05\" E",
                latCan: '48:51:23.7N',
                lonCan: '02:21:48.05E',
                zoom: 12,
                geohash: 'u09tvy0fnp20',
                urlFormat: 'map',
                style: 'grut',
                address: null,
                addrcoord: null,
                marks: [
                    {
                        "lat": 48.856,
                        "lon": 2.363,
                    },
                    {
                        "lat": 48.857,
                        "lon": 2.363,
                    },
                    {
                        "lat": 48.856,
                        "lon": 2.364,
                    },
                    {
                        "lat": 48.857,
                        "lon": 2.364,
                    }
                ],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
        it(`should be able to modify only the style`, async () => {
            const state = geomap(dummyState, {
                ...defaultAction,
                payload: {
                    ...defaultAction.payload,
                    location: {
                        ...defaultAction.payload.location,
                        hash: '#style=grut'
                    }
                }
            })
            expect(state).toEqual({
                lat: 0.5,
                lon: 0.7,
                zoom: 4,
                style: 'grut',
                address: null,
                addrcoord: null,
                marks: [],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
        it(`should be able to modify only the zoom`, async () => {
            const state = geomap(dummyState, getAction('#map=15//'))
            expect(state).toEqual({
                lat: 0.5,
                lon: 0.7,
                zoom: 15,
                style: 'fancy',
                urlFormat: 'map',
                address: null,
                addrcoord: null,
                marks: [],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
        it(`should be able to modify only the lat`, async () => {
            const state = geomap(dummyState, getAction('#map=/48.8565834593617/'))
            expect(state).toEqual({
                lat: 48.8565834593617,
                lon: 0.7,
                nlat: 48.856583,
                nlon: 0.7,
                latText: "48° 51' 23.7\" N",
                lonText: "0° 42' 0\" E",
                latCan: '48:51:23.7N',
                lonCan: '00:42:00E',
                zoom: 4,
                geohash: 'u08mzyjdppmb',
                urlFormat: 'map',
                style: 'fancy',
                address: null,
                addrcoord: null,
                marks: [
                    {
                        lat: 48.856,
                        lon: 0.7,
                    },
                    {
                        lat: 48.857,
                        lon: 0.7,
                    },
                    {
                        lat: 48.856,
                        lon: 0.701,
                    },
                    {
                        lat: 48.857,
                        lon: 0.701,
                    },
                ],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
        it(`should be able to modify only the lon`, async () => {
            const state = geomap(dummyState, getAction('#map=//2.363348007202149'))
            expect(state).toEqual({
                lat: 0.5,
                lon: 2.363348007202149,
                nlat: 0.5,
                nlon: 2.363348,
                latText: "0° 30' 0\" N",
                lonText: "2° 21' 48.05\" E",
                latCan: '00:30:00N',
                lonCan: '02:21:48.05E',
                zoom: 4,
                geohash: 's01dvg0bwnb0',
                urlFormat: 'map',
                style: 'fancy',
                address: null,
                addrcoord: null,
                marks: [
                    {
                        lat: 0.5,
                        lon: 2.363,
                    },
                    {
                        lat: 0.501,
                        lon: 2.363,
                    },
                    {
                        lat: 0.5,
                        lon: 2.364,
                    },
                    {
                        lat: 0.501,
                        lon: 2.364,
                    },
                ],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
        it(`should change lat and lon with geohash`, async () => {
            const state = geomap(dummyState, getAction('#geohash=u09tvy0fnp20'))
            expect(state).toEqual({
                lat: 48.85658347,
                lon: 2.36334817,
                nlat: 48.856583,
                nlon: 2.363348,
                latText: "48° 51' 23.7\" N",
                lonText: "2° 21' 48.05\" E",
                latCan: '48:51:23.7N',
                lonCan: '02:21:48.05E',
                zoom: 4,
                geohash: 'u09tvy0fnp20',
                urlFormat: 'geohash',
                style: 'fancy',
                address: null,
                addrcoord: null,
                marks: [
                    {
                        "lat": 48.856,
                        "lon": 2.363,
                    },
                    {
                        "lat": 48.857,
                        "lon": 2.363,
                    },
                    {
                        "lat": 48.856,
                        "lon": 2.364,
                    },
                    {
                        "lat": 48.857,
                        "lon": 2.364,
                    }
                ],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
        it(`should set lat lon based on human readable string`, async () => {
            const state = geomap(dummyState, getAction("#human=48° 51' 23.7\" N2° 21' 48.05\" E"))
            expect(state).toEqual({
                lat: 48.85658333333333,
                lon: 2.3633472222222225,
                nlat: 48.856583,
                nlon: 2.363347,
                latText: "48° 51' 23.69\" N",
                lonText: "2° 21' 48.05\" E",
                latCan: '48:51:23.69N',
                lonCan: '02:21:48.05E',
                zoom: 4,
                geohash: 'u09tvy0fjzpr',
                style: 'fancy',
                urlFormat: 'human',
                address: null,
                addrcoord: null,
                marks: [
                    {
                        "lat": 48.856,
                        "lon": 2.363,
                    },
                    {
                        "lat": 48.857,
                        "lon": 2.363,
                    },
                    {
                        "lat": 48.856,
                        "lon": 2.364,
                    },
                    {
                        "lat": 48.857,
                        "lon": 2.364,
                    }
                ],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: false,
            })
        })
        it(`should not change anything with no params`, async () => {
            const state = geomap(dummyState, getAction('#'))
            expect(state).toEqual(dummyState)
        })
    })
    describe(`USE_MILLIGRATICULE action`, () => {
        it(`should set useMilliGraticule is state`, async () => {
            const action = { type: USE_MILLIGRATICULE, useMilliGraticule: true };
            const state = geomap(dummyState, action)
            expect(state).toEqual({
                lat: 0.5,
                lon: 0.7,
                zoom: 4,
                style: 'fancy',
                address: null,
                addrcoord: null,
                marks: [],
                addresses: [],
                useMilliGraticule: true,
                popupStatus: false,
            })
        })
    })
    describe(`SET_POPUP_STATUS action`, () => {
        it(`should set popupStatus is state`, async () => {
            const action = { type: SET_POPUP_STATUS, popupStatus: true };
            const state = geomap(dummyState, action)
            expect(state).toEqual({
                lat: 0.5,
                lon: 0.7,
                zoom: 4,
                style: 'fancy',
                address: null,
                addrcoord: null,
                marks: [],
                addresses: [],
                useMilliGraticule: false,
                popupStatus: true,
            })
        })
    })
})
