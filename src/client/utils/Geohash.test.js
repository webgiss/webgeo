const { default: Geohash } = require("./Geohash");

describe(`Geohash`, () => {
    [
        [48.785, 2.454, 'u09txc4cn'],
        [48.8583, 2.2941, 'u09tunq'],
        [37.7408, -122.448, '9q8ytw'],
    ].forEach(([lat, lon, geohash]) => {
        it(`should correctly convert (${lat},${lon}) to '${geohash}'`, () => {
            const actual = Geohash.encode(lat, lon, geohash.length);
            expect(actual).toEqual(geohash);
        })
        it(`should correctly convert '${geohash}' to be close to (${lat},${lon})`, () => {
            const actual = Geohash.decode(geohash);
            expect(actual.lat).toBeCloseTo(lat);
            expect(actual.lon).toBeCloseTo(lon);
        })
    })
});