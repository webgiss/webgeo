import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import AboutWindow from './index';

export default {
    title: 'Popup/AboutWindow',
    component: AboutWindow,
    parameters: {},
    args: {},
};

export const Opened = {
    decorators: [withReduxState({
        geomap: {
            aboutWindowOpened: true,
        },
    })],
    args: {
    },
}

export const Closed = {
    decorators: [withReduxState({
        geomap: {
            aboutWindowOpened: false,
        },
    })],
    args: {
    },
}

