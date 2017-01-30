(function() {
    'use strict';

    var Bound = require('./bound.js');

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
        var tileXmin = long2tile(bounds.getWest(), zoom),
            tileXmax = long2tile(bounds.getEast(), zoom),
            tileYmin = lat2tile(bounds.getSouth(), zoom),
            tileYmax = lat2tile(bounds.getNorth(), zoom);

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

    function tile2Url(tile, options) {
        let url = options.urlBase;

        if (!url) {
            url = 'http://tile.openstreetmap.org/';
        }
        if (!url.endsWith('/')) {
            url += '/';
        }

        return url + [tile.z, tile.x, tile.y].join('/') + (options.fileExtension || '.png');
    }

    module.exports = function(bound, options) {
        if (!options) {
            options = {};
        }
        if (!options.zoom) {
            // start with OSM maxZoom
            options.zoom = 19;
        }

        let tile = getCoverTile(new Bound(bound), options.zoom);

        if (options.toUrl) {
            return tile2Url(tile, options);
        }

        return tile;
    };
}());
