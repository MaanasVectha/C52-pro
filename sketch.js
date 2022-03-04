var  bird,bird_flying;
var sky_image;
var cloudsGroup, cloudImage;
var apple,appleimg,applegroup;
var strawberry,strawberryimg,strawberrygroup;
var guava,guavaimg,guavagroup;
var cherry,cherryimg;
var score=0;
var obstacle1img;
var obstacle2img;
var obstaclesGroup;

function preload(){
 bird_flying = loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png");
 sky_image = loadImage("backgroundImg.png");
 cloudImage = loadImage("cloud.png");
 appleimg = loadImage("download 1.png");
 strawberryimg = loadImage("download (1).jpg");
 guavaimg = loadImage("download (2).jpg");
 obstacle1img = loadImage("obstacle1.jpg");
 obstacle2img = loadImage("download (3).jpg")
}

function setup() {
 createCanvas(windowWidth,windowHeight);

 bird = createSprite(75,height-350,20,20);
 bird.addAnimation("flying",bird_flying);
 bird.scale=0.5

 cloudsGroup = new Group();
 guavagroup = new Group();
 strawberrygroup = new  Group();
 applegroup = new Group();
 obstaclesGroup = new Group();
}

function draw() {
 background(sky_image);
 textSize(25)
 stroke("red")
 text("Score:"+ score , windowWidth/2+400, windowHeight/2-300)

 if(keyDown("up")) {
   bird.y=bird.y-5
 }

 if(keyDown("down")) {
   bird.y=bird.y+5
 }

  if(score<0){
    textSize(50)
    stroke("pink")
    text("Game Over",windowWidth/2-100,windowHeight/2)
    obstaclesGroup.setVelocityXEach(0)
    guavaGroup.setVelocityXEach(0)
    strawberryGroup.setVelocityXEach(0)
    appleGroup.setVelocityXEach(0)
  }

 

 drawSprites();

 spawnClouds();

 spawnapples();
 spawnguava();
 spawnstrawberry();
 spawnobstacles();
}

function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var cloud = createSprite(width+20,height-300,40,10);
      cloud.y = Math.round(random(100,220));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
      cloud.velocityX = -3
      cloud.lifetime = 600

      cloudsGroup.add(cloud);

      cloud.depth=bird.depth;
      bird.depth=bird.depth+1
    }
}

function spawnapples(){
  if(frameCount % 80===0){
  apple=createSprite(width,random(50,height),20,20)
  apple.addAnimation("apple",appleimg)
  apple.velocityX = -5
  apple.scale=0.3
  applegroup.add(apple)

  
  }
  if(applegroup.isTouching(bird)){
    applegroup.destroyEach()
    score=score+20
  }
} 
function spawnstrawberry(){
  if(frameCount % 60===0){
  strawberry=createSprite(random(700,800),random(50,350),20,20)
  strawberry.addAnimation("strawberry",strawberryimg)
  strawberry.velocityX = -5
  strawberry.scale=0.3
  strawberrygroup.add(strawberry)

  
  }
  if(strawberrygroup.isTouching(bird)){
    strawberrygroup.destroyEach()
    score=score+15
  }
}
function spawnguava(){
  if(frameCount % 100===0){
    guava=createSprite(random(800,1000),random(50,350),20,20)
    guava.addAnimation("guava",guavaimg)
    guava.velocityX = -5
    guava.scale=0.3
    guavagroup.add(guava)
  }
  if(guavagroup.isTouching(bird)){
    guavagroup.destroyEach()
    score=score+10
  }
}
function spawnobstacles(){
  if(frameCount % 120===0){
    var obstacle = createSprite(random(600,1000),random(100,300),20,20)
    obstacle.velocityX = -(5 + 2*score/100)
    var rand = Math.round(random(1,2))
     switch(rand){
     case 1:obstacle.addImage(obstacle1img);
            break;
     case 2:obstacle.addImage(obstacle2img);
            break;
     default:break;
  }
  obstacle.scale=0.2;
  obstacle.lifetime = 300;
  obstaclesGroup.add(obstacle)
  
  }
  if(bird.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach()
    score=score-25
  }
}
