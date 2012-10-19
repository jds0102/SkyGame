var player = null, asteroid;
var ASTEROIDS = ['Mesh2', 'Mesh3', 'Mesh4'];
var AIRSHIP = 'Mesh1';
var worldAnimator;
var floorPlane;

var clickedButton = -1;
var LEFT_BUTTON = 0, MIDDLE_BUTTON = 1, RIGHT_BUTTON = 2;
var clickedWorld2dPos = { X:0, Y:0, Z:0 };

function hideSceneObjects() {
	nodes = scene.getAllSceneNodesOfType("mesh");
	for(var i = 0; i<nodes.length; i++) {
		nodes[i].Visible = false;
	}
}

function onClickWorld(event) {
	lastClickedButton = event.button;
	x = engine.getMousePosXFromEvent(event);
	y = engine.getMousePosYFromEvent(event);
	target = engine.get3DPositionFrom2DPosition(x,y);
	c = scene.getActiveCamera().getAbsolutePosition();
	var line = new CL3D.Line3d;
	line.Start = c;
	line.End = target;
	var cpoint = new CL3D.MeshTriangleSelector(floorPlane.mesh, floorPlane).getCollisionPointWithLine(line.Start, line.End, false, null, false);
	clickedWorld2dPos.X = cpoint.X;
	clickedWorld2dPos.Y = cpoint.Y;
	clickedWorld2dPos.Z = cpoint.Z;
	//player.node.Pos.X = cpoint.X;
	//player.node.Pos.Z = cpoint.Z;
}

function initWorld() {
	player = new Airship(AIRSHIP, scene);
    player.node.Pos = new CL3D.Vect3d(0, 5, 25);
	asteroid = new Asteroid(ASTEROIDS[0], new CL3D.Vect3d(10, 0, 10));
	worldAnimator = new CL3D.Animator();
	worldAnimator.onMouseDown = onClickWorld;
	scene.getActiveCamera().addAnimator(worldAnimator);
	floorPlane = new FloorPlane();
	scene.getRootSceneNode().addChild(floorPlane);
}