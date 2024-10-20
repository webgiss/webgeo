const openstreetmapRights = {
    name: "OpenStreetMap contributors",
    url: "http://osm.org/",
    license: {
        name: "ODbL",
        url: "http://osm.org/copyright",
    },
}

const thunderforestRights = {
    name: "Thunderforest",
    url: "http://thunderforest.com/",
}

const stamenRights = {
    name: "Stamen Design",
    url: "http://stamen.com/",
    license: {
        name: "CC BY 3.0",
        url: "https://creativecommons.org/licenses/by/3.0/",
    },
}

export default {
    org: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        name: "Org",
        maxZoom: 19,
        rights: [
            openstreetmapRights,
        ],
    },
    fr: {
        url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
        name: "FR",
        maxZoom: 20,
        rights: [
            openstreetmapRights,
        ],
    },
    de: {
        url: "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png",
        name: "DE",
        maxZoom: 20,
        rights: [
            openstreetmapRights,
        ],
    },
    hot: {
        url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        name: "Humanitarian",
        maxZoom: 20,
        rights: [
            openstreetmapRights,
        ],
    },
    bzh: {
        url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
        name: "BZH",
        maxZoom: 20,
        rights: [
            openstreetmapRights,
        ],
    },
    // toner: {
    //     url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
    //     name: "Toner",
    //     rights: [
    //         openstreetmapRights,
    //         stamenRights,
    //     ],
    // },
    // terrain: {
    //     url: "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
    //     name: "Terrain",
    //     rights: [
    //         openstreetmapRights,
    //         stamenRights,
    //     ],
    // },
    // watercolor: {
    //     url: "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
    //     name: "Watercolor",
    //     rights: [
    //         openstreetmapRights,
    //         stamenRights,
    //     ],
    // },
    opentopomap: {
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        name: "OpenTopoMap",
        maxZoom: 17,
        rights: [
            openstreetmapRights,
            {
                name: "SRMT",
                url: "http://viewfinderpanoramas.org/",
            },
            {
                name: "OpenTopoMap",
                url: "https://opentopomap.org/",
                license: {
                    name: "CC-BY-SA",
                    url: "https://creativecommons.org/licenses/by-sa/3.0/",
                },
            },
        ],
    },
    cyclosm: {
        url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
        name: "CyclOSM",
        maxZoom: 20,
        rights: [
            openstreetmapRights,
            {
                name: "CyclOSM",
                url: "https://github.com/cyclosm/cyclosm-cartocss-style/releases",
            },
        ],

    },
    opencyclemap: {
        url: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Open cycle map",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    Transport: {
        url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Transport",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    Landscape: {
        url: "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Landscape",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    Outdoors: {
        url: "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Outdoors",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    TransportDark: {
        url: "https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Transport Dark",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    SpinalMap: {
        url: "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Spinal Map",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    Pioneer: {
        url: "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Pioneer",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    MobileAtlas: {
        url: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Mobile Atlas",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    Neighbourhood: {
        url: "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Neighbourhood",
        maxZoom: 22,
        rights: [
            openstreetmapRights,
            thunderforestRights,
        ],
    },
    GoogleStreet: {
        url: "http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        name: "Google",
        maxZoom: 22,
        rights: [
            {
                url: "http://maps.google.com/",
                name: "Google",
            },
        ],
    },
    GoogleHybrid: {
        url: "http://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        name: "Google Hybrid",
        maxZoom: 22,
        rights: [
            {
                url: "http://maps.google.com/",
                name: "Google",
            },
        ],
    },
    GoogleSatellite: {
        url: "http://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        name: "Google Satellite",
        maxZoom: 22,
        rights: [
            {
                url: "http://maps.google.com/",
                name: "Google",
            },
        ],
    },
    ersi: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        name: "Esri.WorldImagery",
        maxZoom: 19,
        rights: [
            {
                name: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            },
        ],
    },
    geoportail_orthos: {
        url: "https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        name: "Geoportail photos",
        maxZoom: 19,
        rights: [
            {
                name: "Geoportail France",
                url: "https://geoportail.gouv.fr/",
            },
        ],
    },
    geoportail_parcels: {
        url: "https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=bdparcellaire&TILEMATRIXSET=PM&FORMAT=image/png&LAYER=CADASTRALPARCELS.PARCELS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        name: "Geoportail parcels",
        maxZoom: 20,
        rights: [{
            noosm: true,
            name: "Geoportail France",
            url: "https://geoportail.gouv.fr/",
        }]
    },
}
