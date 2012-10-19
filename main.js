var engine = startCopperLichtFromFile('3darea', 'copperlichtdata/index.ccbjs');
var player = null;
var camera, camAnimator;
var scene;

// this is called when loading the 3d scene has finished
engine.OnLoadingComplete = function () {
    scene = engine.getScene();
    if (scene) {
        
        player = new Airship('cubeMesh1', scene);
        player.node.Pos = new CL3D.Vect3d(0, 5, 25);

        // also, force the 3d engine to update the scene every frame
        scene.setRedrawMode(CL3D.Scene.REDRAW_EVERY_FRAME);

        // additional, let the sphere constantly rotate
        var sphereSceneNode = scene.getSceneNodeFromName('sphereMesh1');

        camPos = player.node.Pos.clone();
        camPos.X += 21;
        camPos.Y += 30;
        scene.getActiveCamera().Pos = camPos;

        camAnimator = new CL3D.AnimatorCameraFPS(scene.getActiveCamera(), engine);
        scene.getActiveCamera().addAnimator(camAnimator);
        camAnimator.lookAt(player.node.Pos);
        


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
    
    camPos = player.node.Pos.clone();
    camPos.X += 21;
    camPos.Y += 30;
    scene.getActiveCamera().Pos = camPos;
    camAnimator.lookAt(player.node.Pos);

    //engine.handleKeyDown(event);
};
