// This module generates a puzzle and sends it to the browser

//Module import
const ValidateGridElement = require('./common.js');

// Generates a random position
// pair(1-9,1-9)
function GetRandomElementPositon(){ 
    let row = Math.random()*10;
    row = Math.floor(row);
    let col = Math.random()*10;
    col = Math.floor(col);
    if(row==0)row++;
    if(col==0)col++;
    return {row,col};
}

function GetRandomElementValue(){ 
    let val = Math.random()*10;
    val = Math.floor(val);
    if(val==0)val++;
    return val; 
}

// This function generates a puzzle
function GenerateRandomGrid(randomgrid){
    let cnt=10;
    let i=0;
    let eleval;
    let elepos;
    while(i<cnt){
        elepos = GetRandomElementPositon();
        if(randomgrid[elepos.row-1][elepos.col-1] != '-'){
            continue;
        }
        while(true){
            eleval = GetRandomElementValue();
            if(false == ValidateGridElement(randomgrid,elepos.row-1,elepos.col-1,eleval)){
                continue;
            }
            break;
        }
        randomgrid[elepos.row-1][elepos.col-1]=eleval;
        i++;
    }
    return randomgrid;
}

function RandomGridGenerator(){
    let cb = function(){
        let randomgrid = [];
        for(let i=0; i<9; i++){
            values = "-,-,-,-,-,-,-,-,-".split(",");
            randomgrid[i] = values;
        }
        return GenerateRandomGrid(randomgrid);
    }
    return cb;
}

function GeneratePuzzleForm(HttpRequest,DoneCb){
    //Create the grid
    let gridgen = RandomGridGenerator();
    let grid = gridgen();

    //Create the Form
    let htmldoc = '';
    htmldoc  = `<!DOCTYPE html><html><body><center>`;htmldoc += "\n";
    htmldoc += `<FORM METHOD="POST" ACTION="/evaluate" autocomplete="off">` ;htmldoc += "\n";

    htmldoc += `<datalist id="nums">`;
    for(let i=1;i<10;i++){
        htmldoc += `<option value="${i}">`;
    }
    htmldoc += `</datalist>`;

    htmldoc += `<TABLE BORDER = "2">`;htmldoc += "\n";
    for(let i=0; i<9; i++){
        htmldoc += `<TR>`;htmldoc += "\n";
        for(let j=0; j<9; j++){
            htmldoc += `<TD>`;
            if(grid[i][j] == '-'){
                htmldoc += `<INPUT LIST="nums" NAME="IN_R${i}C${j}" size="1" MAXLENGTH="1">`;
            }
            else
            {
                htmldoc += `${grid[i][j]}`;
                htmldoc += `<INPUT TYPE="HIDDEN" NAME="DEF_R${i}C${j}" VALUE="${grid[i][j]}">`;
            }
            htmldoc += `</TD>`;
            htmldoc += "\n";
        }
        htmldoc += `</TR>`;
        htmldoc += "\n";
    }
    htmldoc += `</TABLE>`;htmldoc += "\n";

    htmldoc += `<P>`;htmldoc += "\n";
	htmldoc += `<INPUT TYPE="SUBMIT" VALUE="Click to Submit Solution" NAME="B1 formaction="/evaluate">`;htmldoc += "\n";
	htmldoc += `<INPUT TYPE="SUBMIT" VALUE="Click to Get the Solution" NAME="B2" formaction="/solution">`;htmldoc += "\n";
    htmldoc += `</P>`;htmldoc += "\n";

    htmldoc += `</FORM>`;htmldoc += "\n";
    htmldoc  += `</center></body></html>`;
    
    DoneCb(200,'text/html',htmldoc);
}

let _puzzlescope = function(HttpRequest, DoneCb){
    GeneratePuzzleForm(HttpRequest,DoneCb);
};

//Module export
module.exports = _puzzlescope;
