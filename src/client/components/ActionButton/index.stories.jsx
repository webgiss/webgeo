import { fn } from '@storybook/test';

import ActionButton from './index';

export default {
    title: 'App/ActionButton',
    component: ActionButton,
    parameters: {
    },
    tags: ['autodocs'],
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