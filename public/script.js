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

// resets the state of the game to blank (no ships)
function resetGame() {
	leftBoard = [];
	rightBoard = [];

	for(var i = 0; i < boardSize; i++) {
		leftBoard[i] = [];
		rightBoard[i] = [];

		for(var k = 0; k < boardSize; k++){
			leftBoard[i][k] = EMPTY;
			rightBoard[i][k] = EMPTY;
		}
	}
}

function drawGame() {

}

function gameLoop() {

}

// calls to reset the game and start the game loop
function startGame() {
	resetGame();

	gameLoopInterval = setInterval(gameLoop, gameSpeed);
}

console.log('Script loaded. ');