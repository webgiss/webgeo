import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './Title.css'
import { useAddress, useLatText, useLonText, useNLat, useNLon } from '@/redux/selectors/geomap.js'

import { Helmet } from 'react-helmet';

export default createComponent(() => {
    const nlat = useNLat()
    const nlon = useNLon()
    const latText = useLatText()
    const lonText = useLonText()
    const address = useAddress()

    let title = `Geo (${nlat}, ${nlon}) - ${latText} ${lonText}`
    if (address) {
        title = `${title} - ${address}`
    }

    return (
        <div className='Title'>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>
    )
})
