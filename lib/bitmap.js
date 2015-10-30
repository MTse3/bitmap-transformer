var fs = require('fs');
var bitmap = fs.readFileSync('bitmap.bmp');
console.log(bitmap.toString('utf-8',0 , 2));
console.log('size: ' + bitmap.readUInt32LE(2));
console.log('pixel data start: ' + bitmap.readUInt32LE(10));
console.log('bit depth: ' + bitmap.readUInt16LE(28));
console.log('number of colors: ' + bitmap.readUInt32LE(46));
