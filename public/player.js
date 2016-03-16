/*
@author Rhys

This contains the logic behind making moves
And learning

*/

var Player = function(name) {
  this.name = name;

  // inputs and actions in constants.js
  // deepqlearn from https://github.com/karpathy/convnetjs
  this.brain = new deepqlearn.Brain(AI_INPUTS, AI_ACTIONS);

  // accumulates the moves, their results, and the corresponding board state
  this.pastBoards = [];

  this.makeMove = function(enemyBoard) {

    var action = this.brain.forward(getBoardAsOneArray(enemyBoard));
    // action is a position on the board
    // console.log('Using board: ' + getBoardAsOneArray(enemyBoard));
    // console.log('Attempt action: ' + action + ' x:' + (action%10) + " y:" + Math.floor(action/10));

    // random move
    // var randomTry = findRandomOpenSpaceOnBoard(enemyBoard);

    var move = {
      x: (action%10),
      y: Math.floor(action/10)
    }

    var moveReward = performMoveOnBoard(this, enemyBoard, move);
    // console.log('Move reward: ' + moveReward);

    // This trains the brain
    this.brain.backward(moveReward);

    // pushes the move and the outcome into the pastBoards
    this.pastBoards.push({
      board: enemyBoard,
      reward: moveReward,
      moveX: move.x,
      moveY: move.y
    });
  }
}

console.log('Player loaded');