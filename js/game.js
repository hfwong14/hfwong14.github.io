
// Global Variables
var currentHighlightedCell = [10, 10]
var ifHighlighted = false


class Piece {
    constructor(ifWhite) {
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
    constructor(ifWhite) {
        super(ifWhite)

        this.name = "Pawn"

        if (ifWhite) {
            this.imgSrc = "./img/w_pawn.png"
        }
        else {
            this.imgSrc = "./img/b_pawn.png"
        }
    }
}

class Rook extends Piece {
    constructor(ifWhite) {
        super(ifWhite)

        this.name = "Rook"

        if (ifWhite) {
            this.imgSrc = "./img/w_rook.png"
        }
        else {
            this.imgSrc = "./img/b_rook.png"
        }
    }
}

class Knight extends Piece {
    constructor(ifWhite) {
        super(ifWhite)

        this.name = "Knight"

        if (ifWhite) {
            this.imgSrc = "./img/w_knight.png"
        }
        else {
            this.imgSrc = "./img/b_knight.png"
        }
    }
}

class Bishop extends Piece {
    constructor(ifWhite) {
        super(ifWhite)

        this.name = "Bishop"

        if (ifWhite) {
            this.imgSrc = "./img/w_bishop.png"
        }
        else {
            this.imgSrc = "./img/b_bishop.png"
        }
    }
}

class Queen extends Piece {
    constructor(ifWhite) {
        super(ifWhite)

        this.name = "Queen"

        if (ifWhite) {
            this.imgSrc = "./img/w_queen.png"
        }
        else {
            this.imgSrc = "./img/b_queen.png"
        }
    }
}

class King extends Piece {
    constructor(ifWhite) {
        super(ifWhite)

        this.name = "King"

        if (ifWhite) {
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

        for (var i = 0; i < 8; i++) {
            this.board[i] = new Array(8)
        }
    
        // set default
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
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
    
        for (var j = 0; j < 8; j++) {
            this.board[1][j] = new Pawn(false)
        }
    
        // white pieces
        for (var j = 0; j < 8; j++) {
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
        this.dotsList = []
        
    }

    getBoard() {
        return this.board
    }
}

// Turn i, j into a number (e.g. 1, 3 --> 13)
function posToValue(i, j) {
    return parseInt(i * 10) + parseInt(j)
}

// Update piece images
function updateImages(cBoard) {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {

            var tempCell = document.getElementById(i + "_" + j)
            while (tempCell.firstChild){    // remove all old nodes
                // console.log(tempCell.firstChild)
                tempCell.removeChild(tempCell.firstChild)
            }

            // Add pieces images onto display board
            if (cBoard.board[i][j].name != "None") {
                var tempImg = document.createElement('img')
                tempImg.src = cBoard.board[i][j].imgSrc
                tempImg.classList.add('pieceImg')
                document.getElementById(`${i}_${j}`).appendChild(tempImg)
            }

            // Add dots onto display board from chessBoard.dotsList
            var posVar = posToValue(i, j)
            if (cBoard.dotsList.includes(posVar)) { // Exists in list
                var displayCell = document.getElementById(`${i}_${j}`)
            
                var dotElement = document.createElement('img')
                dotElement.src = "./img/dot.png"
                dotElement.classList.add('dot')
                displayCell.appendChild(dotElement)
            }
        }
    }
}

function checkDirection(i, j, pieceObj, change_i, change_j, infinite) {
	var new_i = parseInt(i) + parseInt(change_i)
	var new_j = parseInt(j) + parseInt(change_j)
	console.log(`new i : ${new_i} new j : ${new_j}`)
	// Stop recursion when out of bound
	if (new_i < 0 || new_i > 7 || new_j < 0 || new_j > 7) {
		return true
	}

	// Check obstacle piece
	var obstaclePiece = chessBoard.board[new_i][new_j]
	if (obstaclePiece instanceof Empty) {	// If empty
		posVar = posToValue(new_i, new_j)
		chessBoard.dotsList.push(posVar)
        if (infinite) {
            checkDirection(new_i, new_j, pieceObj, change_i, change_j, infinite)
        }
	}

	// Not empty, so check if same side
	if (obstaclePiece.side != pieceObj.side) {	// Not same side
		posVar = posToValue(new_i, new_j)
		chessBoard.dotsList.push(posVar)
		return true
	}
	else {	// Same side
		return true
	}
}

function checkStraight(i, j, pieceObj) {
	// Check horizontal
	var horizontalLine = chessBoard.board[i]
	var leftCan = 0
	var rightCan = 7

	for (var left = 0; left < j; left++){   // check left
		// If empty, just go to next spot
		if (horizontalLine[left] instanceof Empty) {
			continue
		}

		// Not empty, so check if same side
		var obstaclePiece = chessBoard.board[i][left]
		if (obstaclePiece.side != pieceObj.side) {	// Not same side
			leftCan = left
		}
		else {	// Same side
			leftCan = left + 1
		}
	}

	for (var right = 7; right > j; right--) {	// check right
		console.log(right)
		// If empty, just go to next spot
		if (horizontalLine[right] instanceof Empty) {
			continue
		}

		// Not empty, so check if same side
		var obstaclePiece = chessBoard.board[i][right]
		if (obstaclePiece.side != pieceObj.side) {	// Not same side
			rightCan = right
		}
		else {	// Same side
			rightCan = right - 1
		}
	}

	// Add dots to board (horizontal)
	for (var horiScan = leftCan; horiScan < rightCan + 1; horiScan++) {
		if (horiScan != j) {
			posVar = posToValue(i, horiScan)
			chessBoard.dotsList.push(posVar)
		}
	}

	// Check Vertical
	var verticalLine = []
	for (var row = 0; row < 8; row++) {
		verticalLine.push(chessBoard.board[row][j])
	}
	var upCan = 0
	var downCan = 7

	for (var up = 0; up < i; up++){   // check up
		// If empty, just go to next spot
		if (verticalLine[up] instanceof Empty == true) {
			continue
		}

		// Not empty, so check if same side
		var obstaclePiece = chessBoard.board[up][j]
		if (obstaclePiece.side != pieceObj.side) {	// Not same side
			upCan = up
		}
		else {	// Same side
			upCan = up + 1
		}
	}

	for (var down = 7; down > i; down--) {	// check down
		// If empty, just go to next spot
		if (verticalLine[down] instanceof Empty == true) {
			continue
		}

		// Not empty, so check if same side
		var obstaclePiece = chessBoard.board[down][j]
		if (obstaclePiece.side != pieceObj.side) {	// Not same side
			downCan = down
		}
		else {	// Same side
			downCan = down - 1
		}
	}

	// console.log(`upcan:${upCan} downcan:${downCan}`)
	// console.log(verticalLine)

	// Add dots to board (vertical)
	for (var vertScan = upCan; vertScan < downCan + 1; vertScan++) {
		if (vertScan != i) {
			posVar = posToValue(vertScan, j)
			chessBoard.dotsList.push(posVar)
		}
	}

}

function checkDiagonal(i, j, pieceObj) {
	checkDirection(i, j, pieceObj, -1, -1, true) // Check left up
	checkDirection(i, j, pieceObj, -1, +1, true) // Check right up
	checkDirection(i, j, pieceObj, +1, -1, true) // Check left down
	checkDirection(i, j, pieceObj, +1, +1, true) // Check right down
}

function calcMoves(i, j) {
    console.log(`Calculating move ${i} ${j}`)
    var pieceObj = chessBoard.board[i][j]
    
    // Rook move logic
    if (pieceObj instanceof Rook) {
		checkStraight(i, j, pieceObj)
    }
	// Bishop move logic
	if (pieceObj instanceof Bishop) {
		checkDiagonal(i, j, pieceObj)
	}
	// Queen move logic
	if (pieceObj instanceof Queen) {
		checkStraight(i, j, pieceObj)
		checkDiagonal(i, j, pieceObj)
	}
    // King move logic
    if (pieceObj instanceof King) {
        checkDirection(i, j, pieceObj, -1, -1, false) // Check left up
        checkDirection(i, j, pieceObj, -1, +1, false) // Check right up
        checkDirection(i, j, pieceObj, +1, -1, false) // Check left down
        checkDirection(i, j, pieceObj, +1, +1, false) // Check right down

        checkDirection(i, j, pieceObj, 0, -1, false) // Check left
        checkDirection(i, j, pieceObj, 0, +1, false) // Check right
        checkDirection(i, j, pieceObj, +1, 0, false) // Check up
        checkDirection(i, j, pieceObj, -1, 0, false) // Check down
    }
    // Knight move logic
    if (pieceObj instanceof Knight) {
        checkDirection(i, j, pieceObj, -2, -1, false) // Check up left
        checkDirection(i, j, pieceObj, -2, +1, false) // Check up right
        checkDirection(i, j, pieceObj, -1, -2, false) // Check left up 
        checkDirection(i, j, pieceObj, -1, +2, false) // Check right up
        
        checkDirection(i, j, pieceObj, +1, -2, false) // Check left down
        checkDirection(i, j, pieceObj, +1, +2, false) // Check right down
        checkDirection(i, j, pieceObj, +2, -1, false) // Check down left
        checkDirection(i, j, pieceObj, +2, +1, false) // Check down right
    }
}

function clickedCell(cellID, chess) {
    var i = cellID.split('_')[0]
    var j = cellID.split('_')[1]
    var coords = [i, j]

    var old_i = chess.selectedCell[0]
    var old_j = chess.selectedCell[1]

    console.log(`Clicked Cell ID: ${i} ${j}`)
    // console.log(`Highlighted Cell: ${currentHighlightedCell[0]} ${currentHighlightedCell[1]}`)

    if (chess.ifSelected) {     // Previously highlighted
        if (coords[0] == chess.selectedCell[0] && coords[1] == chess.selectedCell[1]) {    // turn off highlight
            chess.selectedCell = [10, 10]
            chess.ifSelected = false

            document.getElementById(`${i}_${j}`).classList.remove('highlighted')
            chess.dotsList = []
        }
        else if (chessBoard.board[old_i][old_j].side == chess.board[i][j].side) {  // alert if both piece on the same side

            console.log("Cannot eat same side")
            alert("Cannot eat same side")

            // OLD CODE TO REMOVE HIGHLIGHT WHEN TRYING TO EAT SAME SIDE
            // chess.selectedCell = [10, 10]
            // chess.ifSelected = false
            // document.getElementById(`${old_i}_${old_j}`).classList.remove('highlighted')
        }
        else {  // move piece if not same side
            var old_i = chess.selectedCell[0]
            var old_j = chess.selectedCell[1]

            const replacedPiece = chess.board[i][j] // For win checking (not implemented yet)
            chess.board[i][j] = chess.board[old_i][old_j]
            chess.board[old_i][old_j] = new Empty()

            chess.selectedCell = [10, 10]
            chess.ifSelected = false

            document.getElementById(`${old_i}_${old_j}`).classList.remove('highlighted')
            chess.dotsList = []
        }
    }
    else if (chess.board[i][j] instanceof Empty == false) {  // Highlight cell
        console.log(`Selected ${i} ${j}`)
        chess.selectedCell = coords
        chess.ifSelected = true

        var displayCell = document.getElementById(`${i}_${j}`)
        displayCell.classList.add('highlighted')

        // Calculate possible moves and add dots
        calcMoves(i, j)
    }

    updateImages(chess)
}

let chessBoard = new Board()

function startUP() {
    var gameBoard = document.getElementById("gameBoard")

    console.log(chessBoard.getBoard())

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var tempElement = document.createElement("div")
            tempElement.style.border = "thin solid"
            tempElement.id = i + "_" + j
            tempElement.classList.add('cellBlock')
            if ((i + j) % 2 == 1) {
                tempElement.classList.add('grayBlock')
            }
            tempElement.addEventListener('click', function() {clickedCell(this.id, chessBoard), false})
            gameBoard.appendChild(tempElement)
        }
    }

    updateImages(chessBoard)

}


startUP()