import { describe, expect } from "vitest"

import geomapSlice from "./geomap"
import {
    setCoord, setZoom, setStyle, useMilliGraticule, setPopupStatus, openAboutWindow, closeAboutWindow, openInputCoordWindow, closeInputCoordWindow, updateInputCoordWindow, importInputCoord, locationChange, needAddress,
} from "./geomap"
import configureStore from 'redux-mock-store'

const initialState = geomapSlice.sliceStruct.initialState

const fetchParam = { lat: 10, lon: 20 }
const fakeFetchString = '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[10.0001,20.0023]},"properties":{"type":"housenumber","name":"35 Rue des Grut","label":"35 Rue des Grut 99002 Mank","street":"Rue des Grut","postcode":"99002","citycode":"99123","city":"Mank","oldcitycode":null,"oldcity":null,"district":"Shon","context":"99, Mank, Bar","importance":0.59355,"housenumber":"35","id":"99123_0021_00035","banId":null,"x":650842.1,"y":6863545.36,"distance":13,"score":0.9987,"_type":"address"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[10.0002,20.0022]},"properties":{"type":"housenumber","name":"37 Rue des Grut","label":"37 Rue des Grut 99002 Mank","street":"Rue des Grut","postcode":"99002","citycode":"99123","city":"Mank","oldcitycode": null,"oldcity":null,"district":"Shon","context":"99, Mank, Bar","importance":0.59350,"housenumber":"35","id":"99123_0021_00037","banId":null,"x":650842.1,"y":6863545.36,"distance":13,"score":0.9980,"_type":"address"}}]}'

describe("geomapSlice", () => {
    it("should handle initial state", () => {
        const state = geomapSlice.getInitialState()
        expect(state).toEqual(initialState)
    })

    it("should handle setCoord", () => {
        const state = geomapSlice.reducer(undefined, setCoord({ lat: 10, lon: 20 }))
        expect(state.lat).toBe(10)
        expect(state.lon).toBe(20)
    })

    it("should handle setCoord with all fields", () => {
        const state = geomapSlice.reducer(undefined, setCoord({ lat: 0.52131921, lon: -0.98765431 }))
        expect(state.lat).toBe(0.52131921)
        expect(state.lon).toBe(-0.98765431)
        expect(state.geohash).toBe("ebp6cwbucuzw")
        expect(state.marks).toStrictEqual([{
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
        ])
        expect(state.nlat).toBe(0.521319)
        expect(state.nlon).toBe(-0.987655)
        expect(state.latText).toBe("0° 31' 16.74\" N")
        expect(state.lonText).toBe("0° 59' 15.55\" W")
        expect(state.latCan).toBe("00:31:16.74N")
        expect(state.lonCan).toBe("00:59:15.55W")
    })

    it("should handle setZoom", () => {
        const state = geomapSlice.reducer(undefined, setZoom({ zoom: 5 }))
        expect(state.zoom).toBe(5)
    })

    it("should handle setStyle", () => {
        const state = geomapSlice.reducer(undefined, setStyle({ style: "satellite" }))
        expect(state.style).toBe("satellite")
    })

    it("should handle useMilliGraticule", () => {
        const state = geomapSlice.reducer(undefined, useMilliGraticule(true))
        expect(state.useMilliGraticule).toBe(true)
    })

    it("should handle setPopupStatus", () => {
        expect(initialState.popupStatus).toBe(false)

        const state = geomapSlice.reducer(initialState, setPopupStatus({ status: true }))
        expect(state.popupStatus).toBe(true)
    })

    it("should handle openAboutWindow", () => {
        expect(initialState.aboutWindowOpened).toBe(false)

        const state = geomapSlice.reducer(initialState, openAboutWindow())
        expect(state.aboutWindowOpened).toBe(true)
    })

    it("should handle closeAboutWindow", () => {
        const state1 = geomapSlice.reducer(initialState, openAboutWindow())
        expect(state1.aboutWindowOpened).toBe(true)

        const state2 = geomapSlice.reducer(state1, closeAboutWindow())
        expect(state2.aboutWindowOpened).toBe(false)
    })

    it("should handle openInputCoordWindow", () => {
        expect(initialState.inputCoordWindowOpened).toBe(false) // Initial state

        const state = geomapSlice.reducer(initialState, openInputCoordWindow())
        expect(state.inputCoordWindowOpened).toBe(true)
    })

    it("should handle closeInputCoordWindow", () => {
        const state1 = geomapSlice.reducer(initialState, openInputCoordWindow())
        expect(state1.inputCoordWindowOpened).toBe(true)

        const state2 = geomapSlice.reducer(state1, closeInputCoordWindow())
        expect(state2.inputCoordWindowOpened).toBe(false)
    })

    it("should handle needAddress fullfield", async () => {
        const state1 = geomapSlice.reducer(initialState, setCoord({lat: 10, lon: 20}))
        expect(state1.lat).toBe(10)
        expect(state1.lon).toBe(20)
        expect(state1.address).toBeNull()
        expect(state1.addrcoord).toBeNull()

        const mutableState = JSON.parse(JSON.stringify(state1))
        geomapSlice.sliceStruct.asyncReducers.needAddress[2](mutableState, {payload: {lat: 10, lon: 20, address: ["Dummy address 1", "Dummy address 2"], addrcoord: [10.001, 19.998]}})

        expect(mutableState.lat).toBe(10)
        expect(mutableState.lon).toBe(20)
        expect(mutableState.address).toStrictEqual(["Dummy address 1", "Dummy address 2"])
        expect(mutableState.addrcoord).toStrictEqual([10.001, 19.998])
    })
})