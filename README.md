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


console.log(bound2tile([[48.151428143221224, 11.5521240234375],
   [48.15234434564333, 11.553497314453125]]));

// output:
// { 
//     valid: true, 
//     x: 69742, 
//     y: 45479, 
//     z: 17 
// }
```

### options
You can pass additional options to control the behavior.

#### zoom (default: 19)
Zoom level the algorithm should start with. If no zoom is passed, the algorithm starts with the 
most detailed OSM zoom level (19).
This can be used to define a minimal zoom level that should be used.

## Further work
- add options, to allow a different bound input (like L.LatLngBounds)
- add options, to allow a complete tile url returned
- add tests

## Contribute
Feel free to add issues or pull requests. I'm glad for every kind of feedback!
