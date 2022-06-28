
// Global Variables
var currentHighlightedCell = [10, 10]
var ifHighlighted = false


class Piece {
    constructor(ifWhite){
        this.side = ifWhite // true if white, false if black
    }
}

class Empty{
    constructor() {
        this.name = "None"
    }

    getName() {
        console.log("This is an empty object")
    }
}

class Pawn extends Piece {
    constructor(ifWhite){
        super(ifWhite)

        this.name = "Pawn"

        if (ifWhite){
            this.imgSrc = "./img/w_pawn.png"
        }
        else {
            this.imgSrc = "./img/b_pawn.png"
        }
    }
}

class Rook extends Piece {
    constructor(ifWhite){
        super(ifWhite)

        this.name = "Rook"

        if (ifWhite){
            this.imgSrc = "./img/w_rook.png"
        }
        else {
            this.imgSrc = "./img/b_rook.png"
        }
    }
}

class Knight extends Piece {
    constructor(ifWhite){
        super(ifWhite)

        this.name = "Knight"

        if (ifWhite){
            this.imgSrc = "./img/w_knight.png"
        }
        else {
            this.imgSrc = "./img/b_knight.png"
        }
    }
}

class Bishop extends Piece {
    constructor(ifWhite){
        super(ifWhite)

        this.name = "Bishop"

        if (ifWhite){
            this.imgSrc = "./img/w_bishop.png"
        }
        else {
            this.imgSrc = "./img/b_bishop.png"
        }
    }
}

class Queen extends Piece {
    constructor(ifWhite){
        super(ifWhite)

        this.name = "Queen"

        if (ifWhite){
            this.imgSrc = "./img/w_queen.png"
        }
        else {
            this.imgSrc = "./img/b_queen.png"
        }
    }
}

class King extends Piece {
    constructor(ifWhite){
        super(ifWhite)

        this.name = "King"

        if (ifWhite){
            this.imgSrc = "./img/w_king.png"
        }
        else {
            this.imgSrc = "./img/b_king.png"
        }
    }
}

class Board {
    // Initializing 
    constructor() {
        // Initiate Board
        this.board = new Array(8)

        for (var i = 0; i < 8; i++){
            this.board[i] = new Array(8)
        }
    
        // set default
        for (var i = 0; i < 8; i++){
            for (var j = 0; j < 8; j++){
                this.board[i][j] = new Empty()
            }
        }
        
        // rook, knight, bishop, queen, king, bishop, knight, rook
    
        // black pieces
        this.board[0][0] = new Rook(false)
        this.board[0][1] = new Knight(false)
        this.board[0][2] = new Bishop(false)
    
        this.board[0][3] = new Queen(false)
        this.board[0][4] = new King(false)
    
        this.board[0][5] = new Bishop(false)
        this.board[0][6] = new Knight(false)
        this.board[0][7] = new Rook(false)
    
        for (var j = 0; j < 8; j++){
            this.board[1][j] = new Pawn(false)
        }
    
        // white pieces
        for (var j = 0; j < 8; j++){
            this.board[6][j] = new Pawn(true)
        }
    
        this.board[7][0] = new Rook(true)
        this.board[7][1] = new Knight(true)
        this.board[7][2] = new Bishop(true)
    
        this.board[7][3] = new Queen(true)
        this.board[7][4] = new King(true)
    
        this.board[7][5] = new Bishop(true)
        this.board[7][6] = new Knight(true)
        this.board[7][7] = new Rook(true)

        // Board Variables
        this.ifSelected = false
        this.selectedCell = [10, 10]
        
    }

    getBoard() {
        return this.board
    }
}

function updateImage(board){
    // Update piece images
    for (var i = 0; i < 8; i++){
        for (var j = 0; j < 8; j++){

            var tempCell = document.getElementById(i + "_" + j)
            if (tempCell.hasChildNodes()){  // remove previous text
                tempCell.removeChild(tempCell.firstChild)
            }

            if (chessBoard.board[i][j].name != "None"){
                var tempImg = document.createElement('img')
                tempImg.src = chessBoard.board[i][j].imgSrc
                tempImg.classList.add('pieceImg')
                document.getElementById(`${i}_${j}`).appendChild(tempImg)
            }
        }
    }
}

function updateBoard(board){
    // update state of the gameBoard div
    for (var i = 0; i < 8; i++){
        for (var j = 0; j < 8; j++){
            var tempCell = document.getElementById(i + "_" + j)
            var textNode = document.createTextNode(board[i][j])

            if (tempCell.hasChildNodes()){  // remove previous text
                tempCell.removeChild(tempCell.firstChild)
            }

            // tempCell.appendChild(textNode)
        }
    }
    
}

function clickedCell(cellID, chess){
    var i = cellID.split('_')[0]
    var j = cellID.split('_')[1]
    var coords = [i, j]

    var old_i = chess.selectedCell[0]
    var old_j = chess.selectedCell[1]

    console.log(`Clicked Cell ID: ${i} ${j}`)
    // console.log(`Highlighted Cell: ${currentHighlightedCell[0]} ${currentHighlightedCell[1]}`)

    if (chess.ifSelected){     // Previously highlighted
        if (coords[0] == chess.selectedCell[0] && coords[1] == chess.selectedCell[1]){    // turn off highlight
            chess.selectedCell = [10, 10]
            chess.ifSelected = false

            document.getElementById(`${i}_${j}`).classList.remove('highlighted')
        }
        else if (chessBoard.board[old_i][old_j].side == chess.board[i][j].side){  // both piece on the same side
            chess.selectedCell = [10, 10]
            chess.ifSelected = false

            document.getElementById(`${old_i}_${old_j}`).classList.remove('highlighted')

            console.log("Cannot eat same side")
            alert("Cannot eat same side")
        }
        else {  // move piece if not same side
            var old_i = chess.selectedCell[0]
            var old_j = chess.selectedCell[1]

            chess.board[i][j] = chess.board[old_i][old_j]
            chess.board[old_i][old_j] = new Empty()

            chess.selectedCell = [10, 10]
            chess.ifSelected = false

            document.getElementById(`${old_i}_${old_j}`).classList.remove('highlighted')
        }
    }
    else if (chess.board[i][j] instanceof Empty == false){
        console.log(`Selected ${i} ${j}`)
        chess.selectedCell = coords
        chess.ifSelected = true

        document.getElementById(`${i}_${j}`).classList.add('highlighted')
    }

    updateImage(chess.getBoard())
}

let chessBoard = new Board()

function startUP(){
    var gameBoard = document.getElementById("gameBoard")

    console.log(chessBoard.getBoard())

    for (var i = 0; i < 8; i++){
        for (var j = 0; j < 8; j++){
            var tempElement = document.createElement("div")
            tempElement.style.border = "thin solid"
            tempElement.id = i + "_" + j
            tempElement.classList.add('cellBlock')
            if ((i + j) % 2 == 1){
                tempElement.classList.add('grayBlock')
            }
            tempElement.addEventListener('click', function(){clickedCell(this.id, chessBoard), false})
            gameBoard.appendChild(tempElement)
        }
    }

    updateImage(chessBoard.getBoard())

}


startUP()