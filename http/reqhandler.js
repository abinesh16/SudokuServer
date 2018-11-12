// This file provides the HttpRequest handler

//Module imports
const Applogic = require('../app/app.js');

let _scope = {
    //This is the callback registered for home page
    home : function(HttpRequest, HttpResponse){
        function DoneCb(HttpStatus, HttpContentType, HttpContent){
            HttpResponse.writeHead(HttpStatus, {'Content-Type': HttpContentType});
            HttpResponse.write(HttpContent);
            HttpResponse.end();
        }
        Applogic.home(HttpRequest,DoneCb);
    },

    puzzle : function(HttpRequest, HttpResponse){
        function DoneCb(HttpStatus, HttpContentType, HttpContent){
            HttpResponse.writeHead(HttpStatus, {'Content-Type': HttpContentType});
            HttpResponse.write(HttpContent);
            HttpResponse.end();
        }
        Applogic.puzzle(HttpRequest,DoneCb);
    },

    evaluate : function(HttpRequest, HttpResponse){
        function DoneCb(HttpStatus, HttpContentType, HttpContent){
            HttpResponse.writeHead(HttpStatus, {'Content-Type': HttpContentType});
            HttpResponse.write(HttpContent);
            HttpResponse.end();
        }
        Applogic.evaluate(HttpRequest,DoneCb);
    },

    solution : function(HttpRequest, HttpResponse) {
        function DoneCb(HttpStatus, HttpContentType, HttpContent){
            HttpResponse.writeHead(HttpStatus, {'Content-Type': HttpContentType});
            HttpResponse.write(HttpContent);
            HttpResponse.end();
        }
        Applogic.solution(HttpRequest,DoneCb);
    },

    default : function(HttpRequest, HttpResponse) {
        HttpResponse.writeHead(404, {'Content-Type': 'text/plain'});
        HttpResponse.write('404 Not Found');
        HttpResponse.end();
    }
};

//Module export
module.exports = _scope;
