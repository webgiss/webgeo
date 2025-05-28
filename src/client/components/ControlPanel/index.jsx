import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './ControlPanel.css'
import { Form, TextArea } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { actions } from '@/redux/slices'
import { useGeohash, useLat, useLatText, useLon, useLonText, useZoom } from '@/redux/selectors/geomap.js'
import MapStyleSelector from '@/components/MapStyleSelector'
import ActionButton from '@/components/ActionButton'
import ExtLinkButton from '@/components/ExtLinkButton'
import AboutButton from '@/components/AboutButton'
import { getOnClick } from '@/tools/components/helper';

export default createComponent(() => {
    const dispatch = useDispatch()

    const lat = useLat()
    const lon = useLon()
    const latText = useLatText()
    const lonText = useLonText()
    const zoom = useZoom()
    const geohash = useGeohash()

    const onInputCoord = getOnClick(dispatch, actions.geomap.openInputCoordWindow)

    return (
        <div className='ControlPanel'>
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
                <hr />
                <ActionButton text='Input Coord' onClick={onInputCoord} />
                <hr />
                <ExtLinkButton text='Google' url={`https://maps.google.com/maps/@${lat},${lon},${zoom}z`} />
                <ExtLinkButton text='OSM' url={`https://www.openstreetmap.org/#map=${zoom}/${lat}/${lon}`} />
                <ExtLinkButton text='Bing' url={`https://www.bing.com/maps?cp=${lat}~${lon}&lvl=${zoom}`} />
                <ExtLinkButton text='Géoportail' url={`https://www.geoportail.gouv.fr/carte?c=${lon},${lat}&z=${zoom}&l0=ORTHOIMAGERY.ORTHOPHOTOS::GEOPORTAIL:OGC:WMTS(1)&permalink=yes`} />
                <hr />
                <ExtLinkButton text='Windy' url={`https://www.windy.com/${lat}/${lon}?pressure,${lat},${lon},${zoom}`} />
                <ExtLinkButton text='nullschool' url={`https://earth.nullschool.net/#current/wind/surface/level/orthographic=${lon},${lat},4000/loc=${lon},${lat}`} />
                <ExtLinkButton text='blitzortung' url={`https://map.blitzortung.org/#${zoom - 1}/${lat}/${lon}`} />
                <AboutButton text='About' />
            </Form>
        </div>
    )
})
