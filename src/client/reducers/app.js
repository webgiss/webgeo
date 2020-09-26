import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import debug from './debug';
import geomap from './geomap';

export default (history) => combineReducers({
        router: connectRouter(history),
        geomap,
        debug,
});

