module.exports = function transform_inversion(value, index, array) {
  array[index] = 255 - value;
}
