var PLATFORMS = ['Mesh6'];
var AIRSHIP = 'ship';

var worldAnimator;

var player = null, asteroid;
var airstreams = [];
var collectibles = [];
var portal;
var floorPlane;
var hud;
var worldTimer = 0;

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

	for (var i = 0; i < player.node.getMaterialCount(); i++ ) {
	    player.node.getMaterial(i).Type = newMaterialType;
	}

	

	portal = new Portal();
	scene.getRootSceneNode().addChild(portal);
	portal.Visible = false;
    
	//asteroid = new Asteroid(ASTEROIDS[0], new CL3D.Vect3d(0, 0, 0));
	var i = 1;
	var haveMoreAirStreams = true;
	do {
	    if (scene.getSceneNodeFromName('stream' + i)) {
	        airstreams.push(new Airstream('stream' + i));
	        //airstreams[i-1].node.getMaterial(0).Type = newMaterialType;
            i++;
        }
	    else haveMoreAirStreams = false;
	}while (haveMoreAirStreams);
    //alert(airstreams[0].node.Rot);
    //alert(airstreams[1].node.Rot);
	
    worldAnimator = new CL3D.Animator();
    worldAnimator.onMouseDown = onMouseDownWorld;
    scene.getActiveCamera().addAnimator(worldAnimator);

	floorPlane = new FloorPlane();
	scene.getRootSceneNode().addChild(floorPlane);

	hud = new HUD();

    //Load in the Health Globes
	i = 1;
	while (scene.getSceneNodeFromName('health' + i)) {
	    collectibles.push(new HealthGlobe('health' + i));
	    i++;
	}

    //Load in the Mana Globes
	i = 1;
	while (scene.getSceneNodeFromName('mana' + i)) {
	    collectibles.push(new ManaGlobe('mana' + i));
	    i++;
	}


    //Load in the coins
	i = 1;
	while (scene.getSceneNodeFromName('coin' + i)) {
	    collectibles.push(new Coin('coin' + i));
	    i++;
	}

    //Load in the stars
	i = 1;
	while (scene.getSceneNodeFromName('star' + i)) {
	    collectibles.push(new Star('star' + i));
	    i++;
	}


}

function updateWorld() {
    hud.update();

    worldTimer = new Date().getTime() - scene.getStartTime();

    
}


