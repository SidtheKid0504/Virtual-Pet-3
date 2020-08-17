class Food{
    constructor(){
        this.foodStock = 20;
        this.lastFed = null;
        this.image = loadImage("../images/Milk.png");
        this.fsimage = loadImage("../images/Food Stock.png");
        /*function preload(){
        }*/
    }
    getFoodStock(){
        var foodCountRef = database.ref('foodCount');
        foodCountRef.on("value",(data)=>{
          //foodC = data.val();
          foodC = data.val();
          console.log
        });
    }

    updateFoodStock(count){
        database.ref('/').update({
            foodCount: count
        });
    }

    updateFeedTime(time){
        database.ref('/').update({
            feedTime: time
        })
    }

    getGameState(){
           
    }

   

    bedRoom(){
        background(brImg,displayWidth - 900,displayHeight - 50)
    }
    garden(){
        background(gdImg,displayWidth - 900,displayHeight - 50)
    }
    livingRoom(){
        background(lrImg,displayWidth - 900,displayHeight - 50)
    }
    washRoom(){
        background(wrImg,displayWidth - 900,displayHeight - 50)
    }
    /*sad(){
        
    }
    dead(){
        
    }*/

    display(){
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.fsimage, 500, 160, 70, 70);
        
         if(this.foodStock != 0){
            for(var i = 0;i<this.foodStock;i++){
              if(i%10 == 0){
                x = 80;
                y = y + 50
                }
            image(this.image, x, y, 50, 50);
            x = x + 30;
            }
        }
        
    }

    
    
    
}
function update(state){
    database.ref('/').update({
        gameState: state
    })
}
