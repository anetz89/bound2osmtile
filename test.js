(function() {
    'use strict';

    const
        bound2tile = require('./index.js');


    function test(bound, expect) {
        console.log(bound2tile(bound));

        // return bound2tile(bound) == expect;
    }
    // [[north, west], [south, east]]
    // console.log(
    //     test([[48.151428143221224, 11.5521240234375],
    //         [48.15234434564333, 11.553497314453125]], {
    //             valid : true,
    //             x : 139484,
    //             y : 90959,
    //             z : 18
    //         }
    //     )
    // );

}());

//  x: , y: ,
// http://b.tile.openstreetmap.org/13/4358/2842.png
// http://b.tile.openstreetmap.org/17/69742/45479.png
