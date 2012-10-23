function Asteroid(name, position) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name);
    this.node.Visible = true;
    this.node.Scale = new CL3D.Vect3d(10, 10, 10);
    this.detroyable = true;

    //this.node.Scale = new CL3D.Vect3d(10, 10, 10);
    this.onClick = function () {

        //alert("asteroid");
        if (clickedButton == LEFT_BUTTON)
            ;
        else if (clickedButton == RIGHT_BUTTON)
            ; //alert("B");
    }

    this.gotShot = function (shooter, bullet) {
        if (shooter == player && self.destroyable) {
            scene.getRootSceneNode().removeChild(self.node);
            asteroids.splice(asteroids.indexOf(self), 1);
        }
    }

	//this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	//this.node.addAnimator(this.clickAnimator);
	
	
	
}
