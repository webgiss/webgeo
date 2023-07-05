import React from 'react';

import './CoordInputWindow.css'
import { Button, Modal } from 'semantic-ui-react';
import { Map as LeafMap, TileLayer } from 'react-leaflet';
import { getMapInfo } from '../../utils/mapData';

const CoordInputWindow = ({ open, inputCoord, hasCoord, parsingInfo, previewZoom, tech, human, onClose, onGoto, onInputCoordUpdated }) => {
    let previewPosition = tech ? [tech.lat, tech.lon] : null
    const { attribution, url } = getMapInfo('org')

    return <Modal
        className='CoordInputWindow'
        open={open}
        onClose={onClose}
    >
        <Modal.Header>Enter Coordinates</Modal.Header>
        <Modal.Content>
            <p>Enter coordinates in:</p>
            <ul>
                <li>Human readable format ( ex: <b className='CoordInputWindowExample'>52° 54' 48.88" N 4° 05' 56.96" W</b> or <b className='CoordInputWindowExample'>52 h 54 m 48.88 s N 4 h 05 m 56.96 s W</b> )</li>
                <li>Google format ( ex: <b className='CoordInputWindowExample'>52.91357988714921,-4.099155664443971</b> )</li>
                <li>OSM format ( ex: <b className='CoordInputWindowExample'>52.91357988714921/-4.099155664443971</b> )</li>
            </ul>
            <textarea 
                className='CoordInputWindowTextarea' 
                placeholder='Enter coordinates here...' 
                value={inputCoord}
                onChange={(e) => onInputCoordUpdated(e.target.value)} 
                ref={(element) => open && element && element.focus()}
            >{inputCoord}</textarea>
            <div className='CoordInputWindowParsingInfo'>{parsingInfo}
            </div>
            <div className='CoordInputWindowCoords'>
                <div className='CoordInputWindowCoordsHeader CoordInputWindowCoordsLine'>
                    <div className='CoordInputWindowCoordsHeaderLat CoordInputWindowCoordsItemHeader'>Latitude</div>
                    <div className='CoordInputWindowCoordsHeaderLon CoordInputWindowCoordsItemHeader'>Longitude</div>
                </div>
                <div className='CoordInputWindowCoordsTech CoordInputWindowCoordsLine'>
                    <div className='CoordInputWindowCoordsTechLat CoordInputWindowCoordsItem'>{hasCoord ? tech.lat : '-'}</div>
                    <div className='CoordInputWindowCoordsTechLon CoordInputWindowCoordsItem'>{hasCoord ? tech.lon : '-'}</div>
                </div>
                <div className='CoordInputWindowCoordsHuman CoordInputWindowCoordsLine'>
                    <div className='CoordInputWindowCoordsHumanLat CoordInputWindowCoordsItem'>{hasCoord ? human.lat : '-'}</div>
                    <div className='CoordInputWindowCoordsHumanLon CoordInputWindowCoordsItem'>{hasCoord ? human.lon : '-'}</div>
                </div>
                {
                    hasCoord
                        ?
                        <LeafMap
                            center={previewPosition}
                            zoom={previewZoom}
                            className='CoordInputWindowMap'
                        >
                            <TileLayer
                                attribution={attribution}
                                url={url}
                            />

                        </LeafMap>
                        :
                        <div className='CoordInputWindowNoMap' />
                }
            </div>
        </Modal.Content>
        <Modal.Actions>
            <Button color="black" onClick={onClose}>Close</Button>
            <Button color="green" onClick={onGoto} disabled={!hasCoord}>Go to</Button>
        </Modal.Actions>
    </Modal>
}

export default CoordInputWindow;