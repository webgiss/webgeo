import { fn } from '@storybook/test';
import { withReduxState } from '@/tools/components/storybook/withReduxDecorator'

import Title from './index';

export default {
    title: 'App/Title',
    component: Title,
    tags: ['autodocs'],
    args: {
    },
};

export const Paris_z15_osm_org = {
    decorators: [withReduxState({
        geomap: {
            lat: 48.870699459792846,
            lon: 2.33236312866211,
            nlat: 48.870699,
            nlon: 2.332363,
            latText: `48° 52' 14.51" N`,
            lonText: `2° 19' 56.5" E`,
            latCan: "48:52:14.51N",
            lonCan: "02:19:56.5E",
            geohash: "u09wj0dkkn8j",
            zoom: 15,
            style: "org",
        },
    })],
    args: {
    },
}

export const Berlin_z11_osm_de = {
    decorators: [withReduxState({
        geomap: {
            lat: 52.51851897366125,
            lon: 13.404693603515627,
            nlat: 52.518518,
            nlon: 13.404693,
            latText: "52° 31' 6.66\" N",
            lonText: "13° 24' 16.89\" E",
            latCan: "52:31:6.66N",
            lonCan: "13:24:16.89E",
            geohash: "u33dc09n8180",
            zoom: 11,
            style: "de",
        },
    })],
    args: {
    },
}

export const Ankara_z19_google_sat = {
    decorators: [withReduxState({
        geomap: {
            lat: 39.93770916954525,
            lon: 32.8646805882454,
            nlat: 39.937709,
            nlon: 32.864681,
            latText: "39° 56' 15.75\" N",
            lonText: "32° 51' 52.85\" E",
            latCan: "39:56:15.75N",
            lonCan: "32:51:52.85E",
            geohash: "sxp75y7q48d4",
            zoom: 19,
            style: "GoogleSatellite",
        },
    })],
    args: {
    },
}
