var PLATFORMS = ['Mesh6'];
var AIRSHIP = 'ship';

var worldAnimator;
var worldBox = new CL3D.Box3d();

var player = null, asteroid;
var airstreams = [];
var collectibles = [];
var asteroids = [];
var enemies = [];
var shootables = new Array();
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
	player.node.Pos = new CL3D.Vect3d(0, 0, -70);

	enemy = new EnemyTower();
	enemies.push(enemy);

//	for (var i = 0; i < player.node.getMaterialCount(); i++ ) {
//	    player.node.getMaterial(i).Type = newMaterialType;
//	}

	worldBox.addInternalPoint(500, 0, 0);
	worldBox.addInternalPoint(-500, 0, 0);
	worldBox.addInternalPoint(0, 500, 0);
	worldBox.addInternalPoint(0, -500, 0);
	worldBox.addInternalPoint(0, 0, 1000);
	worldBox.addInternalPoint(0, 0, 0);

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
	} while (haveMoreAirStreams);

	portal = new Portal(airstreams[airstreams.length - 1].node.Pos.add(new CL3D.Vect3d), airstreams[airstreams.length - 1].node.Rot);
	scene.getRootSceneNode().addChild(portal);
	
	
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

	//Load in the asteroids
	i = 1;
	while (scene.getSceneNodeFromName('asteroid' + i)) {
	    asteroids.push(new Asteroid('asteroid' + i));
	    i++;
	}

	//once all the objects are loaded, add all the shootable objects to one arrays
	shootables.push(player);
	for (var i = 0; i < asteroids.length; i++)
	    shootables.push(asteroids[i]);
	for (var i = 0; i < enemies.length; i++)
	    shootables.push(enemies[i]);

}

function updateWorld() {
    hud.update();

    worldTimer = new Date().getTime() - scene.getStartTime();

    
}


