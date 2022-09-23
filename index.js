var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("level " + level);
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var sound = new Audio("sounds/"+ name + ".mp3");
    sound.play();
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success" + gamePattern.length + "  " + userClickedPattern.length);
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        updateScore(level);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}
function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
}


//additional features
var highScore = 0;

$("#level-title").click(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

function updateScore(newScore){
    if(highScore < newScore){
        highScore = newScore;
        $("h3").text("High Score : level " + (highScore-1));
    }
}