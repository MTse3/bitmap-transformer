var parse = module.exports = exports = {

    bitmapToArray: function(bitmap) {
      var bitmapData = [];

      Array.prototype.forEach.call(bitmap, function(value, index) {
        bitmapData[index] = value;
      });

      return bitmapData;
    },

    findPixelArray: function(bitmap) {
      // default bitmap puts address to pixel array at offset 10
      return bitmap.readUInt32LE(10);
    },

    sliceArray: function(array, pixelArrayStart) {
      var slicedArray = {
        // default bitmap header of 54 bytes plus 3 bytes of color masks
        header: array.slice(0, 58),
        colorPalette: array.slice(58, pixelArrayStart),
        pixelArray: array.slice(pixelArrayStart)
      }

      return slicedArray;
    }
}
