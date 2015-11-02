'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var command = require(__dirname + '/../lib/command.js');
var parser = require(__dirname + '/../lib/parse.js');
var grayscale = require(__dirname + '/../lib/transform_grayscale.js');
var inversion = require(__dirname + '/../lib/transform_inversion.js');
var transforms = require(__dirname + '/../lib/transforms.js');

describe('Tests the command file for command line', function() {
  before(function() {
    this.backup = process.argv;
  });
  it('should return grayscale command', function() {
    process.argv = ['node', 'myfile', 'grayscale'];
    expect(command.commandName()).to.eql('grayscale');
  });
  it('should return the default inversion', function() {
    process.argv = ['node', 'myfile'];
    expect(command.commandName()).to.eql('inversion');
  });
  it('should return the error message', function() {
    process.argv = ['node', 'myfile', 'blue'];
    assert.throw(command.commandType, Error, 'Invalid transform requested. Please use one of the available transforms.');
  });
});

describe('Tests the parse file', function() {
  it('should convert buffer to an array', function() {
    var bitmap = new Buffer([79, 50, 204, 100, 159]);
    var resultArray = [79, 50, 204, 100, 159];
    expect(parser.bitmapToArray(bitmap)).to.eql(resultArray);
  });
});

describe('the inversion', function() {
  it('Should invert a given array', function() {
    var array = [79, 50, 204];
    expect(inversion(array)).to.eql([176, 205, 51]);
  });
});

describe('the grayscale', function() {
  it('should transform data into a grayscale', function() {
    var arrayGrouped = [[79, 120, 204, 100]];
    var testArray = [141, 141, 141, 100];
    expect(grayscale(null, arrayGrouped)).to.eql(testArray);
  });
});
