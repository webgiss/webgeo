import React from 'react';
import { Form, TextArea } from 'semantic-ui-react'
import ExtLinkButton from '../ExtLinkButton/ExtLinkButton';
import MapStyleSelector from '../MapStyleSelector'
import './ControlPanel.css'

const ControlPanel = ({ lat, lon, latText, lonText, zoom, geohash }) => {
    return <div className='ControlPanel'>
        <Form>
            <Form.Input label='lat' value={lat} readOnly={true} />
            <Form.Input label='lon' value={lon} readOnly={true} />
            <TextArea
                label='latlontext'
                value={`${lonText}\n${latText}`}
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
            <ExtLinkButton text='OSM' url={`https://www.openstreetmap.org/#map=${zoom}/${lat}/${lon}`}/>
        </Form>
    </div>
}

export default ControlPanel;