import React from 'react';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
// import { enhancer } from "storybook-addon-redux-store";

import storeCreator from '@/redux/storeCreator';
import { reducer, slices } from '@/redux/slices';

export const withRedux = (Story) => {
    const store = storeCreator()
    return (
        <Provider store={store}>
            <Story />
        </Provider>
    )
}

export const withReduxState = (patchState) => (Story) => {
    console.log({ patchState, slices });
    const preloadedState = Object.fromEntries(
        Object.values(slices).map(slice => {
            const subState = slice.getInitialState();
            if (patchState && patchState[slice.name]) {
                return [slice.name, { ...subState, ...patchState[slice.name] }]
            }
            return [slice.name, subState]
        }))
    const store = configureStore({
        reducer,
        preloadedState,
    });

    return (
        <Provider store={store}>
            <Story />
        </Provider>
    );
}