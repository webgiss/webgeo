import { SET_COORD } from '../constants/geomap'
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
})
