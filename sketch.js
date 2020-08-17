//Create variables here
var dog , dogImg, dogHappy ,sadDog,deadDog;
var database;
var foodStock, foods;
var milkImg, foodObj;
var feedDog, addFood;
var fedTime, lastfed;
var foodCount, foodC;
var brImg, gdImg, wrImg, lrImg;
var currentTime, State;

function preload()
{
  //load images here
  dogImg = loadImage("../images/dogImg.png");
  dogHappy = loadImage("../images/dogImg1.png");
  brImg = loadImage("../images/BedRoom.png");
  gdImg = loadImage("../images/Garden.png");
  wrImg = loadImage("../images/WashRoom.png");
  lrImg = loadImage("../images/LivingRoom.png");
  sadDog = loadImage("../images/SadDog.png");
  deadDog = loadImage("../images/deadDog.png");
}

function setup() {
  createCanvas(displayWidth - 800, displayHeight - 50);
  

  database = firebase.database();

  

  dog = createSprite(590, 130, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.16;

  foodObj = new Food();

  
}


function draw() {  
  background(46, 139, 87);
  
  
  fedTime = database.ref('feedTime');
  fedTime.on("value",(data)=>{
    lastfed = data.val();
  });

  feedDog = createButton("Feed The Dog");
  feedDog.position(450, 95);
  feedDog.mousePressed(FeedDog);

  addFood = createButton("Add Milk");
  addFood.position(550, 95);
  addFood.mousePressed(addFoods);

  foodObj.display();

  
  //console.log(currentTime);

  drawSprites();
  //add styles here

  fill(255, 255, 254)
  textSize(12.5);
  
  lastfed = hour();

  if(lastfed >= 12){
    text("Last Feed : " + lastfed%12 + " PM", 100, 30)
  } else if(lastfed == 0 ){
    text("Last Feed : 12 AM", 100, 30)
  } else {
    text("Last Feed : " + lastfed + "AM",100, 30)
  }
  
  currentTime = hour();
  if(currentTime == (lastfed + 1)){
    update("Playing");
    foodObj.garden();
  } else if(currentTime == (lastfed + 2)){
    update("Sleeping");
    foodObj.bedRoom();
  } else if(currentTime > (lastfed +2)&& currentTime < (lastfed + 4)){
    update("Bathing");
    foodObj.washRoom();
  } else if (currentTime > (lastfed + 4)&& currentTime < (lastfed + 20)){
    update("Hungry");
    //foodObj.sad();
    dog.addImage(sadDog)
  } else if(currentTime > (lastfed + 10)){
    update("Dead")
    //foodObj.dead();
    dog.addImage(deadDog)
    textSize(10)
    text("Oh No! Your dog starved because you didn't take proper care of him and didn't feed him. Next time try to take well care of him", 25, 100)
  }
  
  var gameState = database.ref('gameState');
        gameState.on("value",(data)=>{
            State = data.val();
        }) 

  if(gameState === "Hungry"){
    feedDog.hide();
    addFood.hide();
    dog.remove();
  } else {
    feedDog.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  if(gameState === "JustFed"){
    feedDog.hide();
    addFood.hide();
    dog.remove();
  } else {
    feedDog.show();
    addFood.show();
    dog.addImage(dogImg);
  }
  


}


function FeedDog(){
  dog.addImage(dogHappy)

  update("JustFed")

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
      foodStock:foodObj.getFoodStock()
  })
}



function addFoods(){
  foodC + 1;
  
  database.ref('/').update({
    foodCount: foodC
  })
  
}
