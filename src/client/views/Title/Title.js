import React from 'react';
import { Helmet } from 'react-helmet';

import './Title.css'

/**
 * 
 * @param {Object} params
 * @param {number} params.nlat
 * @param {number} params.nlon
 * @param {string} params.address
 */
const Title = ({ nlat, nlon, latText, lonText, address }) => {
    let title = `Geo (${nlat}, ${nlon}) - ${lonText} - ${latText}`
    if (address) {
        title = `${title} - ${address}`
    }
    return <div className='Title'>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        Map ( {nlat}, {nlon} ) - {lonText} - {latText} {address ? ' - '+address : ''}
    </div>
}

export default Title;
