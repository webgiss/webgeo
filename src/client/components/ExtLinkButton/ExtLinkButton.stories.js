import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import ExtLinkButton from './index';

export default {
    title: 'Component/ExtLinkButton',
    component: ExtLinkButton,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        text: 'External Link',
        url: 'https://example.com',
    },
}

export const Site1 = {
    args: {
        text: 'Site 1',
        url: 'https://site1.example.com',
    },
}

export const Site2 = {
    args: {
        text: 'Site 2',
        url: 'https://site2.example.com',
    },
}
