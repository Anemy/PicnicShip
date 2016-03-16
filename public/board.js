/*

This method contains methods which help illuminate a current board's state

It's essentially a Board service

*/

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

function getBoardAsOneArray(board) {
  var newBoard = [];

  for(var i = 0; i < boardSize; i++) {
    for(var k = 0; k < boardSize; k++) {
      newBoard.push(board[i][k]);
    }
  }

  return newBoard;
}

function isAllowedMove(board, x, y) {
  if(board[x][y] == MISS || board[x][y] == HIT) {
    return false;
  }
  return true;
}

/*

returns a reward based on what the attempted move results in

*/
function performMoveOnBoard (player, board, move) {
  if(board[move.x][move.y] == EMPTY) {
    $('.status').text(player.name + ' miss :\'(');
    board[move.x][move.y] = MISS;
    return MISS_REWARD;
  }
  else if(board[move.x][move.y] > EMPTY) { // ship
    $('.status').text(player.name + ' hit on enemy ' + ships[board[move.x][move.y]].name + '!!');
    board[move.x][move.y] = HIT;
    return HIT_REWARD;
  }
  else {
    return BADMOVE_REWARD;
  }
}

// returns a location which isn't a hit or miss on the board
function findRandomOpenSpaceOnBoard (board) {
  // right now will just perform a random move on a place which isn't alright burnt
  while(true) {
    var xTry = Math.floor(Math.random()*boardSize);
    var yTry = Math.floor(Math.random()*boardSize);

    if(board[xTry][yTry] != MISS && board[xTry][yTry] != HIT) {
      return {x: xTry, y: yTry};
    }
  }
}