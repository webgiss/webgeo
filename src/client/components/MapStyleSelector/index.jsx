import React from 'react'
import createComponent from '../helper/createComponent.jsx'
import { Dropdown } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/slices/index.js'
import { useStyle } from '../../redux/selectors/geomap.js'
import { getStyleNames } from '../../utils/mapData';

export default createComponent(() => {
    const dispatch = useDispatch()

    const style = useStyle()

    const onStyleSelected = (style) => dispatch(actions.geomap.setStyle({ style }))

    return (
        <div className='MapStyleSelector'>
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
    )
})
