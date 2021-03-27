//CONSTANTS
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
//CONSTANTS END

//GLOBAL VARIABLES
var treeObj, stoneObj,groundObject, launcherObject;
var mango1;
var world;
var bow, bowImg;
var arrowScore=0;
var monsterScore=0;
var backgroundImg;
//GLOBAL VARIABLES END

//
function preload(){
  bowImg=loadImage("bow.png");
  getBackgroundImg();
  }
//END OF FUNCTION PRELOAD

//
function setup() {
  createCanvas(1280,880);
	engine = Engine.create();
	world = engine.world;
  monster1=new Monster(700,200,40);
  monster2=new Monster(950,240,50);
  monster3=new Monster(1180,100,45); 
  monster4=new Monster(1090,700,55);
  monster5=new Monster(710,650,55);
  monster6=new Monster(1000,500,40);
  ground1=new Ground(700,250,75,10);
  ground2=new Ground(950,290,75,10);
  ground3=new Ground(1180,150,75,10);
  ground4=new Ground(1090,750,75,10);
  ground5=new Ground(710,700,75,10);
  ground6=new Ground(1000,550,75,10);
  arrow=new Arrow(200,410,100,100);
  slingshot=new Slingshot(arrow.body,{x:245,y:320});
  slingshot1=new Slingshot(arrow.body,{x:245,y:500});
  var bow=createSprite(250,410,100,100);
  bow.addImage(bowImg);
  bow.scale=0.9;
}
//END OF FUNCTION SETUP

//
function draw() {
  if(backgroundImg)
  background(backgroundImg);
  //background(40);
  console.log(monster1.y);
  Engine.update(engine);
  arrow.display();
  slingshot.display();
  slingshot1.display();
  speed(monster1,ground1);
  speed(monster2,ground2);
  speed(monster3,ground3);
  speed(monster4,ground4);
  speed(monster5,ground5);
  speed(monster6,ground6);


  //TEXT INSTRUCTIONS
    textSize(24);
    fill("red");
    text("Arrows Used: "+arrowScore,30,50);
    text("/6",195,50); 
    text("Monsters Hit: "+monsterScore,30,90);
    if(arrowScore===6&&monsterScore<6){
      textSize(36);
      text("All Arrows Used!",500,400);
      text("Refresh to Play Again!",450,450);
    }
    if(arrowScore<=6&&monsterScore===6){
      textSize(64);
      text("YOU WIN!",500,400);
    }
    //TEXT INSTRUCTIONS END
    drawSprites();     
}
//END OF FUNCTION DRAW

//
function mouseDragged(){
  Matter.Body.setPosition(arrow.body,{x:mouseX, y:mouseY})
  }
//END OF FUNCTION MOUSE-DRAGGED

//
function mouseReleased(){
  if(arrowScore<6){
  slingshot.fly();
  slingshot1.fly();
  arrowScore=arrowScore+1;
  }
}
//END OF FUNCTION MOUSE-RELEASED

//
function speed(lmonster,lground){
  if(lmonster.body.speed<3){
    lmonster.display();
    lground.display();
  }else{
    push();
    lmonster.Visiblity = lmonster.Visiblity - 5;
    tint(255,lmonster.Visiblity);
    pop();
    World.remove(world, lground.body);
  }
  if (lmonster.Visiblity < 255 && lmonster.Visiblity > 249.5){
    monsterScore=monsterScore+1;
    World.remove(world, lmonster.body);
  }
}
//END OF FUNCTION SPEED

//
function keyPressed(){
  if(keyCode === 32&&arrowScore<6&&monsterScore<6){
     slingshot.attach(arrow.body);
     slingshot1.attach(arrow.body);
     Matter.Body.setPosition(arrow.body,{x:200, y:410});
  }
}
//END OF FUNCTION KEY-PRESSED
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=0600 && hour<=1900){
      bg = "bg1.jpg";
  }
  else{
      bg = "bg2.jpg";
  }

  backgroundImg = loadImage(bg);
 // console.log(backgroundImg);
}
