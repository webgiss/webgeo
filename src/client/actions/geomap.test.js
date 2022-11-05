import { NEED_ADDRESS_END, NEED_ADDRESS_FAIL, NEED_ADDRESS_START } from "../constants/geomap"
import { needAddress, setCoord, setStyle, setZoom } from "./geomap"

describe('setCoord', () => {
    for (let [lat, lon] of [[1, 1], [1.1, 3.1], [-1.1, 3.1], [1.1, -3.1], [-1.1, -3.1]]) {
        it(`should generate an action SET_COORD for (${lat},${lon})`, () => expect(setCoord(lat, lon)).toEqual({ type: 'SET_COORD', lat, lon }))
    }
})

describe('setZoom', () => {
    for (let zoom of [0, 1, 12, 18, 19]) {
        it(`should generate an action SET_ZOOM for ${zoom}`, () => expect(setZoom(zoom)).toEqual({ type: 'SET_ZOOM', zoom }))
    }
})


describe('setStyle', () => {
    for (let style of ['org', 'de', 'fr', 'grut']) {
        it(`should generate an action SET_STYLE for ${style}`, () => expect(setStyle(style)).toEqual({ type: 'SET_STYLE', style }))
    }
})


describe(`needAddress`, () => {
    const createApiResponse = (points) => Promise.resolve({
        text: () => Promise.resolve(JSON.stringify({
            type: "FeatureCollection",
            version: "draft",
            features: points.map(({ lat, lon, label, score }) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [lon, lat]
                },
                properties: {
                    label,
                    score,
                    housenumber: 0,
                    id: "00000_0000_00000",
                    type: "none",
                    x: 0,
                    y: 0,
                    importance: 0,
                    name: "none",
                    postcode: "00000",
                    citycode: "00000",
                    city: "none",
                    district: "none",
                    context: "none",
                    street: "none",
                    distance: 0
                }
            })),
            attribution: "BAN",
            licence: "ETALAB-2.0",
            limit: 1
        }))
    })
    global.fetch = jest.fn((url) => {
        // console.log(url)
        switch (url) {
            case 'https://api-adresse.data.gouv.fr/reverse/?lon=3.1&lat=1.1':
                {
                    return createApiResponse([{ lat: 3.07, lon: 1.1002, label: 'This is the address', score: 0.999999 }])
                }
            case 'https://api-adresse.data.gouv.fr/reverse/?lon=3.7&lat=1.7':
                {
                    return createApiResponse([{ lat: 3.77, lon: 1.7002, label: 'This is another address', score: 0.51 }, { lat: 3.75, lon: 1.7003, label: 'This is a third address', score: 0.49 }])
                }
            default:
                return Promise.resolve({
                    text: () => null
                })
        }
    })
    it(`should return an address for (1.1,3.1)`, async () => {
        const action = needAddress(1.1, 3.1);
        expect(typeof (action)).toBe(typeof (function () { }))

        const dispatched = []
        const dispatch = (distachElement) => dispatched.push(distachElement)
        const getState = () => expect(true).toBe(false)
        await action(dispatch, getState)
        expect(dispatched).toEqual([
            { type: NEED_ADDRESS_START, lat: 1.1, lon: 3.1 },
            { type: NEED_ADDRESS_END, lat: 1.1, lon: 3.1, addrcoord: [3.07, 1.1002], address: "This is the address (100 %)" },
        ])
        // console.log(JSON.stringify(dispatched, null, 2))
    })
    it(`should return an address for (1.7,3.7)`, async () => {
        const action = needAddress(1.7, 3.7);
        expect(typeof (action)).toBe(typeof (function () { }))

        const dispatched = []
        const dispatch = (distachElement) => dispatched.push(distachElement)
        const getState = () => expect(true).toBe(false)
        await action(dispatch, getState)
        expect(dispatched).toEqual([
            { type: NEED_ADDRESS_START, lat: 1.7, lon: 3.7 },
            { type: NEED_ADDRESS_END, lat: 1.7, lon: 3.7, addrcoord: [3.77, 1.7002], address: "This is another address (51 %)\nThis is a third address (49 %)" },
        ])
        // console.log(JSON.stringify(dispatched, null, 2))
    })
    it(`should not return an address for (1.1,3.7)`, async () => {
        const action = needAddress(1.1, 3.7);
        expect(typeof (action)).toBe(typeof (function () { }))

        const dispatched = []
        const dispatch = (distachElement) => dispatched.push(distachElement)
        const getState = () => expect(true).toBe(false)
        await action(dispatch, getState)
        expect(dispatched).toEqual([
            { type: NEED_ADDRESS_START, lat: 1.1, lon: 3.7 },
            { type: NEED_ADDRESS_FAIL, lat: 1.1, lon: 3.7 },
        ])
        // console.log(JSON.stringify(dispatched, null, 2))
    })
})