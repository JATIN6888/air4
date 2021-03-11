
var canvas,edges;
function preload (){

  bg=loadImage("image/ground2.jpg")
  playerImg=loadImage("image/player1.gif")
  computerImg=loadImage("image/player2.gif")
BALLImg=loadImage("image/ball.gif")

}

function setup() {
  canvas = createCanvas(displayWidth-10 , displayHeight-115);
 // createCanvas(1200,800);
 // Bg= createSprite(600,300,500,500)
 ball = createSprite(displayWidth/2,displayHeight/2.4);
 playerPaddle = createSprite(displayWidth/1.1,displayHeight/2.4);
 computerPaddle = createSprite(displayWidth/10,displayHeight/2.4);

 
 //scale(0.8)
 //Bg.addImage(bg)
 //Bg.scale=1.5;
playerPaddle.addImage(playerImg)
playerPaddle.scale=0.5;
computerPaddle.addImage(computerImg)
computerPaddle.scale=0.5;
ball.addImage(BALLImg)
ball.scale=0.2



}
//create the ball, playerPaddle and computerPaddle as sprite objects

//ball.setAnimation("ball");

//computerPaddle.setAnimation("player");
//playerPaddle.setAnimation("player");
//variable to store different state of game
var gameState = "serve";

//variables to keep the score
var compScore = 0;
var playerScore = 0;


function draw() {
  //clear the screen
  //scale(2)
  background(bg);
  drawSprites();
  
  if(ball.isTouching(computerPaddle) || ball.isTouching(playerPaddle)) {
  // playSound("hit.mp3");
  }
  
  //place info text in the center
  if (gameState === "serve") {
    stroke("white")
    text("Press Space to Serve",displayWidth/2.2,displayHeight/3);
  }
   
  //display scores
  textSize(16)
stroke("cyan")
  text(compScore, displayWidth/2-130,20);
  text(playerScore, displayWidth/2+100,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
 // computerPaddle.y = ball.y;
 playerPaddle
  //draw line at the centre
  // for (var i = 0; i < 400; i=i+20) {
  //   line(200,i,200,i+10);
  // }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  edges=createEdgeSprites();
  //console.log(edges)
ball.bounceOff(edges[3]);
ball.bounceOff(edges[2]);
ball.bounceOff(playerPaddle);
 ball.bounceOff(computerPaddle);
 computerPaddle.bounceOff(edges[3]);
 computerPaddle.bounceOff(edges[2]);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 if (keyDown("up") ){
   computerPaddle.velocityY=-6
 }
 if (keyDown("down") ){
  computerPaddle.velocityY=6
}
  //reset the ball to the centre if it crosses the screen
  if(ball.x > displayWidth || ball.x <0) {
    console.log(displayWidth)
    
    if(ball.x > displayWidth) {
       compScore = compScore + 1;
     }
    
     if(ball.x < 0) {
       playerScore = playerScore + 1;
     }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",displayWidth/2.2,displayHeight/2.5);
    text("Press 'R' to Restart",displayWidth/2.3,displayHeight/2.2);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
 
}

function serve() {
  ball.velocityX = 6;
  ball.velocityY = 10;
}

function reset() {
  ball.x = displayWidth/2
  ball.y = displayHeight/2.4;
  ball.velocityX = 0;
  ball.velocityY = 0;
}

//function draw() {
  //background(255,255,255);  
  //drawSprites();
