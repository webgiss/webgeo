import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import { getStyleNames } from '../../utils/mapData';


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
            options={getStyleNames().map((item) => ({ key: item.key, text: item.name, value: item.key }))}
        />
    </div>
}

export default MapStyleSelector;