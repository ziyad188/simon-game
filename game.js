var buttonCoulors = ["red","blue","green","yellow"];
var randomChoosencolor =  "";
var gamePattern = []; 
var userClickedPattern = []; 
var level = 0;

$(document).keydown(function(){
    if(level === 0){
        $("h1").text("Press A Key to Start");
        nextSequence();
    }
    
})
$(".btn").click(function(){
    
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern)
    audioPlay(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern.length-1)
    checkAnswer(userClickedPattern.length-1);
    
});

function nextSequence(){
    var ranNum = Math.random()*4;
    ranNum = Math.floor(ranNum)
    randomChoosencolor = buttonCoulors[ranNum];
    gamePattern.push(randomChoosencolor);
    console.log(gamePattern);
    $("#"+randomChoosencolor).fadeOut(100).fadeIn(100);
    audioPlay(randomChoosencolor);
    level++;
    $("h1").text("Level " + level);

}

    

function audioPlay(play){
    
            var audio = new Audio("sounds/"+ play +".mp3");
            audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },10);
    
    

}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        $("h1").text("Game Over! press A Key to Start Again");
        $("body").addClass("game-over")
        setTimeout(function(){
           $("body").removeClass("game-over")
        },100);
  
      }

}