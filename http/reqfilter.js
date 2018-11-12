//This file filters the incoming http requests

//Module imports
const ReqHandler = require('./reqhandler.js');
const URL = require('url');

// URL handlers supported by the filter
const handler =  {
    //Home Page
    '/'         : ReqHandler.home,

    //Puzzle page
    '/puzzle'    : ReqHandler.puzzle,

    //solution evaluation page
    '/evaluate'  : ReqHandler.evaluate,   

    //Solution page
    '/solution'  : ReqHandler.solution,

    //unknown page
    'default'   : ReqHandler.default
};

let _scope = {
    //Setup a filter function
    reqfiltercb : function(Request, Response){
        const Url = URL.parse(Request.url, true);
        const Pathname = Url.pathname;
        
        if(Pathname in handler){
            handler[Pathname](Request, Response);
            return;
        }

        handler['default'](Request, Response);
    }
};

//Module export
module.exports = _scope;