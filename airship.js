
function Airship(name) {	
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
	this.node.Visible = true;
	
	this.speed = 0.05;
	
	this.path = null;

	
	this.update = function() {
		if ( self.path ) {
			var end = self.path.clone();
			var start = self.node.Pos.clone();
			var direction = end.substract(start);
			direction.normalize();
			direction.multiplyThisWithScal(self.speed);
			self.node.Pos.addToThis(direction);
		}
	}
	
	this.onClick = function() {
	
		//alert("airship"+"  " + clickedButton);
		if ( clickedButton == LEFT_BUTTON )
			selectedObject = self;
		else if ( clickedButton == RIGHT_BUTTON )
			this.path = clickedWorld2dPos;
		
	}
	
		
	this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	this.node.addAnimator(this.clickAnimator);
}
