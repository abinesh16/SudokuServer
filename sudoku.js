// This a server hosting sudoku puzzle application
// The user can connect to the server to play sudoku
// The user will be provided with a random puzzle which needs to be solved
// The user can submit the solution or request the solution

// Imports
const HttpServer = require('./http/server.js');

// Server start point
function main(){
    HttpServer.startserver();
}

main();