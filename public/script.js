/*

@author Rhys

*/

// boards which contain the game state
var leftBoard = [];
var rightBoard = [];

// holds the set interval of the game loop
var gameLoopInterval;

// left player gets the first move
var currentTurn = LEFT;

// dictates how fast the game moves
var gameSpeed = defaultGameSpeed;

// places the ships randomly around the board (where they fit)
function placeShips(board) {
	for(var i = 0; i < ships.length; i++) {
		// vertical or horizontal 0 or 1
		var orientation = Math.floor(Math.random()*2);

		// loops until an available position is selected
		while(true) {
			// try to place the starting position of the ship here
			var xTry = Math.floor(Math.random()*boardSize);
			var yTry = Math.floor(Math.random()*boardSize);

			var allowPlacement = true;

			for(var k = 0; k < ships[i].size; k++) {
				if(xTry + k >= boardSize || yTry + k >= boardSize) {
					// off the map
					allowPlacement = false;
					break;
				}

				if(orientation == 0 && board[xTry+k][yTry] != EMPTY) {
					// x conflict
					allowPlacement = false;
					break;
				}
				else if(orientation == 1 && board[xTry][yTry+k] != EMPTY) {
					// y conflict
					allowPlacement = false;
					break;
				}
			}

			if(allowPlacement) {
				// change the board's state
				for(var k = 0; k < ships[i].size; k++) {
					if(orientation == 0) {
						board[xTry+k][yTry] = i;
					}
					else {
						board[xTry][yTry+k] = i;
					}
				}

				console.log('Placed ' + ships[i].name + ' at ' + xTry + ', ' + yTry);
				break; // stop the while loop
			}
		}
	}
}

// resets the state of the game to blank (no ships)
function resetGame() {
	leftBoard = [];
	rightBoard = [];

	// reset the board to fully empty
	for(var i = 0; i < boardSize; i++) {
		leftBoard[i] = [];
		rightBoard[i] = [];

		for(var k = 0; k < boardSize; k++){
			leftBoard[i][k] = EMPTY;
			rightBoard[i][k] = EMPTY;
		}
	}

	placeShips(leftBoard);
	placeShips(rightBoard);
}

// returns a string which defines an HTML table based on the passed board
function getBoardAsTable(board) {
	var tableString = '';
	for(var i = 0; i < boardSize; i++) {
		tableString += '<tr>'
		for(var k = 0; k < boardSize; k++) {
			switch(board[i][k]) {
				case EMPTY:
					tableString += '<td class="empty"></td>';
					break;
				case HIT:
					tableString += '<td class="hit"></td>';
					break;
				case MISS:
					tableString += '<td class="miss"></td>';
					break;
				default:
					tableString += '<td class="ship"></td>';
					break;
			}
		}
		tableString += '</tr>';
	}

	return tableString;
}

/*
Currently the game will draw as a table in html so editing the styling is easy (as oposed to html canvas)
This functions builds the html table and adds it to the page
*/
function updatePage() {
	// reset the drawing of the current tables
	$('#leftBoard').html(getBoardAsTable(leftBoard));
	$('#rightBoard').html(getBoardAsTable(rightBoard));

	// makes the boards display as squares
	var cw = $('.board').width();
	$('.board').css({'height':cw+'px'});
}

// will perform a turn on the board passed
function turn(board) {
	// right now will just perform a random move on a place which isn't alright burnt
	while(true) {
		var xTry = Math.floor(Math.random()*boardSize);
		var yTry = Math.floor(Math.random()*boardSize);

		if(board[xTry][yTry] != MISS && board[xTry][yTry] != HIT) {
			if(board[xTry][yTry] == EMPTY) {
				$('.status').text('Miss :\'(');
				board[xTry][yTry] = MISS;
				return MISS;
			}
			else {
				$('.status').text('Hit on enemy ' + ships[board[xTry][yTry]].name + '!!');
				board[xTry][yTry] = HIT;
				return HIT;
			}
		}
	}
}

// returns whether or not the passed board has any ships left
function boardHasNoShips (board) {
	for(var i = 0; i < boardSize; i++) {
		for(var k = 0; k < boardSize; k++) {
			if(board[i][k] > EMPTY) {
				return false;
			}
		}
	}

	return true;
}

function checkGameOver() {
	if(boardHasNoShips(leftBoard)) {
		console.log('Left is the winner!!');
		$('.status').text('Right is the winner!!!');
		clearInterval(gameLoopInterval);
	}
	else if(boardHasNoShips(rightBoard)) {
		console.log('Left is the winner!!');
		$('.status').text('Left is the winner!!');
		clearInterval(gameLoopInterval);
	}
}

function performMove() {
	// do a move depending on whose turn it is
	if(currentTurn == LEFT) {
		var turnResult = turn(rightBoard);
		currentTurn = RIGHT;
	}
	else if(currentTurn == RIGHT) {
		var turnResult = turn(leftBoard);
		currentTurn = LEFT;
	}
}

function gameLoop() {
	// paused from webpage.js
	if(!paused) {
		performMove();
	}

	checkGameOver();

	updatePage();
}

// calls to reset the game and start the game loop
function startGame() {
	console.log('Starting game...')

	resetGame();

	gameLoopInterval = setInterval(gameLoop, gameSpeed);
}

startGame();
console.log('Game script loaded. ');