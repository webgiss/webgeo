import React, { createRef } from 'react';
import createComponent from '@/tools/components/createComponent';
import './Map.css'

import { Map as LeafMap, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { getMapInfo } from '@/utils/mapData';

import { actions } from '@/redux/slices'
import { useDispatch } from 'react-redux'
import { useAddrcoord, useAddress, useGeohash, useLat, useLatText, useLon, useLonText, useMarks, useNLat, useNLon, useStyle, useUseMilliGraticule, useZoom } from '@/redux/selectors/geomap';

const lastImpose = {
    lat: null,
    lon: null,
    time: null,
}

export default createComponent(() => {
    const dispatch = useDispatch()

    const lat = useLat()
    const lon = useLon()
    const nlat = useNLat()
    const nlon = useNLon()
    const latText = useLatText()
    const lonText = useLonText()
    const zoom = useZoom()
    const style = useStyle()
    const geohash = useGeohash()
    let marks = useMarks()
    const address = useAddress()
    const addrcoord = useAddrcoord()
    const useMilliGraticule = useUseMilliGraticule()

    if (! useMilliGraticule) {
        marks = null
    }

    const onCenter = (lat, lon) => dispatch(actions.geomap.setCoord({ lat, lon }))
    const onZoom = (zoom) => dispatch(actions.geomap.setZoom({ zoom }))
    const onNeedAddress = (lat, lon) => dispatch(actions.geomap.needAddress({ lat, lon }))
    const onPopupStatusChanged = (status) => dispatch(actions.geomap.setPopupStatus({ status }))

    const position = [lat, lon]
    const mapRef = createRef();

    if (lat !== lastImpose.lat || lon !== lastImpose.lon) {
        lastImpose.lat = lat
        lastImpose.lon = lon
        lastImpose.time = (new Date()).getTime()
    }

    const addressToDisplay = address || '...'

    const dataInfo = getMapInfo(style)


    if (dataInfo) {
        const { url, maxZoom, attribution } = dataInfo

        const onMoveEnd = (e) => {
            const time = (new Date()).getTime()
            if (time - lastImpose.time >= 800) {
                if (onCenter) {
                    const x = e.sourceTarget.dragging._map.getCenter();
                    onCenter(x.lat, x.lng)
                }
            }
        }
        const onZoomEnd = (e) => {
            if (onZoom) {
                const new_zoom = e.sourceTarget.dragging._map.getZoom();
                if (new_zoom !== zoom) {
                    onZoom(new_zoom)
                }
            }
        }
        const onClick = (e) => {
            const map = mapRef.current;
            if (map) {
                if (onCenter) {
                    onCenter(e.latlng.lat, e.latlng.lng)
                }
            }
        }
        const onPopupOpen = (e) => {
            if ((!address) && onNeedAddress) {
                onNeedAddress(lat, lon)
            }
            if (onPopupStatusChanged) {
                onPopupStatusChanged(true)
            }
        }
        const onPopupClose = (e) => {
            if (onPopupStatusChanged) {
                onPopupStatusChanged(false)
            }
        }

        return (
            <div className='map'>
                <LeafMap
                    center={position}
                    zoom={zoom}
                    ref={mapRef}
                    onMoveEnd={onMoveEnd}
                    onZoomEnd={onZoomEnd}
                    onClick={onClick}
                >
                    <TileLayer
                        key={maxZoom}
                        attribution={attribution}
                        url={url}
                        maxZoom={25}
                        maxNativeZoom={maxZoom}
                    />
                    {
                        addrcoord ?
                            <Circle center={addrcoord} color='#ff3322' radius={2} ></Circle>
                            : null
                    }
                    <Marker position={position} onPopupOpen={onPopupOpen} onPopupClose={onPopupClose}>
                        <Popup>
                            Lat: {nlat} ({latText})
                            <br />
                            Lon: {nlon} ({lonText})
                            <br />
                            <div className='MapAddress'>{addressToDisplay}</div>
                            <br />
                            <br />
                            Geohash: {geohash}
                        </Popup>
                    </Marker>
                    {
                        marks ?
                            marks.map((mark, index) =>
                                <Marker key={index} position={[mark.lat, mark.lon]}>
                                    <Popup>
                                        Lat: {mark.lat}
                                        <br />
                                        Lon: {mark.lon}
                                    </Popup>
                                </Marker>
                            )
                            : null
                    }
                </LeafMap>
            </div>
        )
    }
    else {
        return (
            <div className='map'></div>
        )

    }
})
