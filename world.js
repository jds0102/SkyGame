var ASTEROIDS = ['stream', 'Mesh3', 'Mesh4', 'Mesh6'];
var PLATFORMS = ['Mesh6'];
var AIRSHIP = 'ship';

var worldAnimator;

var player = null, asteroid;
var floorPlane;

var selectedObject = null;

var clickedButton = -1;
var LEFT_BUTTON = 0, MIDDLE_BUTTON = 1, RIGHT_BUTTON = 2;
var clickedWorld2dPos = new CL3D.Vect3d();

function hideSceneObjects() {
	nodes = scene.getAllSceneNodesOfType("mesh");
	for(var i = 0; i<nodes.length; i++) {
		nodes[i].Visible = false;
	}
}

function onMouseDownWorld(event) {
	//alert("clickworld" + event.button);
	clickedButton = event.button;
	x = engine.getMousePosXFromEvent(event);
	y = engine.getMousePosYFromEvent(event);
	target = engine.get3DPositionFrom2DPosition(x,y);
	c = scene.getActiveCamera().getAbsolutePosition();
	var line = new CL3D.Line3d;
	line.Start = c;
	line.End = target;
	var cpoint = new CL3D.MeshTriangleSelector(floorPlane.mesh, floorPlane).getCollisionPointWithLine(line.Start, line.End, false, null, false);
	clickedWorld2dPos = cpoint.clone();
	
	
}


function initWorld() {
	player = new Airship(AIRSHIP, scene);
    player.node.Pos = new CL3D.Vect3d(0, 0, 25);
	
    asteroid = new Asteroid(ASTEROIDS[0], new CL3D.Vect3d(0, 0, 0));
	
    worldAnimator = new CL3D.Animator();
    worldAnimator.onMouseDown = onMouseDownWorld;
    
    scene.getActiveCamera().addAnimator(worldAnimator);
	floorPlane = new FloorPlane();
	scene.getRootSceneNode().addChild(floorPlane);
	
}


