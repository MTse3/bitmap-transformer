var fs = require('fs');
var parse = require(__dirname + '/lib/bitmap');

// Transform functions
var transform_inversion = require(__dirname + '/lib/transform_inversion');

// Grab starting bitmap file
var bitmap = fs.readFileSync(__dirname + '/lib/starting_bitmap.bmp');

(function transform(bitmap) {

  // Process incoming bitmap into array and find where pixel array starts
  var bitmapData = parse.bitmapToArray(bitmap);
  var pixelArrayStart = parse.findPixelArray(bitmap);

  // Slice up bitmap data into required array sections
  var slicedArray = parse.sliceArray(bitmapData, pixelArrayStart);

  // Invoke transform on each element of the color palette
  var resultsColorPalette = slicedArray.colorPalette;
  resultsColorPalette.forEach(transform_inversion);

  // Stitch the data array back together with the transformed color palette
  var resultsData = slicedArray.header.concat(resultsColorPalette, slicedArray.pixelArray);

  // Create new buffer from transformed data
  var resultsBuffer = new Buffer(resultsData);

  // Output new bitmap image
  fs.writeFileSync(__dirname + '/output/inverted_bitmap.bmp', resultsBuffer);

  console.log(bitmap);
  console.log(resultsBuffer);

})(bitmap); // Invoke transform

