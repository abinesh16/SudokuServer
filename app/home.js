// This file handles the request to the home page

//Module import
const _fs = require('fs');

let _homescope = function(HttpRequest, DoneCb){
    let homefilepath = 'html/home.html';
    function readcb(err,data){
        if(err || data.length == 0){
            DoneCb(404,'text/plain','Server Internal Error');
        }
        else{
            DoneCb(200,'text/html',data);
        }
    }
    _fs.readFile(homefilepath, readcb);
};

//Module export
module.exports = _homescope;