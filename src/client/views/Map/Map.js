import React, { createRef } from 'react';
import { Map as LeafMap, TileLayer, Marker, Popup } from 'react-leaflet';
import mapData from '../mapData'

import './Map.css';

const lastImpose = {
    lat: null,
    lon: null,
    time: null,
}

const Map = ({ lat, lon, nlat, nlon, zoom, style, onCenter, onZoom, marks, address, onNeedAddress, onPopupStatusChanged }) => {
    const position = [lat, lon]
    const mapRef = createRef();

    if (lat !== lastImpose.lat || lon !== lastImpose.lon) {
        lastImpose.lat = lat
        lastImpose.lon = lon
        lastImpose.time = (new Date()).getTime()
    }

    const addressToDisplay = address || '...'

    if (mapData[style]) {

        let attribution = '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
        const url = mapData[style].url;
        const rights = mapData[style].rights;
        if (rights) {
            if (rights.noosm) {
                attribution = `<a href="${rights.url}">${rights.name}</a>`;
            } else {
                attribution = `${attribution} | <a href="${rights.url}">${rights.name}</a>`;
            }
            if (rights.license) {
                attribution = `${attribution} (<a href="${rights.license.url}">${rights.license.name}</a>))`;
            }
        }
        const onMoveEnd = (e) => {
            // console.log('onMoveEnd', e)
            const time = (new Date()).getTime()
            if (time-lastImpose.time >= 800) {
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
                <Marker position={position} onPopupOpen={onPopupOpen} onPopupClose={onPopupClose}>
                    <Popup>
                        Lat: {nlat}
                        <br />
                        Lon: {nlon}
                        <br />
                        {addressToDisplay}
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
