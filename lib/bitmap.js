var fs = require('fs');
var bitmap = fs.readFileSync('bitmap.bmp');
console.log(bitmap.toString('utf-8',0 , 2));
console.log('size: ' + bitmap.readUInt32LE(2));
console.log('pixel data start: ' + bitmap.readUInt32LE(10));
console.log('bit depth: ' + bitmap.readUInt16LE(28));
console.log('number of colors: ' + bitmap.readUInt32LE(46));
// console.log(pixelArray.length);

var json = JSON.stringify(bitmap);
var start = bitmap.readUInt32LE(10);
var parsed = JSON.parse(json);
var type = parsed.type;
console.log(type);
var bitArray = parsed.data;
var header = bitArray.slice(0, start);
var pixelArray = bitArray.slice(start);

var newArray = []

function inversion (value, index, array) {
  var newValue = 255 - value;
  newArray[index] = newValue;

}

pixelArray.forEach(inversion);

// console.log(JSON.stringify(bitArray));
// console.log(JSON.stringify(header));
// console.log(newArray.length);
var bitNew = header.concat(pixelArray);

// var bitNew = header.concat(newArray);


var bitJSON =  JSON.stringify(bitNew);
// console.log(bitJSON);
// console.log(json);
var newBitmap = new Buffer(bitJSON);

// console.log(JSON.stringify(newBitmap));
// console.log(bitJSON);

fs.writeFileSync('invertedBitMap.bmp', newBitmap);

