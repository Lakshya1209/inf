var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backImage,backgr;
var ground;
var pikachu,pikachu_running;
var pokemon,weezing,beedrill,oddish,pokemonGroup;
var pokeball,pokeballGroup,pokeballImage;
var pikachuSound;

var score,survivalTime;
var gameOver,gameOverImage,restart,restartImg;


function preload(){
  //loading sound and animation
  pikachu_running = loadAnimation("pikachu2.gif");

pokeballImage =  loadImage("pokeball.png");

weezing = loadImage("weezing.png");
oddish = loadImage("oddish.png");
beedrill = loadImage("dugrito.jpg");
backImage = loadImage("download.jpeg");
gameOverImage = loadImage("Game-over-2.png")
restartImg = loadImage("restart.jpg");
  
  
pikachuSound = loadSound("pikachu.mp3");

}

function setup() {
createCanvas(500,400);
//creating and modifiying sprites

  
gameOver = createSprite(250,200);
gameOver.addImage(gameOverImage);
gameOver.scale =0.4;

pikachu = createSprite(90,340,20,50);
pikachu.addAnimation("Running",pikachu_running);
pikachu.scale = 0.2
  
//creating ground
ground = createSprite(400,350,800,10);
ground.velocityX = -4;
ground.x = ground.width/2;
ground.visible = false;

restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  
  
pokemonGroup = new Group();
pokeballGroup = new Group();
  
score = 0 ;
survivalTime = 0;
  
}

function draw() {

  
fill("yellow");
  stroke("black");
  
  textSize(22)
  text("Score :"+score, 50, 100);
  fill("red");
 
  textSize(22);
  text("Distance :"+survivalTime,100,100);
  
background(backImage);
  
  
if(gameState === PLAY) {
  gameOver.visible= false;
  restart.visible = false;

  
if(ground.x < 100){
  ground.x = ground.width/2;
}

score = score + Math.round(getFrameRate()/60);
  
//adding gravity to pikachu
pikachu.velocityY = pikachu.velocityY + 0.8;
  
spawnPokemon();
spawnPokeball();
pikachu.collide(ground)  
  
  
if(keyDown("space")&& pikachu.y>= 120 ) {
  pikachu.velocityY = -12;
}
  
if(pokeballGroup.isTouching(pikachu)) {
  pokeballGroup.destroyEach();
  score = score + 1;
  pikachuSound.play()
}  

 if(pokemonGroup.isTouching(pikachu)) {
   pokemonGroup.destroyEach();
   gameState= END ;
   
 }  
}  

if(gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  ground.velocityX=0;
  backgr.velcoityX= 0;
  
pokemonGroup.setLifetimeEach(-1);
pokeballGroup.setLifetimeEach(-1);
  
pokemonGroup.setVelocityXEach(0);
pokeballGroup.setVelocityXEach(0);
if(mousePressedOver(restart)) {
  reset();
}
  
}
  
  
  
  
  

  


  

  
  
drawSprites(); 
}

function spawnPokemon() {
 if(frameCount % 80 === 0) {
  var pokemon = createSprite(800,330,20,50);
  pokemon.velocityX = -(6 + score/100);
  pokemon.y = random(400,150);
  
    
   pokemon.scale=0.1;
  //generate random pokemon
   var rand = Math.round(random(1,3));
   switch(rand) {
     case 1: pokemon.addImage(weezing);
            break;
    case 2: pokemon.addImage(oddish);
              break;
      case 3: pokemon.addImage(beedrill);
              break;
}
  pokemonGroup.add(pokemon);
}
}

function spawnPokeball() {
  if(frameCount % 90===0) {
  var pokeball = createSprite(600,250,40,10);
  pokeball.y= random(100,120);
  pokeball.velocityX= -5;
    
  pokeball.lifetime = 300;
  pikachu.depth = pokeball.depth + 1;
    
  pokeball.addImage(pokeballImage);
  pokeball.scale=0.1;
  pokeballGroup.add(pokeball);

}
}
