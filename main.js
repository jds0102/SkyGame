//var engine = startCopperLichtFromFile('3darea', 'copperlichtdata/game_scene.ccbjs');
var engine = new CL3D.CopperLicht('3darea', true, 60,true); 
	engine.load('copperlichtdata/level0.ccbjs');
var camera, camAnimator;
var scene;

var screenWidth = 1024, screenHeight = 768;


function update() {
    player.update();
    updateWorld();
	var camPos = player.node.Pos.clone();
	shipLookAt = player.direction.clone();
	shipLookAt.normalize();
	shipLookAt.multiplyThisWithScal(18);
	camPos.substractFromThis(shipLookAt);
	camPos.Y += 21;
    scene.getActiveCamera().Pos = camPos;
    camAnimator.lookAt(player.node.Pos);
}

// this is called when loading the 3d scene has finished
engine.OnLoadingComplete = function () {
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

        engine.OnAnimate = update;
    }
}
