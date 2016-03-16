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

    // TODO add logic to moves
    var randomTry = findRandomOpenSpaceOnBoard(enemyBoard);

    var move = {
      x: randomTry.x,
      y: randomTry.y
    }

    var moveOutcome = performMoveOnBoard(this, enemyBoard, move);

    // pushes the move and the outcome into the pastBoards
    this.pastBoards.push({
      board: enemyBoard,
      outcome: moveOutcome,
      moveX: move.x,
      moveY: move.y
    });
  }
}

console.log('Player loaded');