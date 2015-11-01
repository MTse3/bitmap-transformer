// Require transform functions
var transform_inversion = require(__dirname + '/transform_inversion');

// Export available transforms as a lookup object
var transforms = module.exports = exports = {
    inversion: transform_inversion
    // Add any new transforms here
}
