var fs = require('fs');
var parse = require(__dirname + '/lib/parse');
var commandName = require(__dirname + '/lib/command').commandName;
var commandType = require(__dirname + '/lib/command').commandType;

// Require transform functions
var transform_inversion = require(__dirname + '/lib/transform_inversion');

// Read starting bitmap file and invoke transform function on callback
(function processBitmap(callback) {
  fs.readFile(__dirname + '/lib/starting_bitmap.bmp', function(err, data) {
    if (err) throw err;
    callback(data);
  });
})(transform);

function transform(bitmap) {
  // Retrieve command-line command, if provided
  var command = commandName();
  var transformCommand = commandType();

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
  fs.writeFile(__dirname + '/output/' + command + '_bitmap.bmp', resultsBuffer, function(err) {
    if (err) throw err;
    console.log('Transform successful!');
  });
}

