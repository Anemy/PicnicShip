/*

@author Rhys

This holds all of the constants used by the battleship game

*/

// to differentiate the boards
const LEFT = -1;
const RIGHT = 1;

// hold the indexes of the type of ship and name
// squares on the board will hold an index of this array if they have a ship
const ships = [
  {name: 'Carrier', size: 5},
  {name: 'Battleship', size: 4},
  {name: 'Cruiser', size: 3},
  {name: 'Submarine', size: 3},
  {name: 'Destroyer', size: 2},
];

const boardSize = 10;

// To differentiate locations on the map
const EMPTY = -1;
const MISS = -2;
const HIT = -3;

// a move per half second
const defaultGameSpeed = 30;

const timeBetweenGames = 2000;

console.log('Constants loaded.')