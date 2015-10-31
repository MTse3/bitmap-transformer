module.exports = function transform_inversion(value, index, array) {
  var resultsArray = [];
  resultsArray[index] = 255 - value;

  return resultsArray;
}
