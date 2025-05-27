import React from 'react';
import { Provider } from 'react-redux';

import store from '@/redux/store';

export const withRedux = (Story) => (
    <Provider store={store}>
        <Story />
    </Provider>
);