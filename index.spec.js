(function() {
    'use strict';

    const
        bound2osmtile = require('./index.js'),
        expect = function(input, value) {
            if (input !== value) {
                throw new Error('Expected ' + value + ', got ' + input);
            }
        };

    // ensure readme example
    let result = bound2osmtile([48.1354432, 11.6037082, 48.123412, 11.621389]);

    expect(result.valid, true);
    expect(result.x, 8720);
    expect(result.y, 5686);
    expect(result.z, 14);

    result = bound2osmtile([48.1354432, 11.6037082, 48.123412, 11.621389], {
        zoom : 12
    });

    expect(result.valid, true);
    expect(result.x, 2180);
    expect(result.y, 1421);
    expect(result.z, 12);

    result = bound2osmtile([48.1354432, 11.6037082, 48.123412, 11.621389], {
        zoom : 12,
        toUrl : true
    });

    expect(result, 'http://tile.openstreetmap.org/12/2180/1421.png');

    result = bound2osmtile([48.1354432, 11.6037082, 48.123412, 11.621389], {
        zoom : 12,
        toUrl : true,
        urlBase : 'http://my.own.com',
        fileExtension : '.json'
    });

    expect(result, 'http://my.own.com/12/2180/1421.json');
}());
