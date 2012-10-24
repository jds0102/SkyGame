function Asteroid(name, position) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name);
    this.node.Visible = true;
    this.node.Scale = new CL3D.Vect3d(5, 5, 5);
    this.destroyable = true;


    this.health = 100;

    //this.node.Scale = new CL3D.Vect3d(10, 10, 10);
    this.onClick = function () {

        //alert("asteroid");
        if (clickedButton == LEFT_BUTTON)
            ;
        else if (clickedButton == RIGHT_BUTTON)
            ; //alert("B");
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
