# bound2osmtile
This package converts a passed WGS84 bounds object to OSM slippy tile request values.
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
var bound2tile = require('osmtile2bound');

// http://c.tile.openstreetmap.org/18/139507/90949.png
console.log(bound2tile([ [ 11.583709716796875, 48.16150547016801 ],
   [ 11.5850830078125, 48.16150547016801 ],
   [ 11.5850830078125, 48.1605894313262 ],
   [ 11.583709716796875, 48.1605894313262 ] ]));

// output:
// {
//     x : 139507,
//     y : 90949,
//     z : 18
// }
```

## Further work
- add options, to allow a different bound input (like L.LatLngBounds)
- add options, to allow a complete tile url returned
- add tests

## Contribute
Feel free to add issues or pull requests. I'm glad for every kind of feedback!