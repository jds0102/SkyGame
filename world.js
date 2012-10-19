var player = null, asteroid;
var ASTEROIDS = ['Mesh2', 'Mesh3', 'Mesh4'];
var AIRSHIP = 'Mesh1';
var worldAnimator;
var floorPlane;
	
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
	//var cpoint = new CL3D.Vect3d();
	//floorPlane.getIntersectionWithLine(new CL3D.Vect3d(0,-10,0), new CL3D.Vect3d(1,10,1), cpoint);
	//alert(cpoint.Y);
	player.node.Pos.X = cpoint.X;
	player.node.Pos.Z = cpoint.Z;
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
	//floorPlane = new CL3D.Plane3d();
	//floorPlane.setPlaneFrom3Points(new CL3D.Vect3d(0,0,0),new CL3D.Vect3d(0,0,1), new CL3D.Vect3d(1,0,1));
}