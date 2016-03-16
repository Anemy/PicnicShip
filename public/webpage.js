/*

@author Rhys

This js contains interactions with the webpage
clicks etc

*/

var paused = false;

var optomizedGame = false;

$(document).ready(function() {
  if(optomizedGame) {
    $('.optomizeButton').addClass('onOptomize');
  }

  $('.pauseplay').click(function() {
    paused = !paused;
    if(paused) {
      $('.pauseplay').text('Play');
    }
    else {
      $('.pauseplay').text('Pause');
    }
  });

  $('.optomizeButton').click(function () {
    if(optomizedGame) {
      $('.optomizeButton').removeClass('onOptomized');
    }
    else {
      $('.optomizeButton').addClass('onOptomized');
    }

    optomizedGame = !optomizedGame;
  });
});