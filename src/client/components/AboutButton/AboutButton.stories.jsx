import React from 'react'
import { fn } from '@storybook/test'
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import AboutButton from './index';

export default {
    title: 'Component/AboutButton',
    decorators: [withReduxState({})],
    component: AboutButton,
    tags: ['autodocs'],
    parameters: {},
    args: {},
};


export const About = {
    args: {
        text: 'About',
    }
}

export const FancyName = {
    args: {
        text: 'Fancy name',
    }
}


