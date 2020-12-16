var ghost,ghostImg,ghostJump,climber,climberImg,bg,bgImg,door,doorImg,doorGroup,climberGroup,invisibleBlock,invisibleBlockGroup
var spookySound

var PLAY = 1;
var gameState = PLAY;
var END = 0;

function preload(){
  ghostImg = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  bgImg = loadImage("tower.png");
  spookySound = loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  bg = createSprite(300,300,600,600);
  bg.addImage(bgImg);
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(300,300,30,30);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  ghost.velocityY = 2;
  

  
  
  
}
function draw(){
  background("black");
    bg.velocityY = 2;
  spookySound.loop();
 if(gameState == PLAY){
  if(bg.y>600){
    bg.y = 300
    
  }
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY +0.9;
  if(keyDown("left")){
    ghost.x = ghost.x -3;
  }
   if(keyDown("right")){
    ghost.x = ghost.x +3;
  }
  if(climberGroup.isTouching(ghost)){
 ghost.collide(climberGroup);
  }
   if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      gameState = END;
   }
  
  spawnDoors();
 
  drawSprites();
 }
  if(gameState==END){
    textSize(25);
    fill("red");
    text("GAME OVER!!",300,300);
  }
}
function spawnDoors(){
  if(frameCount%160==0){
    door = createSprite(300,0,20,20);
    door.addImage(doorImg);
    door.velocityY = 2;
    door.x = Math.round(random(100,400));
  
     door.lifetime = 300;
  doorGroup.add(door);
    ghost.depth = door.depth 
    ghost.depth = ghost.depth +1;
    
    climber = createSprite(300,50,20,20);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 300;
    climberGroup.add(climber);
    invisibleBlock = createSprite(300,60,20,10);
    invisibleBlock.x = climber.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.velocityY = 2;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 300;
    invisibleBlockGroup.add(invisibleBlock);
    
    
  }
}