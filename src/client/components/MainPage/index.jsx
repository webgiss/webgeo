import React from 'react';
import createComponent from '@/tools/components/createComponent';
import './MainPage.css'
import Map from '@/components/Map'
import Title from '@/components/Title'
import ControlPanel from '@/components/ControlPanel'
import AboutWindow from '@/components/AboutWindow'
import CoordInputWindow from '@/components/CoordInputWindow'
import { Helmet } from 'react-helmet';

export default createComponent(() => {
    return <div className='mainPage'>
        <Helmet>
            <title>Geo</title>
        </Helmet>
        <ControlPanel/>
        <Title/>
        <Map/>
        <AboutWindow/>
        <CoordInputWindow/>
    </div>
})
