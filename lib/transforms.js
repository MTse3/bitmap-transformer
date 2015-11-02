// Require transform functions
var transform_inversion = require(__dirname + '/transform_inversion');
var transform_grayscale = require(__dirname + '/transform_grayscale');

// Export available transforms as a lookup object
var transforms = module.exports = exports = {
    inversion: transform_inversion,
    grayscale: transform_grayscale
    // Add any new transforms here
};
