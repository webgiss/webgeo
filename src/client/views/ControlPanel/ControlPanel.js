import React from 'react';
import { Form, TextArea } from 'semantic-ui-react'
import ExtLinkButton from '../ExtLinkButton/ExtLinkButton';
import MapStyleSelector from '../MapStyleSelector'
import './ControlPanel.css'
import AboutButton from '../AboutButton';

const ControlPanel = ({ lat, lon, latText, lonText, zoom, geohash }) => {
    return <div className='ControlPanel'>
        <Form className='ControlPanelForm'>
            <Form.Input label='lat' value={lat} readOnly={true} />
            <Form.Input label='lon' value={lon} readOnly={true} />
            <TextArea
                label='latlontext'
                value={`${latText}\n${lonText}`}
                readOnly={true}
                rows={2}
                style={{ resize: 'none', textAlign: 'right' }}
            />
            <Form.Input label='geohash' value={geohash} readOnly={true} />
            <Form.Input label='zoom' value={zoom} readOnly={true} />
            <Form.Field label='style' >
            </Form.Field>
            <MapStyleSelector />
            <hr/>
            <ExtLinkButton text='Google' url={`https://maps.google.com/maps/@${lat},${lon},${zoom}z`}/>
            <ExtLinkButton text='OSM' url={`https://www.openstreetmap.org/#map=${zoom}/${lat}/${lon}`} />
            <ExtLinkButton text='Géoportail' url={`https://www.geoportail.gouv.fr/carte?c=${lon},${lat}&z=${zoom}&l0=ORTHOIMAGERY.ORTHOPHOTOS::GEOPORTAIL:OGC:WMTS(1)&permalink=yes`} />
            <hr/>
            <ExtLinkButton text='Windy' url={`https://www.windy.com/${lat}/${lon}?pressure,${lat},${lon},${zoom}`} />
            <ExtLinkButton text='nullschool' url={`https://earth.nullschool.net/#current/wind/surface/level/orthographic=${lon},${lat},4000/loc=${lon},${lat}`} />
            <ExtLinkButton text='blitzortung' url={`https://map.blitzortung.org/#${zoom-1}/${lat}/${lon}`} />
            <AboutButton text='About' />
        </Form>
    </div>
}

export default ControlPanel;
