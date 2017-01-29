(function() {
    'use strict';

    function long2tile(lon, zoom) {
        return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
    }

    function lat2tile(lat, zoom) {
        return (Math.floor((1 - (Math.log(Math.tan(lat * Math.PI / 180) +
            (1 / Math.cos(lat * Math.PI / 180))) / Math.PI)) / 2 * Math.pow(2, zoom)));
    }

    function isValidInfo(x, y, z) {
        return Boolean((x || (!x && x === 0)) &&
            (y || (!y && y === 0)) &&
            (z || (!z && z === 0)));
    }

    function getTileInfo(x, y, z) {
        return {
            valid : isValidInfo(x, y, z),
            x : x,
            y : y,
            z : z
        };
    }

    function getTile(bounds, zoom) {
        // expect bounds to be [[north, west], [south, east]]
        var tileXmin = long2tile(bounds[0][1], zoom),  // west
            tileXmax = long2tile(bounds[1][1], zoom),  // east
            tileYmin = lat2tile(bounds[1][0], zoom),   // south
            tileYmax = lat2tile(bounds[0][0], zoom);   // north

        if (tileXmin === tileXmax &&
                tileYmin === tileYmax) {
            // complete tile found
            return getTileInfo(tileXmin, tileYmin, zoom);
        }

        return getTileInfo();
    }

    function getCoverTile(bounds, zoom) {
        if (zoom < 0) {
            return getTileInfo();
        }

        let tile = getTile(bounds, zoom);

        if (tile.valid) {
            return tile;
        }

        return getCoverTile(bounds, zoom - 1);
    }

    // function normalizeBounds(bounds) {
    //     console.log(bounds);

    //     bounds[0][0] = Math.round(bounds[0][0] * 1000000 - 1) / 1000000;
    //     bounds[0][1] = Math.round(bounds[0][1] * 1000000 + 1) / 1000000;
    //     bounds[1][0] = Math.round(bounds[1][0] * 1000000 + 1) / 1000000;
    //     bounds[1][1] = Math.round(bounds[1][1] * 1000000 - 1) / 1000000;

    //     console.log('[north - 1, west + 1], [south + 1, east - 1]');
    //     console.log(bounds);
    //     return bounds;
    // }

    module.exports = function(bounds, options) {
        if (!options) {
            options = {};
        }
        if (!options.zoom) {
            // start with OSM maxZoom
            options.zoom = 19;
        }
        // bounds = normalizeBounds(bounds);

        return getCoverTile(bounds, options.zoom);
    };
}());
