import { combineReducers } from 'redux';
import geomap from './slice/geomap';

export const slices = [
    geomap,
]

export const reducer = slices.reduce((acc, slice) => {
    acc[slice.name] = slice.reducer;
    return acc;
}, {});


export const actions = slices.reduce((acc, slice) => {
    acc[slice.name] = slice.actions;
    return acc;
}, {});


