//This is a common utility script

function ValidateGridElement(sudokugrid,row,col,val){
    //Check columns to see if the given element can appear here
    for(let i=0; i<9; i++){
        if(sudokugrid[row][i] == '-' || i==col){
            continue;
        }
        if(sudokugrid[row][i] == val){
            return false;
        }
    }

    //Check rows to see if the given element can appear here
    for(let i=0; i<9; i++){
        if(sudokugrid[i][col] == '-' || i==row){
            continue;
        }
        if(sudokugrid[i][col] == val){
            return false;
        }
    }

    //Check the 3x3 grid in which the current element falls
    let rgridmin = Math.floor(row/3) * 3;
    let rgridmax = rgridmin + 3;
    let cgridmin = Math.floor(col/3) * 3;
    let cgridmax = cgridmin + 3;
    for(let i=rgridmin; i<rgridmax; i++){
        for(let j=cgridmin; j<cgridmax; j++){
            if(sudokugrid[i][j] == '-' || (i==row && j==col)){
                continue;
            }
            if(sudokugrid[i][j] == val){
                return false;
            }
        }
    }
    return true;
}

module.exports = ValidateGridElement;
