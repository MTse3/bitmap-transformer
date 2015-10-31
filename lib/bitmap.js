var fs = require('fs');
var bitmap = fs.readFileSync('./lib/bitmap.bmp');

var bufferData = [];
var resultsPixelArray = [];
var resultsData = [];
var resultsColorPalette = [];
var resultsBuffer;

// Identify where pixel array starts in the bitmap data
var pixelStart = bitmap.readUInt32LE(10);

function parseBuffer(buffer) {
  Array.prototype.forEach.call(bitmap, function(value, index) {
    bufferData[index] = value;
  });
}
parseBuffer(bitmap);

function inversion(value, index, array) {
  var resultValue = 255 - value;
  resultsColorPalette[index] = resultValue;
}

function blue(value, index, array) {
  var resultValue = 100;
  resultsPixelArray[index] = resultValue;
}


// Slice up buffer data into header, palette, and pixelArray
var header = bufferData.slice(0, 58);
var colorPalette = bufferData.slice(58, pixelStart);
var pixelArray = bufferData.slice(pixelStart);



/*
var parsedColorPalette = [];
console.log('color palette length:' + colorPalette.length);

//actualColorPalette[0] = colorPalette.slice(0,4);
var j = 0;
for (var i = 0; i < colorPalette.length; i += 4) {
  var chunk = colorPalette.slice(i, i + 4);
  parsedColorPalette[j] = chunk;
  j++;
}
console.log(parsedColorPalette);
*/

// Transform image
//pixelArray.forEach(inversion);
colorPalette.forEach(inversion);

resultsData = header.concat(resultsColorPalette, pixelArray);
resultsBuffer = new Buffer(resultsData);

fs.writeFileSync('./lib/invertedBitmap.bmp', resultsBuffer);

// RESULTS
console.log('pixelarray start: ' + pixelStart);
console.log('color palatte:' + colorPalette);
console.log('results data:' + resultsData);
// console.log('number of colors:' + bitmap.readUInt32LE(46));
//console.log(bitmap);
//console.log(resultsBuffer);
// console.log(header);
//console.log(resultsPixelArray.length);
//console.log(resultsData.length);
