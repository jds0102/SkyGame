//var engine = startCopperLichtFromFile('3darea', 'copperlichtdata/game_scene.ccbjs');
var engine = new CL3D.CopperLicht('3darea', false, 60,false); 
	engine.load('copperlichtdata/level0.ccbjs');
var camera, camAnimator, light;
var scene;
var paused = false;
var newMaterialType;

var context2d;

var screenWidth = 1024, screenHeight = 768;

document.body.style.overflow = "hidden";

var context;

function update() {
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
	
}

// this is called when loading the 3d scene has finished
engine.OnLoadingComplete = function () {
    //context2d = document.getElementById('2dcanvas').getContext('2d');

    //chat("witch","some text");

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


    }
}
