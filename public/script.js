/*

@author Rhys

*/

// boards which contain the game state
var leftBoard = [];
var rightBoard = [];

var leftPlayer = new Player('Left');
var rightPlayer = new Player('Right');

// holds the set interval of the game loop
var gameLoopInterval;

// left player gets the first move
var currentTurn = LEFT;

// dictates how fast the game moves
var gameSpeed = defaultGameSpeed;
var timeBetweenGames = defaultTimeBetweenGames;

if(optomizedGame) {
	gameSpeed = 0;
	timeBetweenGames = 0;
}

var gameOver = false;
var turnsInCurrentGame = 0;
var turnsinGameTotal = [];

var totalAverageRewards = [];
var lastHundredRewards = [];

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

				// console.log('Placed ' + ships[i].name + ' at ' + xTry + ', ' + yTry);
				break; // stop the while loop
			}
		}
	}
}

// resets the state of the game to blank (no ships)
function resetGame() {
	gameOver = false;
	turnsInCurrentGame = 0;

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
	// top row of numbers
	tableString += '<tr><td> </td>';
	for(var i = 0; i < boardSize; i++) {
		tableString += '<td>'+i+'</td>'
	}
	tableString += '</tr>';

	for(var i = 0; i < boardSize; i++) {
		tableString += '<tr><td>'+i+'</td>'
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

function checkGameOver() {
	if(boardHasNoShips(leftBoard)) {
		$('.status').text(rightPlayer.name + ' is the winner!!!\nTurns in game: ' + turnsInCurrentGame);

		gameOver = true;
	}
	else if(boardHasNoShips(rightBoard)) {
		$('.status').text(leftPlayer.name + ' is the winner!!\nTurns in game: ' + turnsInCurrentGame);

		gameOver = true;
	}

	if(gameOver) {
		if(optomizedGame) {
			updatePage();
			turnsinGameTotal.push(turnsInCurrentGame);
			// $('.moves').append('<div class="move">' + turnsInCurrentGame + '</div>')
			resetGame();
			if(turnsinGameTotal.length > 1) {
				updateMovesPerGameVis();
			}
		}
		else {
			setTimeout(function() {
				$('.status').text('Starting a new game...');
				turnsinGameTotal.push(turnsInCurrentGame);
				// $('.moves').append('<div class="move">' + turnsInCurrentGame + '</div>')
				resetGame();
				if(turnsinGameTotal.length > 1) {
					updateMovesPerGameVis();
				}
			}, timeBetweenGames);
		}
		
	}
}

function performTurn() {
	turnsInCurrentGame++;

	// do a move depending on whose turn it is
	if(currentTurn == LEFT) {
		leftPlayer.makeMove(rightBoard);
		currentTurn = RIGHT;
	}
	else if(currentTurn == RIGHT) {
		rightPlayer.makeMove(leftBoard);
		currentTurn = LEFT;
	}
}

function gameLoop() {
	// paused from webpage.js
	if(!paused && !gameOver) {
		performTurn();

		checkGameOver();
	}

	if(!optomizedGame){
		updatePage();
	}
}

// calls to reset the game and start the game loop
function startGame() {
	console.log('Starting game...')

	resetGame();
	console.log('Running game loop.');
	gameLoopInterval = setInterval(gameLoop, gameSpeed);

	if(optomizedGame) {
		updatePage();
	}
}

startGame()

console.log('Game script loaded. ');