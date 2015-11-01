module.exports = exports = function transform_inversion(array, arrayGrouped) {
  array.forEach(function(value, index, array) {
    array[index] = 255 - value;
  });

  return array;
};
