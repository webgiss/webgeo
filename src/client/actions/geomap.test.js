import { setCoord, setStyle, setZoom } from "./geomap"

describe('setCoord', () => {
    for (let [lat, lon] of [[1, 1], [1.1, 3.1], [-1.1, 3.1], [1.1, -3.1], [-1.1, -3.1]]) {
        it(`should generate an action SET_COORD for (${lat},${lon})`, () => expect(setCoord(lat, lon)).toEqual({ type: 'SET_COORD', lat, lon }))
    }
})

describe('setZoom', () => {
    for (let zoom of [0,1,12,18,19]) {
        it(`should generate an action SET_ZOOM for ${zoom}`, () => expect(setZoom(zoom)).toEqual({ type: 'SET_ZOOM', zoom }))
    }
})


describe('setStyle', () => {
    for (let style of ['org','de','fr','grut']) {
        it(`should generate an action SET_STYLE for ${style}`, () => expect(setStyle(style)).toEqual({ type: 'SET_STYLE', style }))
    }
})
