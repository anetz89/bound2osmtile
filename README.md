# bound2osmtile
This package converts a passed WGS84 bounds object to the closest OSM slippy tile request values.
This is done by following the suggestions in the 
[OSM Wiki](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames).

## Installation
Use standard npm installation

```shell
npm install --save bound2osmtile
```

## Usage
Pass the WGS84 bounds to the function:

```js
var bound2tile = require('bound2osmtile');

// [north, east, south, west]
bound2tile([48.1354432, 11.6037082, 48.123412, 11.621389]);

// [[north, east], [south, west]]
bound2tile([[48.1354432, 11.6037082], [48.123412, 11.621389]]);

// [L.LatLng, L.LatLng]
bound2tile([L.latLng(48.1354432, 11.6037082), L.latLng(48.123412, 11.621389)]);

// L.LatLngBounds
bound2tile(L.latLngBounds([48.1354432, 11.6037082], [48.123412, 11.621389]));

// output:
// { 
//     valid: true, 
//     x: 8720, 
//     y: 5686, 
//     z: 14 
// }
```

## Options
You can pass additional options to control the behavior.

#### zoom (default: 19)
Zoom level the algorithm should start with. If no zoom is passed, the algorithm starts with the 
most detailed OSM zoom level (19).
This can be used to define a minimal zoom level that should be used.

```js
bound2osmtile([48.1354432, 11.6037082, 48.123412, 11.621389], {
    zoom : 12
});

// output (note different zoom and x/y values compared to the above output):
// { 
//     valid: true, 
//     x: 2180, 
//     y: 1421, 
//     z: 12
// }
```

#### toUrl (default: false)
Convert the output tile to a OSM sloppy tile URL. If urlBase or fileExtension is not specified,
the output returns an URL to openstreetmap.org.

```js
bound2osmtile([48.1354432, 11.6037082, 48.123412, 11.621389], {
    zoom : 12,
    toUrl : true
});

// output
// "http://tile.openstreetmap.org/12/2180/1421.png"
```

#### urlBase (default: "http://tile.openstreetmap.org/")
Base url that should be used for url conversion. 
Please note that this parameter requires "toUrl" to be set true.

##### fileExtension (default: ".png")
File extension that should be used for the url output.
Please note that this parameter requires "toUrl" to be set true.

```js
bound2osmtile([48.1354432, 11.6037082, 48.123412, 11.621389], {
    zoom : 12,
    toUrl : true,
    urlBase : 'http://my.own.com',
    fileExtension : '.json'
});

// output
// "http://my.own.com/12/2180/1421.json"
```

## Contribute
Feel free to add issues or pull requests. I'm glad for every kind of feedback!
