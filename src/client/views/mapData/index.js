export default {
    org: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        name: "Org",
    },
    fr: {
        url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
        name: "FR",
    },
    de: {
        url: "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png",
        name: "DE",
    },
    hot: {
        url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        name: "Humanitarian",
    },
    bzh: {
        url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
        name: "BZH",
    },
    stamen: {
        url: "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png",
        name: "Stamen",
    },
    watercolor: {
        url: "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
        name: "Watercolor",
    },
    opentopomap: {
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        name: "OpenTopoMap",
        rights: {
            name: "OpenTopoMap",
            url: "https://opentopomap.org/",
            license: {
                name: "CC-BY-SA",
                url: "https://creativecommons.org/licenses/by-sa/3.0/",
            },
        },
    },
    cyclosm :{
        url : "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
        name: "CyclOSM",
        maxZoom: 20,
        rights: {
            name: "CyclOSM",
            url: "https://github.com/cyclosm/cyclosm-cartocss-style/releases",
        },

    },
    opencyclemap: {
        url: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Open cycle map",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    Transport: {
        url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Transport",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    Landscape: {
        url: "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Landscape",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    Outdoors: {
        url: "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Outdoors",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    TransportDark: {
        url: "https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Transport Dark",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    SpinalMap: {
        url: "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Spinal Map",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    Pioneer: {
        url: "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Pioneer",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    MobileAtlas: {
        url: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Mobile Atlas",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    Neighbourhood: {
        url: "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=abcbe43a37fb45d9b4de9972daab74c7",
        name: "Neighbourhood",
        rights: {
            url: "http://www.thunderforest.com/",
            name: "Thunderforest",
        },
    },
    // route500: {
    //     url: "https://{s}.tile.openstreetmap.fr/route500/{z}/{x}/{y}.png",
    //     name: "Route500",
    // },
    ersi: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        name: "Esri.WorldImagery",
        rights: {
            name: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        },
        // Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community
    },
    // stravacycling: {
    //     url: "https://heatmap-external-{s}.strava.com/tiles/ride/bluered/{z}/{x}/{y}.png",
    //     name: "Strava Cycling Map",
    //     rights: {
    //         name: "https://www.strava.com/heatmap",
    //         url: "https://www.strava.com/heatmap",
    //     }
    // },
    geoportail_parcels: {
        url: "https://wxs.ign.fr/choisirgeoportail/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=bdparcellaire&TILEMATRIXSET=PM&FORMAT=image/png&LAYER=CADASTRALPARCELS.PARCELS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        name: "Geoportail parcels",
        maxZoom: 20,
        rights: {
            noosm: true,
            name: "Geoportail France",
            url: "https://geoportail.gouv.fr/",
        }
    },
    // geoportail_ignmap: {
    //     test:"https://wxs.ign.fr/choisirgeoportail/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    //     name: "Geoportail IGN Map",
    //     maxZoom: 18,
    //     rights: {
    //         noosm: true,
    //         name: "Geoportail France",
    //         url: "https://geoportail.gouv.fr/",
    //     }
    // },
    geoportail_map: {
        url: "https://wxs.ign.fr/choisirgeoportail/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        name: "Geoportail Map",
        maxZoom: 18,
        rights: {
            noosm: true,
            name: "Geoportail France",
            url: "https://geoportail.gouv.fr/",
        }
    },
    geoportail_orthos: {
        url: "https://wxs.ign.fr/choisirgeoportail/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
        name: "Geoportail photos",
        maxZoom: 19,
        rights: {
            noosm: true,
            name: "Geoportail France",
            url: "https://geoportail.gouv.fr/",
        }
    },

}
