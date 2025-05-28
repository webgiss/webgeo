import { parseLatLon, OK, SYNTAX_ERROR } from ".";

describe('parseLatLon', () => {
    const testDataSet = [
        { data: '', expected: { parsed: false, error: false, status: OK } },
        { data: '    ', expected: { parsed: false, error: false, status: OK } },
        { data: '\t', expected: { parsed: false, error: false, status: OK } },
        { data: '    \t  ', expected: { parsed: false, error: false, status: OK } },
        { data: '0N 0E', expected: { parsed: true, error: false, status: OK, lat: 0, lon: 0 } },
        { data: '0/0', expected: { parsed: true, error: false, status: OK, lat: 0, lon: 0 } },
        { data: '0 N 0 W', expected: { parsed: true, error: false, status: OK, lat: 0, lon: -0 } },
        { data: '5 N 6 W', expected: { parsed: true, error: false, status: OK, lat: 5, lon: -6 } },
        { data: '5 S 6 W', expected: { parsed: true, error: false, status: OK, lat: -5, lon: -6 } },
        { data: '-5/-6', expected: { parsed: true, error: false, status: OK, lat: -5, lon: -6 } },
        { data: '-5 / -6', expected: { parsed: true, error: false, status: OK, lat: -5, lon: -6 } },
        { data: '5.25 N 6.25 E', expected: { parsed: true, error: false, status: OK, lat: 5.25, lon: 6.25 } },
        { data: '5:15 N 6:15 E', expected: { parsed: true, error: false, status: OK, lat: 5.25, lon: 6.25 } },
        { data: '5:15:00 N 6:15:00 E', expected: { parsed: true, error: false, status: OK, lat: 5.25, lon: 6.25 } },
        { data: '5:15:00 S 6:15:00 W', expected: { parsed: true, error: false, status: OK, lat: -5.25, lon: -6.25 } },
        { data: '5:16:30 S 6:16:30 W', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: -6.275 } },
        { data: '6:16:30 W 5:16:30 S', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: -6.275 } },
        { data: '6:16:30 E 5:16:30 S', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: 6.275 } },
        { data: '6:16:30 E 5:16:30 N', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: 6.275 } },
        { data: '5.275,6.275', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: 6.275 } },
        { data: '5.275/6.275', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: 6.275 } },
        { data: '5,275 , 6,275', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: 6.275 } },
        { data: '5,275,6,275', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: 6.275 } },
        { data: '5,275/6,275', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: 6.275 } },
        { data: '5.275 - 6.275', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: 6.275 } },
        { data: '5.275 - -6.275', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5° 16\' 30s N 6 d 16m 30"W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5°16\'30"N6°16\'30"W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5°16\'30"N 6°16\'30"W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5°16\'30" N 6°16\'30" W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5° 16\' 30" N 6° 16\' 30" W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5d 16m 30s N 6d 16m 30s W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5d16m30sN6d16m30sW', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5°16’30”N6°16’30”W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5d16m30sN 6d16m30sW', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5°16’30”N 6°16’30”W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5°16’30”N\n6°16’30”W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5d16m30sS6d16m30sE', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: 6.275 } },
        { data: '5d16m30ss6d16m30se', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: 6.275 } },
        { data: '5 ° 16 \' 30 " N 6 ° 16 \' 30 " W', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5 ° 16 \' 30 " North 6 ° 16 \' 30 " West', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5 ° 16 \' 30 " north 6 ° 16 \' 30 " west', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5 ° 16 \' 30 " Nord 6 ° 16 \' 30 " Ouest', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5 ° 16 \' 30 " nord 6 ° 16 \' 30 " ouest', expected: { parsed: true, error: false, status: OK, lat: 5.275, lon: -6.275 } },
        { data: '5 ° 16 \' 30 " Sud 6 ° 16 \' 30 " Est', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: 6.275 } },
        { data: '5 ° 16 \' 30 " sud 6 ° 16 \' 30 " est', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: 6.275 } },
        { data: '[ebgw10q9jgkb]', expected: { parsed: true, error: false, status: OK, lat: 5.27499997, lon: -6.27499999 } },
        { data: '[gcmj48x5fvb4]', expected: { parsed: true, error: false, status: OK, lat: 52.91357783, lon: -4.0991555 } },
        { data: '5 ° 16 \' 30 " s 6 ° 16 \' 30 " e', expected: { parsed: true, error: false, status: OK, lat: -5.275, lon: 6.275 } },
        { data: '5 ° 16 \' 30 " P 6 ° 16 \' 30 " W', expected: { parsed: false, error: true, status: SYNTAX_ERROR, message: "Don't understand [5 ° 16 ' 30 \" P 6 ° 16 ' 30 \" W]" } },
    ]
    for (const testData of testDataSet) {
        it(`should return ${testData.expected.parsed ? `a structure containing lat=[${testData.expected.lat}] lon=[${testData.expected.lon}]` : `a structure with a status [${testData.expected.status}]`} when provided with [${testData.data}]`, () => {
            const actual = parseLatLon(testData.data)
            expect(actual).toEqual(testData.expected)
        })
    }
})
