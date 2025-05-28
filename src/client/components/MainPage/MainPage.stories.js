import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import MainPage from './index';

export default {
    title: 'App/MainPage',
    component: MainPage,
};

export const Default = {
    decorators: [withReduxState({
        geomap: {
        }
    })],
    args: {
    },
}

