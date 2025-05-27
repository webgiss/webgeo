import { combineReducers } from 'redux';
import geomap from './slice/geomap';

export const sliceList = [
    geomap,
]

export const slices = sliceList.reduce((acc, slice) => {
    acc[slice.name] = slice;
    return acc;
}, {});

export const reducer = sliceList.reduce((acc, slice) => {
    acc[slice.name] = slice.reducer;
    return acc;
}, {});

export const actions = sliceList.reduce((acc, slice) => {
    acc[slice.name] = slice.actions;
    return acc;
}, {});


