import configDao from '../dao/config';

export default (params) => {
    // @ts-ignore
    if (configDao.debug) {
        // @ts-ignore
        window.exported = { ...(window.exported||{}), ...params };
    }
} 
