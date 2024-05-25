var board;
var tableDiv;
var score = 0;
//var rows = prompt("insert rows");
//var columns = prompt("insert columns");
var rows = 5;
var columns = 5;

window.onload = function(){
    tableDiv = document.createElement("div");
    tableDiv.id = "board";
    tableDiv.style.height = (rows * 100) + "px";
    tableDiv.style.width = (columns * 100) + "px";

    document.getElementsByClassName("articol2048")[0].appendChild(tableDiv);
    setGame();
}

function setGame(){
    board = [];
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i][j] = 0;
        }
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            //tile.style.height = ( Math.floor(parseInt(tableDiv.style.height) / columns) ) + "px";
            //console.log( tile.style.height );
            //tile.style.width = ( Math.floor( parseInt(tableDiv.style.width) / rows) ) + "px";
            //console.log( tile.style.width );
            let num = board[i][j];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}
document.addEventListener('DOMContentLoaded', (event) => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const threshold = 50; // Minimum distance (in pixels) to consider a swipe

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    slideRight();
                } else {
                    slideLeft();
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(diffY) > threshold) {
                if (diffY > 0) {
                    slideDown();
                } else {
                    slideUp();
                }
            }
        }
    }

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
});

document.addEventListener('keyup', (e) => {
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
})

function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row){
    ///slides row to left;
    ///will only receive parameters such that
    ///we only need to slide left
    row = filterZero(row);
    for(let i = 0; i < row.length - 1; i++){
        ///combine row[i] and row[i + 1]
        if(row[i] == row[i + 1]){
            row[i] = row[i] * 2;
            row[i + 1] = 0;
        }
    }
    row = filterZero(row);

    while(row.length < columns){
        row.push(0);
    }

    return row;
}

function slideLeft(){
    for(let i = 0; i < rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;

        for(let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            updateTile(tile, board[i][j]);
        }
    }
}
function slideRight(){
    for(let i = 0; i < rows; i++){
        let row = board[i];
        row.reverse();
        row = slide(row);
        board[i] = row;
        board[i].reverse();

        for(let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            updateTile(tile, board[i][j]);
        }
    }
}
function slideUp(){
    for(let j = 0; j < columns; j++){
        let row = [];
        for(let i = 0; i < rows; i++){
            row[i] = board[i][j];
        }
        row = slide(row);
        for(let i = 0; i < rows; i++){
            board[i][j] = row[i];
        }

        for(let i = 0; i < rows; i++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            updateTile(tile, board[i][j]);
        }
    }
}

function slideDown(){
    for(let j = 0; j < columns; j++){
        let row = [];
        for(let i = 0; i < rows; i++){
            row[rows - 1 - i] = board[i][j];
        }
        row = slide(row);
        for(let i = 0; i < rows; i++){
            board[i][j] = row[rows - 1 - i];
        }

        for(let i = 0; i < rows; i++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            updateTile(tile, board[i][j]);
        }
    }
}

function updateTile(tile, num){
    if(num != 0){
        tile.innerText = num.toString();
    }
    else {
        tile.innerText = "";
    }
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if(num != 0){
        tile.classList.add("x" + (num));
    }
}

function hasEmptyTile(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            if(board[i][j] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if(!hasEmptyTile()){
        document.getElementById("board").innerHTML = "";
        document.getElementById("board").remove();

        var overScreen = document.createElement("div");
        overScreen.id = "game-over";
        overScreen.style.height = (rows * 100) + "px";
        overScreen.style.width = (columns * 100) + "px";
        overScreen.innerHTML = "Game over!";

        document.getElementsByClassName("articol2048")[0].appendChild(overScreen);


        throw new Error("No more available moves!");
    }

    while(true){
        let x = Math.floor(Math.random() * rows);
        let y = Math.floor(Math.random() * columns);

        if(board[x][y] == 0){
            board[x][y] = 2;
            let tile = document.getElementById(x.toString() + "-" + y.toString());
            tile.innerText = "2";
            updateTile(tile, 2);
            return;
        }
    }
}