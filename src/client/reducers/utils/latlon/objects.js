export const createEFloat = (data) => parseFloat(data)

export const createFFloat = (data) => parseFloat(data.replace(',', '.'))

export const createInteger = (data) => parseFloat(data)

export const createDegree = (num) => num

export const createMinute = (num) => num

export const createSecond = (num) => num

const createLatOrLon = (degree, minute, second, direction) => (degree + (minute / 60) + (second / 3600)) * direction

export const createLat = createLatOrLon
export const createLon = createLatOrLon

export const createCoord = (lat, lon) => ({ lat, lon })
