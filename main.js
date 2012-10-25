//var engine = startCopperLichtFromFile('3darea', 'copperlichtdata/game_scene.ccbjs');
var levels = ['level0.ccbjs' , 'level1.ccbjs'];
var curLevel = 0;
var engine = new CL3D.CopperLicht('3darea', false, 60,false); 
	engine.load('copperlichtdata/'+levels[0]);
var camera, camAnimator, light;
var scene;
var paused = false;
var newMaterialType;

var context2d;
var loading = true;
var currentlyChatting = false;
var currentChatPos = 0;
var chatUpdated = true;
var win = false;
var playerCoins = 0;
var playerLives = 3;

var screenWidth = 1024, screenHeight = 768;
document.body.style.overflow = "hidden";

var context;

var isSlowTime = false;
var frame = 0;
var slowRatio = 3;

function update() {
    if (loading) return;
    if (currentlyChatting && chatUpdated) {
        if (currentChatPos < chats[curLevel].length) {
            hud.chatting(chats[curLevel][currentChatPos][0], chats[curLevel][currentChatPos][1]);
        } else {
            //Set level specific things here
            currentlyChatting = false;
            levelStartTime = new Date().getTime();
            currentChatPos = 0;
        }
        chatUpdated = false;
    }
    if (win && chatUpdated) {
        if (currentChatPos < chats[curLevel].length) {
            hud.chatting(chats[curLevel][currentChatPos][0], chats[curLevel][currentChatPos][1]);
        }
    }
    if (currentlyChatting || win) return;
    frame = (frame + 1) % 60;
    //if (isSlowTime) alert("");
    if (!isSlowTime || frame % slowRatio == 0) {
        for (var i = 0; i < asteroids.length; i++) {
            asteroids[i].update();
        }
        player.update();
        updateWorld();
        //enemy.update();
        updateBullets();
        updateForCollisions();
    }
	var camPos = player.node.Pos.clone();
	shipLookAt = player.direction.clone();
	shipLookAt.normalize();
	shipLookAt.multiplyThisWithScal(15);
	camPos.substractFromThis(shipLookAt);
	camPos.Y += 21;
	scene.getActiveCamera().Pos = camPos;
	//light.Pos = scene.getActiveCamera().Pos;
    //camAnimator.lookAt(player.node.Pos);
	camAnimator.lookAt(player.node.Pos.add(new CL3D.Vect3d(0, 15, 0)));
	playerCoins = player.coins;
	
}

// this is called when loading the 3d scene has finished
engine.OnLoadingComplete = function () {
    //context2d = document.getElementById('2dcanvas').getContext('2d');
    //chat("witch", "some text");
    scene = engine.getScene();
    if (scene) {
        hideSceneObjects();
        initWorld();


        // also, force the 3d engine to update the scene every frame
        scene.setRedrawMode(CL3D.Scene.REDRAW_EVERY_FRAME);

        camPos = player.node.Pos.clone();
        camPos.X += 21;
        camPos.Y += 20;
        scene.getActiveCamera().Pos = camPos;

        camAnimator = new CL3D.AnimatorCameraFPS(scene.getActiveCamera(), engine);
        camAnimator.onKeyUp = camAnimator.onKeyDown = function (event) { };
        camAnimator.MayMove = false;
        scene.getActiveCamera().addAnimator(camAnimator);
        //camAnimator.setMayMove(false);
        camAnimator.lookAt(player.node.Pos);


        light1 = new CL3D.LightSceneNode();
        light2 = new CL3D.LightSceneNode();
        scene.getActiveCamera().addChild(light1);
        scene.getActiveCamera().addChild(light2);
        //scene.getRootSceneNode().addChild(light);
        light1.Pos = scene.getActiveCamera().Pos.add(new CL3D.Vect3d(0, -100, 0));
        light2.Pos = scene.getActiveCamera().Pos.add(new CL3D.Vect3d(0, 150, 0));
        light1.Attenuation = Infinity; // = light2.Attenuation = Infinity;

        scene.AmbientLight.R = scene.AmbientLight.G = scene.AmbientLight.B = 0.5;

        engine.OnAnimate = update;
        loading = false;
        currentlyChatting = true;

    }
}

function restartLevel() {
    loading = true;
    chatUpdated = true;
    resetKeyboard();
    engine.load('copperlichtdata/' + levels[curLevel]);
}

function nextLevel() {
    if (curLevel + 1 < levels.length) {

        curLevel++;
        chatUpdated = true;
        resetKeyboard();
        loading = true;
        engine.load('copperlichtdata/' + levels[curLevel]);
    } else {
        winGame();
    }
}

function restartGame() {
    playerLives = 3;
    playerCoins = 0;
    curLevel = 0;
    chatUpdated = true;
    resetKeyboard();
    loading = true;
    engine.load('copperlichtdata/' + levels[curLevel]);
}

function winGame() {
    curLevel++;
    win = true;
    chatUpdated = true;
}


function unCastEvilSpell() {
    for (var i = airstreams.length - 1; i >= 0; i--) {
        airstreams[i].node.Visible = true;
    }
}

function castEvilSpell() {
    hud.chatting("Avoiiding alll myy traapss I seeee... ", "witch.png");
    setTimeout(hud.chatting, 1700, "HOW DO YOU LIKE THIS?", "witch.png");
    setTimeout(hud.resetChat, 3000);
    setTimeout(actuallyCastIt, 2000);
}
function actuallyCastIt() {
    for (var i = airstreams.length - 1; i >= 0; i--) {
        airstreams[i].node.Visible = false;
    }
    setTimeout(unCastEvilSpell, 5000);
}


//Usage
//The table contains a table for each levels intro chat
//Each levels chat has a table for each time someone should talk
//The first string is the text, the second is the image to display with the text
var chats = [[['Click to hear what I have to say.', 'wizard.png'], ['We must outrun the evil witch!', 'wizard.png'], ['We have stolen her Crystal Ball and she is after us.', 'wizard.png'], ['I will get you!', 'witch.png'], ['I have created airstreams in the sky,', 'wizard.png'], ['which will carry our balloon home.', 'wizard.png'], ['She has disabled our propeller,', 'wizard.png'], ['so we will have to rely on the airstreams for thrust.', 'wizard.png'], ['Also, outside of the airstream she can attack our balloon.', 'wizard.png'], ['HA HA HA HA', 'witch.png'], ['Use the arrow keys to shift left and right,', 'wizard.png'], ['and use \'Q\' and \'E\' to rotate the balloon.', 'wizard.png'], ['Spacebar will fire our guns to destoy asteroids in the way.', 'wizard.png'], ['I have created a portal up ahead,', 'wizard.png'], ['get us there befor time runs out!', 'wizard.png'], ['Click to get started.', 'wizard.png']] //Level 1 intro chat
            , [['Whew, we made it!', 'wizard.png'], ['Not so fast!', 'witch.png'], ['I am more powerful than you think', 'witch.png'], ['This may be a little harder than I anticipated.', 'wizard.png'], ['I am activating some of the balloons powers.', 'wizard.png'], ['Each time you use a power it will cost us some coins.', 'wizard.png'], ['Pressing \'1\' will provide us with a temporary shield', 'wizard.png'], ['and pressing \'2\' will slow down the objects around us.', 'wizard.png'], ['Use these powers wisely!', 'wizard.png'], ['Here we go!', 'wizard.png']] //Level 2 intro chat
            , [['We have outsmarted the witch', 'wizard.png'], ['Rats!', 'witch.png'], ['Thank you for your noble efforts!', 'wizard.png'], ['You WIN!', 'wizard.png']]]; //win state chat
