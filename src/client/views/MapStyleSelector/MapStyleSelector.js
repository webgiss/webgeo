import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react'
import mapData from '../mapData'

const MapStyleSelector = ({ style, onStyleSelected }) => {
    window.x = onStyleSelected;
    return <div className='MapStyleSelector'>
        <Dropdown
            placeholder='Select map style'
            selection
            fluid
            // defaultValue={style}
            value={style}
            onChange={(e, { value }) => onStyleSelected(value)}
            options={Object.keys(mapData).map((key) => ({ key, text: mapData[key].name, value: key }))}
        />
    </div>
}

export default MapStyleSelector;