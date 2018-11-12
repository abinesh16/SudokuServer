//HttpServer Module

//Module imports
const http   = require('http');
const cfg    = require('./config.js');
const filter = require('./reqfilter.js');

let _scope = {
  //This function starts the http server
  startserver : function (){
    //Create a HTTP Server Object
    let _server;
    try{
      _server = http.createServer(filter.reqfiltercb);
    }
    catch{
      return false;
    }

    //Begin Listening
    try{
      _server.listen(cfg.port, cfg.hostname, function () {
        console.log(`Server running at http://${cfg.hostname}:${cfg.port}/`);
      });
    }
    catch{
      return false;
    }

    return true;
  }
};

//Module Exports
module.exports = _scope;