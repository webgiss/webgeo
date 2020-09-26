import { ReactReduxInit } from './init/reactRedux';
import initView from './init/view';
import initRedux from './init/redux';

import actions from './actions';
import reducer from './reducers/app';
import Routes from './views/routes/index';
import configDao from './dao/config';

import * as geomap from './actions/geomap';
import DebugService from './service/debug';
import HashUpdater from './service/HashUpdater'
import AddressUpdater from './service/AddressUpdater'

Object.assign(actions, { geomap });
const reactReduxInit = new ReactReduxInit(initView, initRedux);

window.Routes = Routes

reactReduxInit.rootElement = document.body.children[0];
reactReduxInit.baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
reactReduxInit.reducer = reducer;
reactReduxInit.routes = Routes;

[
    DebugService,
    HashUpdater,
    AddressUpdater,
].map((serviceClass) => new serviceClass(reactReduxInit));

reactReduxInit.init();

if (module.hot) {
    module.hot.accept();
}

window.config = configDao.config;
