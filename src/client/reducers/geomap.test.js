import { SET_COORD, SET_STYLE, SET_ZOOM } from '../constants/geomap'
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
            'lat', 'lon', 'zoom', 'style', 'address', 'addrcoord', 'marks', 'addresses', 'useMilliGraticule', 'popupStatus'
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
                    addresses: [],
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
        it(`should modify all properties`, async () => {
            const state = geomap(dummyState, defaultAction)
            expect(state).toEqual({
                lat: 48.8565834593617,
                lon: 2.363348007202149,
                nlat: 48.856583,
                nlon: 2.363348,
                zoom: 12,
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
            const state = geomap(dummyState, {
                ...defaultAction,
                payload: {
                    ...defaultAction.payload,
                    location: {
                        ...defaultAction.payload.location,
                        hash: '#map=15//'
                    }
                }
            })
            expect(state).toEqual({
                lat: 0.5,
                lon: 0.7,
                zoom: 15,
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
})
