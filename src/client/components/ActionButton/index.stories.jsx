import { fn } from '@storybook/test';

import ActionButton from './index';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator';

export default {
    title: 'Component/ActionButton',
    component: ActionButton,
    decorators: [withReduxState({})],
    tags: ['autodocs'],
    parameters: {},
    args: {
        text: 'Action',
        onClick: fn(),
    },
};

export const Site1 = {
    args: {
        text: 'Site 1',
    },
};

export const Site2 = {
    args: {
        text: 'Site 2',
    },
};