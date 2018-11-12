// This module evaluates the solution submitted by the user and sends the result back to browser

//Module import
const QueryStringHandler = require('querystring');
const _fs = require('fs');  
const ValidateGridElement = require('./common.js');

function GenError(DoneCb){
    let errfilepath = 'html/wrong.html';
    function readcb(err,data){
        if(err || data.length == 0){
            DoneCb(404,'text/plain','Server Internal Error');
        }
        else{
            DoneCb(200,'text/html',data);
        }
    }
    _fs.readFile(errfilepath, readcb);
}

function GenSuccess(DoneCb){
    let errfilepath = 'html/correct.html';
    function readcb(err,data){
        if(err || data.length == 0){
            DoneCb(404,'text/plain','Server Internal Error');
        }
        else{
            DoneCb(200,'text/html',data);
        }
    }
    _fs.readFile(errfilepath, readcb);
}

function EvaluateSolution(SolutionObj,DoneCb){
    let tofillele = 81;
    let sudokugrid = [];
    for(let i=0; i<9; i++){
        values = "-,-,-,-,-,-,-,-,-".split(",");
        sudokugrid[i] = values;
    }

   Object.keys(SolutionObj).forEach(
        function(Key){
            //DEF_R0C0
            if(Key.substr(0,3) == "DEF"){
                sudokugrid[+Key[5]][+Key[7]] = SolutionObj[Key];
                tofillele--;
            }
        }
    );

    let idx='';
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(sudokugrid[i][j] != '-'){
                continue;
            }
            idx= `IN_R${i}C${j}`;
            if(SolutionObj[idx]  == undefined || SolutionObj[idx].length < 1 ){
                GenError(DoneCb);
                return;
            }
            if(false == ValidateGridElement(sudokugrid,i,j,SolutionObj[idx])){
                GenError(DoneCb);
                return;
            }
            sudokugrid[i][j] = SolutionObj[idx];
            tofillele--;
        }
    }

    if(tofillele != 0){
        GenError(DoneCb);
    }

    GenSuccess(DoneCb);
}

function OnEvalSolutionRequest(HttpRequest,DoneCb){
    let SolutionBuf = '';

    let DataEventCb = function(data){
        SolutionBuf += data;
    }
    HttpRequest.on('data', DataEventCb);

    let DataEndCb = function(){
        if(SolutionBuf.length == 0){
            GenError(DoneCb);
            return;
        }
        let dataObj = QueryStringHandler.parse(SolutionBuf);
        EvaluateSolution(dataObj,DoneCb);
    }
    HttpRequest.on('end', DataEndCb);
}

let _evaluatescope = function(HttpRequest, DoneCb){
    OnEvalSolutionRequest(HttpRequest,DoneCb);
};

//Module export
module.exports = _evaluatescope;