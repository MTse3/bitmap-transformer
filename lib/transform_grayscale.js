module.exports = exports = function transform_grayscale(array, arrayGrouped) {
  arrayGrouped.forEach(function(value, index, array) {
    var r = value[0];
    var g = value[1];
    var b = value[2];

    var avg = Math.floor((Math.max(r,g,b) + Math.min(r,g,b)) / 2);

    value[0] = avg;
    value[1] = avg;
    value[2] = avg;

    });

  var flatArray = [].concat.apply([], arrayGrouped);

  return flatArray;
};
