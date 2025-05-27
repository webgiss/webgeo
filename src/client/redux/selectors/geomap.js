import { useSelector } from "react-redux";

export const useAboutWindowOpened = () => useSelector((state) => state.geomap.aboutWindowOpened)

export const useLat = () => useSelector((state) => state.geomap.lat)
export const useLon = () => useSelector((state) => state.geomap.lon)
export const useLatText = () => useSelector((state) => state.geomap.latText)
export const useLonText = () => useSelector((state) => state.geomap.lonText)
export const useZoom = () => useSelector((state) => state.geomap.zoom)
export const useGeohash = () => useSelector((state) => state.geomap.geohash)
export const useStyle = () => useSelector((state) => state.geomap.style)
export const useInputCoordWindowOpened = () => useSelector((state) => state.geomap.inputCoordWindowOpened)
export const useInputCoord = () => useSelector((state) => state.geomap.inputCoord)
export const useInputCoordParsed = () => useSelector((state) => state.geomap.inputCoordParsed)
export const useInputCoordParsedError = () => useSelector((state) => state.geomap.inputCoordParsedError)
export const useInputCoordZoom = () => useSelector((state) => state.geomap.inputCoordZoom)

export const useMarks = () => useSelector((state) => state.geomap.marks)
export const useAddress = () => useSelector((state) => state.geomap.address)
export const useAddrcoord = () => useSelector((state) => state.geomap.addrcoord)
export const useUseMilliGraticule = () => useSelector((state) => state.geomap.useMilliGraticule)
export const useNLat = () => useSelector((state) => state.geomap.nlat)
export const useNLon = () => useSelector((state) => state.geomap.nlon)

