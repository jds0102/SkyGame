function Asteroid(name, position) {
    this.self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.node.Pos = position;
    this.animator = new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 1.6, 0.8));
    this.node.addAnimator(this.animator);
	this.onClick = function () {
		if ( clickedButton == LEFT_BUTTON )
			;//alert("A");
		else if ( clickedButton == RIGHT_BUTTON )
			;//alert("B");
	}
	this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	//this.clickAnimator = new CL3D.Animator();
	//this.clickAnimator.onMouseDown = this.onClick;
	this.node.addAnimator(this.clickAnimator);
	
	
	
}
