import { fn } from '@storybook/test';

import AboutButton from './index';


export default {
    title: 'App/AboutButton',
    component: AboutButton,
    parameters: {
    },
    tags: ['autodocs'],
    args: {
        text: 'About',
    },
};

export const About = {
    args: {
        text: 'About',
    },
};

export const FancyName = {
    args: {
        text: 'Fancy Name',
    },
};

