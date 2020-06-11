var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0


function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();


  $("#level-title").text("level " + level);
  level++;
}

nextSequence();

$(".btn").click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

$(document).keydown(function (event) {
  if (event.keyCode == 65) {
    nextSequence();

  } else {
    nextSequence();

  }
});

function checkAnswer(currentLevel){
 if (gamePattern==userClickedPattern[currentLevel-1]){
   console.log("Success");
 } else {
   console.log("Wrong");
 }
 }
