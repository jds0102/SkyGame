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
var playerCoins = 0;
var playerLives = 3;

var screenWidth = 1024, screenHeight = 768;
document.body.style.overflow = "hidden";

var context;

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
    if (currentlyChatting) return;
    player.update();
    updateWorld();
    enemy.update();
    updateBullets();
    updateForCollisions();
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
    }
}




//Usage
//The table contains a table for each levels intro chat
//Each levels chat has a table for each time someone should talk
//The first string is the text, the second is the image to display with the text
var chats = [ [['Click to hear what I have to say.', 'witch.png'], ['I am going to help you escape from the evil witch.', 'witch.png'], ['3', 'witch.png'], ['4', 'witch.png']] //Level 1 intro chat
            ,[['1', 'witch.png'], ['2', 'witch.png'], ['3', 'witch.png'], ['4', 'witch.png']] ]; //Level 2 intro chat