import React from 'react';
import { Helmet } from 'react-helmet';
import Map from '../Map'
import './MainPage.css'
import Title from '../Title';
import ControlPanel from '../ControlPanel';
import AboutWindow from '../AboutWindow';
import CoordInputWindow from '../CoordInputWindow';

const MainPage = ({ }) => {
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
}

export default MainPage;
