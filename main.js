//var engine = startCopperLichtFromFile('3darea', 'copperlichtdata/game_scene.ccbjs');
var engine = new CL3D.CopperLicht('3darea', true, 60,true); 
	engine.load('copperlichtdata/game_scene.ccbjs');
var camera, camAnimator;
var scene;
var theta = 0;


function update() {
	//theta+=0.05;
	//player.node.Pos.X += 0.5 * Math.sin(theta);
	//camPos = player.node.Pos.clone();
    //camPos.X = 21;
    //camPos.Y = 30;
    //scene.getActiveCamera().Pos = camPos;
    //camAnimator.lookAt(player.node.Pos);
	player.update();
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
		//scene.getActiveCamera().setOrthogonal(true);
        scene.getActiveCamera().addAnimator(camAnimator);
        camAnimator.lookAt(player.node.Pos);
		
		//once all the loading is done : calls update every 60 ms
		//setInterval(update, 60);
		engine.OnAnimate = update;
    }
}


document.onkeydown = function (event) {
    var key = String.fromCharCode(event.keyCode);

    // when pressed 'L', move the cube scene node a bit up
    if (key == 'W' && player.node)
        player.node.Pos.X -= 2;

    if (key == 'A' && player.node)
        player.node.Pos.Z -= 2;

    if (key == 'S' && player.node)
        player.node.Pos.X += 2;

    if (key == 'D' && player.node)
        player.node.Pos.Z += 2;

    // we need to call the key handler of the 3d engine as well, so that the user is
    // able to move the camera using the keys

    //engine.handleKeyDown(event);
};
