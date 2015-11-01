var fs = require('fs');
var parse = require(__dirname + '/lib/parse');
var command = require(__dirname + '/lib/command');

// Require transform functions
var transform_inversion = require(__dirname + '/lib/transform_inversion');

// Grab starting bitmap file
var bitmap = fs.readFileSync(__dirname + '/lib/starting_bitmap.bmp');

(function transform(bitmap) {

  // Retrieve command-line command, if provided
  var transformCommand = command();

  // Process incoming bitmap into array and find where pixel array starts
  var bitmapData = parse.bitmapToArray(bitmap);
  var pixelArrayStart = parse.findPixelArray(bitmap);

  // Slice up bitmap data into required array sections
  var slicedArray = parse.sliceArray(bitmapData, pixelArrayStart);

  // Invoke transform on each element of the color palette
  var resultsColorPalette = slicedArray.colorPalette;
  resultsColorPalette.forEach(transformCommand);

  // Stitch the data array back together with the transformed color palette
  var resultsData = slicedArray.header.concat(resultsColorPalette, slicedArray.pixelArray);

  // Create new buffer from transformed data
  var resultsBuffer = new Buffer(resultsData);

  // Output new bitmap image
  fs.writeFileSync(__dirname + '/output/inverted_bitmap.bmp', resultsBuffer);

})(bitmap); // Invoke transform

