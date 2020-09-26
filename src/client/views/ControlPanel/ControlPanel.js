import React from 'react';
import { Form } from 'semantic-ui-react'
import MapStyleSelector from '../MapStyleSelector'
import './ControlPanel.css'

const ControlPanel = ({ lat, lon, zoom }) => {
    return <div className='ControlPanel'>
        <Form>
            <Form.Input label='lat' value={lat} readOnly={true} />
            <Form.Input label='lon' value={lon} readOnly={true} />
            <Form.Input label='zoom' value={zoom} readOnly={true} />
            <Form.Field label='style' >
            </Form.Field>
            <MapStyleSelector />
        </Form>
    </div>
}

export default ControlPanel;