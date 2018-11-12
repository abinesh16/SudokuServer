// This file provides interface to the application logic

const home      = require('./home.js');
const puzzle    = require('./puzzle.js');
const evaluate  = require('./evaluate.js');
const solution  = require('./solution.js');

let _scope = {
    home,
    puzzle,
    evaluate,
    solution
};

module.exports = _scope;