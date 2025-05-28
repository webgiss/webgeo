import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import CoordInputWindow from './index';

export default {
    title: 'Popup/CoordInputWindow',
    component: CoordInputWindow,
    parameters: {
    },
};


export const Opened = {
    decorators: [withReduxState({
        geomap: {
            inputCoordWindowOpened: true,
        }
    })],
    args: {
    },
}

export const OpenedWithPartialData = {
    decorators: [withReduxState({
        geomap: {
            inputCoordWindowOpened: true,
            inputCoord: `52° 54' 48.88" N 4° 05'`,
            inputCoordParsed: null,
            inputCoordParsedError: `Don't understand [52° 54' 48.88" N 4° 05']`,
        }
    })],
    args: {
    },
}

export const OpenedWithFullData = {
    decorators: [withReduxState({
        geomap: {
            inputCoordWindowOpened: true,
            inputCoord: `52° 54' 48.88" N 4° 05' 56.96" W`,
            inputCoordParsed: {
                tech: { lat: 52.91357988714921, lon: -4.099155664443971 },
                human: { lat: `52° 54' 48.88" N`, lon: `4° 05' 56.96" W` },
                can: { lat: "52:54:48.88N", lon: "04:05:56.96W" },
            },
            inputCoordParsedError: null,
        }
    })],
    args: {
    },
}

export const Closed = {
    decorators: [withReduxState({
        geomap: {
            inputCoordWindowOpened: false,
        }
    })],
    args: {
    },
}
