var parseBitmap = module.exports = exports = function() {

  return {
    bitmapToArray: function(bitmap) {
      var bitmapData = [];

      Array.prototype.forEach.call(bitmap, function(value, index) {
        bitmapData[index] = value;
      });

      return bitmapData;
    }

    findPixelArray: function(bitmap) = {
      return bitmap.readUInt32LE(10);
    }

    sliceArray: function(array, pixelArrayStart) {
      var slicedArray = {
        header: array.slice(0, 58),
        colorPalette: array.slice(58, pixelArrayStart),
        pixelArray: array.slice(pixelArrayStart)
      }

      return slicedArray;
    }
}
