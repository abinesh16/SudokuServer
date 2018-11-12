// This module computes the solution and sends the result back to browser

//Module import
const QueryStringHandler = require('querystring');
const _fs = require('fs');  

function SolveSudokuGrid(sudokugrid, ele_rpos, ele_cpos){
    if(ele_cpos > 8 || ele_rpos > 8){
        return true;
    }

    //nxt position
    let nxtrpos = ele_rpos;
    let nxtcpos = ele_cpos+1;
    if(nxtcpos>8){
        nxtcpos=0;
        nxtrpos++;
    }

    if(sudokugrid[ele_rpos][ele_cpos] != '-'){
        return SolveSudokuGrid(sudokugrid,nxtrpos,nxtcpos);
    }

    //Get the list of all elements which can be put at this position
    let allowedvals = [0,1,2,3,4,5,6,7,8,9];

    //Row grid
    for(let i=0; i<9; i++){
        if(sudokugrid[ele_rpos][i] == '-'){
            continue;
        }
        allowedvals[+sudokugrid[ele_rpos][i]]=0;
    }

    //Column grid
    for(let i=0; i<9; i++){
        if(sudokugrid[i][ele_cpos] == '-'){
            continue;
        }
        allowedvals[+sudokugrid[i][ele_cpos]]=0;
    }

    //3x3 grid
    let rgridmin = Math.floor(ele_rpos/3) * 3;
    let rgridmax = rgridmin + 3;
    let cgridmin = Math.floor(ele_cpos/3) * 3;
    let cgridmax = cgridmin + 3;
    for(let i=rgridmin; i<rgridmax; i++){
        for(let j=cgridmin; j<cgridmax; j++){
            if(sudokugrid[i][j] == '-'){
                continue;
            }
            allowedvals[+sudokugrid[i][j]]=0;
        }
    }

    let res = false;
    for(let i=1; i<10; i++){
        if(allowedvals[i]==0){
            continue;
        }
        sudokugrid[ele_rpos][ele_cpos] = i.toString();
        res = SolveSudokuGrid(sudokugrid,nxtrpos,nxtcpos);
        if(res == true){
            break;
        }
    }

    //Rollback
    if(res == false){
        sudokugrid[ele_rpos][ele_cpos] = '-';
    }

    return res;
}

function GenError(DoneCb){
    DoneCb(404,'text/plain','Unable to Generate Solution ! Server Internal Error !');
}

function GenResult(sudokugrid,DoneCb){
    let solutiontemplatepath = 'html/solution.html';
    function readcb(err,data){
        if(err || data.length == 0){
            GenError(DoneCb);
            return;
        }
        data = data.toString();

        let tablestr = '';
        tablestr += "<table border=\"1\" style=\"width:15%\"><tbody>";
        for(let i=0; i<sudokugrid.length; i++){
            tablestr += "<tr>";
            for(let j=0; j<sudokugrid[0].length; j++){
                tablestr += "<td>";
                tablestr += sudokugrid[i][j];
                tablestr += "</td>";
            }
            tablestr += "</tr>";
        }
        tablestr += "</tbody></table>";
        data = data.replace("TABLE_TEMPLATE",tablestr);
        
        DoneCb(200,'text/html',data);
    }
    _fs.readFile(solutiontemplatepath, readcb);
}

function GetSolution(SolutionObj, DoneCb){
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
            }
        }
    );

    if(false == SolveSudokuGrid(sudokugrid,0,0)){
        GenError(DoneCb);
        return;
    }

    GenResult(sudokugrid,DoneCb);    
}

function OnGetSolutionRequest(HttpRequest,DoneCb){
    let SolutionBuf ="";
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
        GetSolution(dataObj,DoneCb);
    }
    HttpRequest.on('end', DataEndCb);
}

let _solutionscope = function(HttpRequest, DoneCb){
    OnGetSolutionRequest(HttpRequest,DoneCb);
};

//Module export
module.exports = _solutionscope;
