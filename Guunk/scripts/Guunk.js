function Guunk() {


    let postShiftAmt = 7;
    const leftRightCamSpeed = 5;
    const shiftAccel = .8;


    this.xOffset = 0;
    this.yOffset = 0;


    var timerDate = new Date().getTime();

    this.timer = setInterval(function(){
        var now = new Date().getTime();

        var distance = now - timerDate;

        var minutes = Math.floor((distance/(1000*60)));

        var seconds = Math.floor((distance % (1000*60))/1000);


        //ms is actually tenths of a second just so the time doesn't look silly.
        var ms = Math.floor((distance % (1000)) / 100);


        if(seconds < 10){
            document.getElementById("time").textContent = "" + minutes + ":" + "0" + seconds + "." + ms;
        }else {
            document.getElementById("time").textContent = "" + minutes + ":" + seconds + "." + ms;
        }
    },100);


    //so for the left/right shifting the way it will work is we will have a threshold that once we pass, we will shift everything until we are centered as much as we want.
    //0 means we are not shifting, 1 means we are shifting to the right, and -1 means we are shifting to the left.
    //1920 wide  if we get <384 or > 1536, then we will shift until we're at 576 and 1344 respectively


    var self=this;
    screen_w = screen.width;
    screen_h = screen.height;
    this.keys = {
        left:false,
        right:false,
        leftheld:false,
        rightheld:false,
        up:false,
        space:false,
        shift:false
    };
    //the leftheld and rightheld are only to be used to remember that a key is being held while we are halting movement because another key was just pressed.
    this.options={
        width: screen_w,
        height: screen_h,
        gravity: 1,
    }
    this.player = new Player();
    const action = {
        LEFT: 65,
        RIGHT: 68,
        UP: 87,
        SPACE: 32,
        SHIFT: 16
    };

    this.initialize=function(){
        requestAnimationFrame(mainLoop);
    };

    this.unshiftEverything = function(){

        var allObjectsToShit = $('.object');


        console.log(this["xOffset"]);
        console.log(this["yOffset"]);

        for(let i = 0; i < allObjectsToShit.length;i++){
            var offsets = allObjectsToShit[i].getBoundingClientRect();
            console.log("old style left", allObjectsToShit[i].style.left);
            allObjectsToShit[i].style.top = offsets.top+this.yOffset + "px";

            allObjectsToShit[i].style.left = offsets.left+this.xOffset + "px";
            console.log("new style left", allObjectsToShit[i].style.left);
        }
        this.yOffset=0;
        this.xOffset=0;
    };


    this.screenShiftUpDown = function(){


        //the player is above a certain point on the screen, so we must shift everything down some amount.
        //for now we are going with 20% of the screen (1080*.2 = 216)


        //screen height * 25%
        if(gg.player.locY < window.innerHeight*1.0/4){
            postShiftAmt=7;
            var allObjectsToShift = $('.object');

            gg.player.locY += postShiftAmt;
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                allObjectsToShift[i].style.top = offsets.top + postShiftAmt + "px";
            }
            this.yOffset-=postShiftAmt;

        //screen height - (screen height * 25%)
        }else if(gg.player.locY > window.innerHeight - (window.innerHeight*1.0/2.5)){
            postShiftAmt = gg.player.velocY;
            postShiftAmt += shiftAccel;
            var allObjectsToShift = $('.object');
            gg.player.locY -= postShiftAmt;
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                if(gg.player.velocY > 0){
                    allObjectsToShift[i].style.top = offsets.top - postShiftAmt + "px";
                }else{
                    allObjectsToShift[i].style.top = offsets.top - postShiftAmt + "px";
                }
            }
            this.yOffset+=postShiftAmt;
        }else{
            postShiftAmt=7;
        }

    };

    //we will
    this.screenShiftLeftRight = function(){

        //screen width * 33%
        if(gg.player.locX < window.innerWidth*1.0/3){
            var allObjectsToShift = $('.object');

            gg.player.locX += leftRightCamSpeed;
            // console.log("SIZE OF ARRAY: ", allObjectsToShift.length)
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                if(gg.player.velocX < 0){
                    allObjectsToShift[i].style.left = offsets.left + leftRightCamSpeed + "px";
                }else {
                    allObjectsToShift[i].style.left = offsets.left + leftRightCamSpeed + "px";
                }
            }
            this["xOffset"] -= leftRightCamSpeed;


            //screen width - screen width * 33%
        }else if(gg.player.locX > (window.innerWidth - (window.innerWidth*1.0/3))){


            var allObjectsToShift = $('.object');

            //the player needs to be moved the camspeed, because he doesn't move that.
            gg.player.locX -= leftRightCamSpeed;
            for(let i = 0; i < allObjectsToShift.length;i++){
                var offsets = allObjectsToShift[i].getBoundingClientRect();
                //const yposn = offsets.top;
                if(gg.player.velocX > 0){
                    allObjectsToShift[i].style.left = offsets.left - leftRightCamSpeed + "px";
                }else{
                    allObjectsToShift[i].style.left = offsets.left - leftRightCamSpeed + "px";
                }
            }
            this.xOffset+=leftRightCamSpeed;

        }


    };


    window.addEventListener("keydown", function(e) {
        // space, page up, page down and arrow keys:
        if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    document.addEventListener("keydown", function (event) {
        if (event.keyCode == action.RIGHT || event.keyCode == 68) {
            gg.keys.right = true;
            $('#d-key').css("background-image", "url('images/keys/key_d_on.png')")
            if(gg.keys.left) {
                // console.log("we are holding left, and we just pressed right, so we will hold left");
                gg.keys.leftheld = true;
                gg.keys.left = false;
            }

        }
        if(event.keyCode == action.LEFT|| event.keyCode == 65){
            $('#a-key').css("background-image", "url('images/keys/key_a_on.png')")
            gg.keys.left = true;
            if(gg.keys.right) {
                gg.keys.rightheld = true;
                gg.keys.right = false;
            }
        }
        if(event.keyCode == action.SPACE){
            /*var offsets = allObjectsToShift[i].getBoundingClientRect();
            //const yposn = offsets.top;
            allObjectsToShift[i].style.top = offsets.top + shiftAmt + "px";
            document.getElementById("background-jank")
            gg.keys.space = true;*/
        }
        if(event.keyCode == action.UP|| event.keyCode == 87){
            gg.keys.up = true;
            $('#w-key').css("background-image", "url('images/keys/key_w_on.png')")
        }
        if(event.keyCode == action.SHIFT){
            gg.keys.shift = true;
            $('#shift-key').css("background-image", "url('images/keys/key_shift_on.png')")
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.keyCode == action.RIGHT || event.keyCode == 68) {
            $('#d-key').css("background-image", "url('images/keys/key_d_off.png')")
            gg.keys.right = false;
            gg.keys.rightheld = false;
            if(gg.keys.leftheld)
                gg.keys.left=true;
        }
        if(event.keyCode == action.LEFT || event.keyCode == 65){
            $('#a-key').css("background-image", "url('images/keys/key_a_off.png')")
            gg.keys.left = false;
            if(gg.keys.rightheld) {
                gg.keys.right = true;
            }
            gg.keys.leftheld=false;
        }
        if(event.keyCode == action.SPACE){
            gg.keys.space = false;
        }
        if(event.keyCode == action.UP  || event.keyCode == 87){
            gg.keys.up = false;
            $('#w-key').css("background-image", "url('images/keys/key_w_off.png')")
        }
        if(event.keyCode == action.SHIFT){
            gg.keys.shift = false;
            $('#shift-key').css("background-image", "url('images/keys/key_shift_off.png')")
            document.getElementById("glider-equip").style.visibility = "hidden";
        }
    });


    this.initialize();
    console.log("initialized properly");
}

function mainLoop(){
    document.getElementById("titleScreen").style.height = window.innerHeight + "px";
    document.getElementById("titleScreen").style.width = window.innerWidth + "px";
    document.getElementById("gameOverScreen").style.height = window.innerHeight + "px";
    document.getElementById("gameOverScreen").style.width = window.innerWidth + "px";
    document.getElementById("StartBtn").style.marginTop = (window.innerHeight*1.0/2.5) + "px"

    /*
    <div style="height:60px;width:60px;top:1900px;left:150px"id = "w-key"></div>
    <div style="height:60px;width:60px;top:1965px;left:120px"id = "a-key"></div>
    <div style="height:60px;width:60px;top:1965px;left:185px"id = "d-key"></div>
    <div style="height:80px;width:100px;top:1955px;left:15px"id = "shift-key"></div>
     */
    let wtop = (1700*1.0/2160) * window.innerHeight;
    document.getElementById("w-key").style.top = wtop + "px";
    document.getElementById("a-key").style.top = wtop + 65 + "px";
    document.getElementById("d-key").style.top = wtop + 65 + "px";
    document.getElementById("shift-key").style.top = wtop + 55 + "px";


    $('#StartBtn').on('click',function(){
        if($('#hardCheck').prop('checked')) {
            gg.player.hardMode = true;
        }else{
            gg.player.hardMode = false;
        }
        $('#titleScreen').css('visibility', 'hidden');
    });





    if(!gg.player.isAlive){
        gg.unshiftEverything();
        gg.player.isAlive = true;
    }

    if(gg.player.splat){
        gg.unshiftEverything();
        gg.player.splat = false;
    }

    if(gg.player.hasWonGame){
        clearInterval(gg.timer);
        document.getElementById("time").style.backgroundColor = "white";
        document.getElementById("gameOverScreen").style.visibility = "visible";
        var fortniteArray = $('.fortnite');
        for(let i = 0; i <fortniteArray.length;i++){
            fortniteArray[i].style.visibility="visible";
        }
    }
    // console.log("This is the screen width", screen_w);
    $('#slime').css('left', gg.player.locX);
    $('#slime').css('top', gg.player.locY);
    //console.log(1);
    gg.player.update(gg.keys,gg.xOffset,gg.yOffset);
    // console.log("This is the players location: ", gg.player.locX, "::: Velocity: ", gg.player.velocX);

    //in this function/method we check if the blob is
    gg.screenShiftUpDown();
    gg.screenShiftLeftRight();
    //  console.log("tick");
    //$('#slime').css('left', player.locX);
    requestAnimationFrame(mainLoop);
}
