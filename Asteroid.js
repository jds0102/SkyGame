function Asteroid(name, position) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.node.Pos = position;
    this.node.Scale = new CL3D.Vect3d(10, 10, 10);
    this.onClick = function () {

        //alert("asteroid");
        if (clickedButton == LEFT_BUTTON)
            ;
        else if (clickedButton == RIGHT_BUTTON)
            ; //alert("B");
    }
	
	//this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	//this.node.addAnimator(this.clickAnimator);
	
	
	
}
