import React, { createRef } from 'react';
import { Map as LeafMap, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

import './Map.css';
import { getMapInfo } from '../../utils/mapData';

const lastImpose = {
    lat: null,
    lon: null,
    time: null,
}

const Map = ({ lat, lon, nlat, nlon, latText, lonText, zoom, style, geohash, onCenter, onZoom, marks, address, addrcoord, onNeedAddress, onPopupStatusChanged }) => {
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
                map.leafletElement.locate()
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

        return <div className='map'>
            <LeafMap
                center={position}
                maxZoom={25}
                maxNativeZoom={maxZoom}
                zoom={zoom}
                ref={mapRef}
                onMoveEnd={onMoveEnd}
                onZoomEnd={onZoomEnd}
                onClick={onClick}
            >
                <TileLayer
                    attribution={attribution}
                    url={url}
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
                        {addressToDisplay}
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
    }
    else {
        return <div className='map'></div>;
    }
}

export default Map;
