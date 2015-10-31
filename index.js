var fs = require('fs');
var parseBitmap = require(__dirname + '/lib/bitmap');
var transform_inversion = require(__dirname + '/lib/transform_inversion');

// Grab starting bitmap file
var bitmap = fs.readFileSync(__dirname + '/lib/starting-bitmap.bmp');

function transform(bitmap) {
  parseBitmap.bitmapToArray(bitmap);

  var pixelArrayStart = findPixelArray(bitmap);
  var resultsData = [];
  var resultsColorPalette = [];

  parseBitmap.sliceArray(bitmap, parseBitmap.pixelArrayStart);

  parseBitmap.sliceArray.colorPalette.forEach(transform_inversion);

  resultsData = sliceArray.header.concat(resultsColorPalette, sliceArray.pixelArray);
  resultsBuffer = new Buffer(resultsData);

  fs.writeFileSync(__dirname + '/output/invertedBitmap.bmp', resultsBuffer);
}

