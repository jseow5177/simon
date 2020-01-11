var gamePattern = [];
var level = 0;
var count = 0;
var gameStart = false;
var startTiming = false;
var continuous = 1;
var startTime, endTime;
var checkTime;

var buttonColours = ["red", "blue", "green", "yellow"];

// Start game
$(document).one("keypress", function(event) {

  if (event.key === "a") {
    nextSequence();
    gameStart = true;
  };

});

// Initiate check answer when user clicks button
$(".btn").on("click", function(event) {

  // Stop timing when user clicks a button
  startTiming = false;

  if (gameStart === true) {

    var userChosenColour = $(this).attr("id");

    checkAnswer(userChosenColour);

  };

});

// "Continuously" check if user respond time is more than 3 seconds
checkTime = userRespondTime();

// Simon shows the next pattern
function nextSequence() {

  level++;

  $("#level-title").text("Level " + level);

  // Create a random number between 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Randomly choose a color from buttonColours
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // Flash the button
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);

  // Play the button sound
  playSound(randomChosenColour);

  // Start timing user response
  startTime = performance.now();

  startTiming = true;

};

function playSound(name) {

  var buttonAudio = new Audio("sounds/" + name + ".mp3");
  buttonAudio.play();

}

// Animate button press
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

};

// Check user answer
function checkAnswer(userChosenColour) {

  if (userChosenColour === gamePattern[count]) {

    animatePress(userChosenColour);
    playSound(userChosenColour);
    count++;

    // Restart timing until user clicks again
    startTime = performance.now();
    startTiming = true;

  } else {

    endGame();

  };

  // If user successfully matches everything
  if (count === level) {

    count = 0;
    startTiming = false;
    setTimeout(nextSequence, 800);

  }

};

// Lose game
function endGame() {

  // Play 'wrong audio'
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  // Flash red background
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  gameStart = false;

  // Restart game
  $(document).one("keypress", startOver);

  // Stop counting time
  clearInterval(checkTime);

};

// Initiate tracker of user response time
function userRespondTime() {

  var checkTime = window.setInterval(function() {

    if (startTiming) {

      endTime = performance.now();

      if (endTime - startTime > 3000) {
        endGame();
      };

    };
  }, continuous);

  return checkTime;
};

// Restart the game
function startOver() {

  level = 0;
  count = 0;
  gamePattern = [];
  startTiming = false;
  gameStart = true;
  checkTime = userRespondTime();
  nextSequence();

};
