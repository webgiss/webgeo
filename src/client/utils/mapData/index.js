import data from './data'

const mapData = data

const getRightLink = (rights) => `<a href="${rights.url}">${rights.name}</a>`

const getMapInfo = (style) => {
    if (data[style]) {
        // let attribution = '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
        const url = mapData[style].url;
        const rightsList = mapData[style].rights;
        const maxZoom = mapData[style].maxZoom;
        
        const attribution = `&copy ` + rightsList.map((rights) => {
            let attribution = getRightLink(rights)
            if (rights.license) {
                attribution = `${attribution} (${getRightLink(rights.license)})`
            }
            return attribution
        }).join(' | ')

        return { url, maxZoom, attribution }
    }
    return null
}

const getStyleNames = () => {
    return Object.keys(mapData).map((key) => ({ key, name: mapData[key].name }))
}

export { getMapInfo, getStyleNames }

export default data