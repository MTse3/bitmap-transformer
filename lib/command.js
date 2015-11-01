// Require transforms lookup object
var transforms = require(__dirname + '/transforms');

var parseCommand = module.exports = exports = {

  commandName: function() {
    var command;
    // Check if a command was provided
    if (process.argv[2] !== -1) {
      command = process.argv[2];
    }
    else {
      command = 'inversion'; // default transform
    }

    return command;
  },

  commandType: function() {
    // Check if provided command was valid
    var command = parseCommand.commandName();
    if (transforms.hasOwnProperty(command)) {
      return transforms[command];
    }
    else {
      throw new Error('Invalid transform requested. Please use one of the available transforms.');
    }
  }
};
