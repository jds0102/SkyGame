function Airship(name) {	
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
	this.node.Visible = true;
	
	this.speed = 0.05;
	this.rotationSpeed = 10;
	
	//this.baseRotation = new CL3D.Vect3d(1,0,0).getHorizontalAngle();
	//Adjust the fact the length of the ship is the X-axis
	//this.node.Rot = new CL3D.Vect3d(0,90,0);
	
	this.velocity = new CL3D.Vect3d(0,0,0);
	
	this.path = null;
	this.rot = null
	//angle in the x-z plane w.r.t to z-axis
	//this.theta = 0;
	
	this.update = function() {
		if ( self.path ) {
			if ( Math.abs(self.path.X - self.node.Pos.X ) < self.speed && Math.abs(self.path.Y - self.node.Pos.Y ) < self.speed ) {
				self.path = null;
			}
			self.node.Pos.addToThis(self.velocity);
		}
		if ( self.rot ) {
			//console.log(self.path.substract(self.node.Pos));
			if ( Math.abs(self.node.Rot.Y - self.rot) < self.rotationSpeed  ) {
				self.rot = null;
			}
			self.node.Rot.Y = (self.node.Rot.Y -90 + self.rotationSpeed) %360 + 90;
		}
			//rotation = direction.getHorizontalAngle().Y - self.node.Rot.getHorizontalAngle().Y 
			//rotation.normalize();
			//rotation.multiplyThisWithScal(self.rotationSpeed);
			//self.node.Rot.addToThis(rotation);			
		
	}
	
	this.onClick = function() {
	
		//alert("airship"+"  " + clickedButton);
		if ( clickedButton == LEFT_BUTTON )
			selectedObject = self;
		else if ( clickedButton == RIGHT_BUTTON ) {
			self.path = clickedWorld2dPos;	
			var end = self.path.clone();
			var start = self.node.Pos.clone();
			var direction = end.substract(start);
			direction.normalize();
			direction.multiplyThisWithScal(self.speed);
			self.velocity = direction.clone();
			
			self.rot = direction.getHorizontalAngle().Y + 90;

			//self.node.Rot = direction.getHorizontalAngle();
			//self.node.Rot.Y += 90;
			alert(self.rot);
		}
	}
	
		
	this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	this.node.addAnimator(this.clickAnimator);
}
