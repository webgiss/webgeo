import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MapStyleSelector from './index';

export default {
    title: 'Component/MapStyleSelector',
    component: MapStyleSelector,
    tags: ['autodocs'],
};

export const Default = {
    decorators: [withReduxState({
        geomap: {
        }
    })],
}
export const FR = {
    decorators: [withReduxState({
        geomap: {
            style: "fr",
        }
    })],
}

export const DE = {
    decorators: [withReduxState({
        geomap: {
            style: "de",
        }
    })],
}

export const Google = {
    decorators: [withReduxState({
        geomap: {
            style: "GoogleStreet",
        }
    })],
}

