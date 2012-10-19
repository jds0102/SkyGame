function Asteroid(name, position) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.node.Pos = position;
    this.animator = new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 1.6, 0.8));
    this.node.addAnimator(this.animator);
	
	this.onClick = function () {
	
	//alert("asteroid");
		if ( clickedButton == LEFT_BUTTON )
			selectedObject = self;
		else if ( clickedButton == RIGHT_BUTTON )
			;//alert("B");
	}
	
	this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	this.node.addAnimator(this.clickAnimator);
	
	
	
}
