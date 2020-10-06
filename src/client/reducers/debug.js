import configDao from '../dao/config';
import { MD5, SHA256 } from 'crypto-js'
import mapData from '../views/mapData'

const initialState = {};

export default (state, action) => {
    state = state || initialState;

    if (configDao.config.useDebug) {
        console.log('action: [' + action.type + ']', action);
        window.mapData = mapData
        window.MD5 = MD5
        window.SHA256 = SHA256
        window.formatDate = (day,month,year) => new Date(`${month} ${day} ${year} Z`).toISOString().substring(0,10)
        window.gh = (s) => {
            const x= MD5(s);
            const md5 = x.toString();
            const max = parseInt('100000000',16);
            console.log(md5)
            const [hi,lo] = [md5.slice(0,8), md5.slice(16,24)]
            const [hidec, lodec] = [parseInt(hi,16)/max, parseInt(lo,16)/max]
            console.log(hidec)
            console.log(lodec)
        }

        // fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${state.geomap.lon}&lat=${state.geomap.lat}`).then(x=>x.text()).then(result=>JSON.parse(result)).then(result=>result.features.map(f=>`${f.properties.label} (${f.properties.score})`).join('\n')).then(x=>console.log(x))
        
    }

    return state;
}; 
