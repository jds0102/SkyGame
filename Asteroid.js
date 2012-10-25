function Asteroid(name, position) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name);
    this.node.Visible = true;
    this.node.Scale = new CL3D.Vect3d(5, 5, 5);
    this.destroyable = true;
    this.isMoving = true;
    this.init_Pos = this.node.Pos;
    this.health = 100;
    this.theta = 0;
    this.oscilatingRange = 15;
    for (var i = airstreams.length - 1; i >= 0; i--) {
        if (airstreams[i].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
            self.direction = airstreams[i].direction;
            self.direction = self.direction.crossProduct(new CL3D.Vect3d(0, 1, 0));
            break;
        }
    }

    //this.node.Scale = new CL3D.Vect3d(10, 10, 10);
    this.onClick = function () {

        //alert("asteroid");
        if (clickedButton == LEFT_BUTTON)
            ;
        else if (clickedButton == RIGHT_BUTTON)
            ; //alert("B");
    }

    this.update = function () {
        self.theta += 0.03;
        self.node.Pos = self.init_Pos.add(self.direction.multiplyWithScal(this.oscilatingRange * Math.sin(self.theta)));
    }

    this.gotShot = function (shooter, bullet) {
        //alert(self.destroyable);
        if (shooter == player && self.destroyable) {
            self.health -= 20;
            if (self.health <= 0) {
                scene.getRootSceneNode().removeChild(self.node);
                self.node.Visible = false;
                asteroids.splice(asteroids.indexOf(self), 1);
            }
        }
    }

    this.pulseHit = function () {
        scene.getRootSceneNode().removeChild(self.node);
        self.node.Visible = false;
        asteroids.splice(asteroids.indexOf(self), 1);
    }

	//this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	//this.node.addAnimator(this.clickAnimator);
	
	
	
}
