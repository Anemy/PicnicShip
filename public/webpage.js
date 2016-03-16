/*

@author Rhys

This js contains interactions with the webpage
clicks etc

*/

var paused = false;

$(document).ready(function() {
  $('.pauseplay').click(function() {
    paused = !paused;
    if(paused) {
      $('.pauseplay').text('Play');
    }
    else {
      $('.pauseplay').text('Pause');
    }
  });
});