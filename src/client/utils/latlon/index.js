import parser from './latlonparser'

export const OK='OK'
export const SYNTAX_ERROR='SYNTAX_ERROR'

/**
 * parse lat and lon as text
 * @param {String} data text description of lat and lon
 */
export const parseLatLon = (data) => {
    const get_result = (lat, lon) => ({ parsed: true, error: false, status: OK, lat, lon })
    const get_fail = (error, status, message) => ({ parsed: false, error, status, message })
    const get_error = (status, message) => get_fail(true, status, message)
    const get_not_parsed = () => get_fail(false, OK, undefined)

    data = data.replace(/^[\s\t]*/, '')
    data = data.replace(/[\s\t]*$/, '')

    if (data === '') {
        return get_not_parsed()
    }

    try {
        const result = parser.parse(data)
        return get_result(result.lat, result.lon)
    } catch (e) {
        console.log(e)
        return get_error(SYNTAX_ERROR, `Don't understand [${data}]`)
    }
}
