const getPaddedNumber = data => `${data}`.padStart(2, '0')

export const getLatLonTextCan = (value, directionArray) => {
    let indexSign = 0
    if (value < 0) {
        indexSign = 1
        value = -value
    }
    let valueDeg = Math.floor(value)
    value = (value - valueDeg) * 60
    let valueMin = Math.floor(value)
    value = (value - valueMin) * 60
    let valueSec = Math.floor(value * 100) / 100
    return {
        text: `${valueDeg}° ${valueMin}' ${valueSec}" ${directionArray[indexSign]}`,
        can: `${getPaddedNumber(valueDeg)}:${getPaddedNumber(valueMin)}:${getPaddedNumber(valueSec)}${directionArray[indexSign]}`,
    }
}

export const normalizeLatLon = (x) => Math.floor(x * 1000000) / 1000000;
