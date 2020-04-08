/*
    Here is my thesis on how we are going to move upwards.
    Anytime you the character have a y position < 200, we need will increase both your position, and everything in the games position by some amount, 5
    each gametick, until our y position is back to normal. We will also store the sum of this shift somewhere, and unshift everything(including yourself) when youn fall.

    If I do this right, it should look exactly like a camera is following our character up.

    We can use the same principle for left and right.

 */

var Player = function(){
    var self = this;
    this.isAlive = true;
    this.paddingLeftRight = 10;
    this.acidPaddingLeftRight = 8;
    this.locX = 800;
    this.locY = 525;
    this.velocX = 0;
    this.velocY = 0;
    this.jumpCnt = 0;
    this.canJump = true;
    this.width = 50;
    this.height = 50;
    this.hoverCounter = 0;
    this.hardMode = false;



    //these are the permissions you have to unlock
    this.leftAllow = true;
    this.rightAllow = true;
    this.jumpAllow = true;
    this.doubleJumpAllow = false;
    this.spitAllow = true;
    this.hoverAllow = false;
    this.bootMan = false;
    this.hasWonGame = false;
    this.initialize = function(){

    };

    this.resetPermissions = function(){
        /*
            document.getElementById("slime").src = "images/playerdoublejumpboot.agif";
        document.getElementById("boot").hidden = true;
        document.getElementById("slime").style.width = "75px";
        document.getElementById("slime").style.height = "75px";
        this.width = 75;
        this.height = 75;
        this.bootMan=true;
         */
        location.reload(true);
        document.getElementById("slime").style.width = "50px";
        document.getElementById("slime").style.height = "50px";
        document.getElementById("slime").src = "images/player.agif";

        var allPowerups = $('.powerup');
        for(let i = 0; i < allPowerups.length; i++){
            allPowerups[i].style.visibility = "visible";
        }

        this.leftAllow = true;
        this.rightAllow = true;
        this.jumpAllow = true;
        this.doubleJumpAllow = false;
        this.spitAllow = true;
        this.hoverAllow = false;
        this.bootMan = false;
        this.hasWonGame = false;
        this.hardMode = false;
    };
    this.collectGlider = function(){
        this.hoverAllow=true;
        document.getElementById("shift-key").style.visibility = "visible";
        document.getElementById("glider-ground").style.visibility = "hidden";
    };
    this.collectWinStar = function(){
        this.hasWonGame = true;
        //maybe disable movement?
        document.getElementById("win-game-star").style.visibility = "hidden";
        $('.fortnite').css('display','block');
    };
    this.updateGlider = function(){
        document.getElementById("glider-equip").style.left = this.locX - 30+ "px";
        document.getElementById("glider-equip").style.top = this.locY-(this.height) + "px";
    };
    this.collidingFromSide = function(){
        var bricksArray = $('.brick');



        var acidPitArray = $('.acidpit');

        for(let i = 0; i < acidPitArray.length; i++){
            // console.log(i);
            var offsets = acidPitArray[i].getBoundingClientRect();
            const blockX = offsets.left;
            const blockY = offsets.top;
            const blockWidth = acidPitArray[i].offsetWidth;
            const blockHeight = acidPitArray[i].offsetHeight;


            // console.log("dis block");
            // console.log(blockWidth);
            // console.log(blockHeight);



            let keepGoing = -1;
            //we are on the right side of the block
            if((blockX + (blockWidth/2)) < this.locX){
                if(this.velocX < 0){
                    keepGoing = 1;
                }

            }else{
                if(this.velocX > 0){
                    keepGoing = 1;
                }
                //we are on the left side of the block

            }

            if(keepGoing !== -1) {
                if ((this.locY + this.height > blockY + 1) //bottom of player is below top of block
                    && (this.locY < blockY + blockHeight)) { //top of player is above bottom of block
                    if ((this.locX + this.width) > (blockX) && (this.locX) < (blockX + blockWidth)) {
                        console.log("why tho?");
                        return (10);
                    }
                }
            }

        }


        for(let i = 0; i < bricksArray.length; i++) {
            //when colliding with something left/right we first check if the players position is > or < the blocks position

            var offsets = bricksArray[i].getBoundingClientRect();
            const blockX = offsets.left;
            const blockY = offsets.top;
            const blockWidth = bricksArray[i].offsetWidth;
            const blockHeight = bricksArray[i].offsetHeight;

            // console.log(blockX);
            // console.log(blockWidth);

            // console.log(this.locX);
            // console.log(this.velocX);

            let keepGoing = -1;
            //we are on the right side of the block
            if((blockX + (blockWidth/2)) < this.locX){
                if(this.velocX < 0){
                    keepGoing = 1;
                }

            }else{
                if(this.velocX > 0){
                    keepGoing = 1;
                }
                //we are on the left side of the block

            }

            if(keepGoing !== -1) {
                //we first check if the bottom of the player is below the top of the block, and above the bottom of block
                //and then we check if the top of the player is above the bottom of the block, and below the top of the block
                if ((this.locY + this.height > blockY + 3) //bottom of player is below top of block
                    && (this.locY < blockY + blockHeight)) { //top of player is above bottom of block
                    if ((this.locX + this.width) > blockX && (this.locX) < (blockX + blockWidth)) {
                        console.log("side");
                        return (10);
                    }
                }
            }
        }


        return(-1);
    };

    //this function will check for collision with a powerup by looping through the class of powerups and checks to see if you have gained any powerups, and if so, gives you them.

    this.givePlayerBoot = function(){
        document.getElementById("slime").src = "images/playerdoublejumpboot.agif";
        document.getElementById("boot").hidden = true;
        document.getElementById("slime").style.width = "75px";
        document.getElementById("slime").style.height = "75px";
        this.width = 75;
        this.height = 75;
        this.bootMan=true;
    }
    this.powerUpCollision = function(){
        var powerUpArray = $('.powerup');

        for(let i = 0; i < powerUpArray.length;i++){
            var offsets = powerUpArray[i].getBoundingClientRect();
            const blockX = offsets.left;
            const blockY = offsets.top;
            const blockWidth = powerUpArray[i].offsetWidth;
            const blockHeight = powerUpArray[i].offsetHeight;

            if ((this.locY + this.height > blockY + 1) //bottom of player is below top of block
                && (this.locY < blockY + blockHeight)) { //top of player is above bottom of block
                if ((this.locX + this.width) > (blockX) && (this.locX) < (blockX + blockWidth)) {
                    console.log("almost gotcha?");
                    console.log(powerUpArray[i].id);
                    if(powerUpArray[i].id === "boot" && !this.bootMan){
                        this.givePlayerBoot();
                    }
                    if(powerUpArray[i].id === "jump" && !this.doubleJumpAllow){
                        this.collectDoubleJump();
                    }
                    if(powerUpArray[i].id === "glider-ground" && !this.hoverAllow){
                        this.collectGlider();
                    }
                    if(powerUpArray[i].id === "win-game-star"){
                        this.collectWinStar();
                    }

                }
            }



        }



    }


    this.die = function(){
        if(this.hardMode){
            this.resetPermissions();
        }
        this.isAlive =false;
        this.locX = 800;
        this.locY = 525;
        this.velocX = 0;
        this.velocY = 0;
        this.jumpCnt = 0;
        this.canJump = true;
        this.hoverCounter = 0;
    };

    this.collidingWithBlockFromTop = function(){
        // console.log("colliding with block from top is called");
        //we are colliding from the top if our halfway point is inside the bounds of x and x+ width, and our locY + our VelY + our height > block Y
        var bricksArray = $('.brick');
        for(let i = 0; i < bricksArray.length; i++){
            //if we are currently on the way up, keep going.

            var offsets = bricksArray[i].getBoundingClientRect();
            const blockX = offsets.left;
            const blockY = offsets.top;
            const blockWidth = bricksArray[i].offsetWidth;
            const blockHeight = bricksArray[i].offsetHeight;

            if(this.velocY < 0){
                //this if says we are in the left/right of the block so we can BONK
                if( (this.locX + this.width - this.paddingLeftRight) > blockX  &&  (this.locX+this.paddingLeftRight) < (blockX + blockWidth)){
                    //to know if we are going to bonk with a block we need to check if the top of our character is above the bottom of the block,and the bottom is below the top of the block,
                    if((this.locY + this.velocY) < (blockY+blockHeight) && (this.locY + this.height) > blockY){
                        this.velocY = 1.5;
                        this.locY = blockHeight + blockY;
                    }
                }

                // HAHAHAHAH WE'RE USING CONTINUE
                continue;
            }
            // console.log("for loop iteration")

            // const halfway = this.locX + this.width/2;
            //checking if our halfway point is inside the bounds of x and x+width

            //we will check if our right is to the right of the left part of the block, and if our left is to the left of the right part of the block
            if((this.locX + this.width - this.paddingLeftRight) > blockX  &&  (this.locX+this.paddingLeftRight) < (blockX + blockWidth)){
                //checking if our Y posn + our Y vel + our height is > blockY
                //console.log("inside left and right");
                if((this.locY+this.velocY + this.height) >= blockY && (this.locY) < blockY){
                    return(blockY);
                }
            }

        }
        return(-1);
    };

    this.acidPitCollisions = function(){
        var acidArray = $('.acidpit');



        for(let i = 0; i < acidArray.length;i++){

            var offsets = acidArray[i].getBoundingClientRect();
            const blockX = offsets.left;
            const blockY = offsets.top;
            const blockWidth = acidArray[i].offsetWidth;
            const blockHeight = acidArray[i].offsetHeight;

            if(this.velocY > 0){
                if( (this.locX + this.width - this.acidPaddingLeftRight) > blockX  &&  (this.locX+this.acidPaddingLeftRight) < (blockX + blockWidth)){
                    if((this.locY + this.velocY) < (blockY+blockHeight) && (this.locY + this.height) > blockY){
                        if(this.bootMan){
                            this.velocY = 0;
                            this.locY = blockY - this.height;
                            this.jumpCnt = 0;
                            this.hoverCounter = 0;
                        }else{
                            this.die();
                        }
                    }
                }
            }
        }
    };

    this.collectJump = function(){
        this.jumpAllow = true;
    };

    this.collectDoubleJump = function(){
        this.doubleJumpAllow = true;
        document.getElementById("jump").style.visibility= "hidden";
        document.getElementById("slime").src = "images/playerafterdoublejump.gif"
    };

    this.collectLeft = function(){
        this.leftAllow = true;
    };

    this.collectRight = function(){
        this.rightAllow = true;
    };

    this.collectHover = function(){
        this.hoverAllow = true;
    };

    this.update = function(keys){
        console.log(this.hardMode);
        if(this.velocY > 100){
            this.die();
        }
        if (keys.left && this.leftAllow){
            $('#slime').css('-transform', 'scaleX(1)');
            if(this.velocX > -6){
                this.velocX -= .5;
            }
            
        }
         if (keys.right && this.rightAllow){
            $('#slime').css('-transform', 'scaleX(-1)');
            if(this.velocX < 6){
                this.velocX += .5;
            }
            
        }

         this.acidPitCollisions();

         this.powerUpCollision();



        const XCoordOfBlockThatWeAreCollidingWith = this.collidingFromSide();
         if(XCoordOfBlockThatWeAreCollidingWith !== -1){
             this.velocX=0;
         }else {
             this.locX += this.velocX;
         }
        if(this.velocX > 0){
            if(this.velocX - .2 < 0){
                this.velocX = 0;
            }
            else{
            this.velocX -=.2;
            }
        }
        if(this.velocX < 0){
            if(this.velocX + .2 > 0){
                this.velocX = 0;
            }
            else{
            this.velocX +=.2;
            }
        }
        
        if((keys.up || keys.space) && this.jumpAllow){
            if(this.canJump == true && this.jumpCnt < 2){
                if(this.jumpCnt == 1 && !this.doubleJumpAllow){}
                else{
                    this.velocY = -17;
                    this.jumpCnt += 1;
                    this.canJump = false;
                    this.locY += this.velocY;
                }
            }
        }
        if((keys.up || keys.space) == false){
            this.canJump = true;
        }

        //here is where we check for collision with blocks that we can land on.
        const x = this.collidingWithBlockFromTop();
        //we are not colliding with a block we can stand on, so we now move on to ground and gravity checking.
        //if the character moves past the halfway point of the screen, the screen
        if(x === -1){
            this.locY += this.velocY;

            if(this.velocY == 0){
                this.hoverCounter = 0;
            }

            if(this.locY >= 525 && false){
                this.locY = 525;
                this.velocY = 0;
                this.jumpCnt = 0;
            } else{
                if(keys.shift && this.hoverAllow && this.velocY > 0 && this.hoverCounter < 65){
                    document.getElementById("glider-equip").style.visibility = "visible";
                    this.velocY = 1;
                    this.hoverCounter += 1;
                }
                else{
                    document.getElementById("glider-equip").style.visibility = "hidden";
                    this.velocY = this.velocY + .8;
                }
            }

        }else{
            //otherwise, our next position is going to collide ppwith the block, so place ourselves ontop of it.
            this.velocY = 0;
            this.locY = x - this.height; //to be fucking honest I'm clearly not paying enough attention because I have no fucking idea why 72 is the magic number.. it should be 50..?? or 100? the height? or the height/2?
            this.jumpCnt = 0;
            this.hoverCounter = 0;
        }

        if(this.hoverAllow){
            this.updateGlider();
        }

        //console.log(this.canJump);
    }; //end update
    
    // console.log("proper player");
this.initialize();
};
