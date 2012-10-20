function Airship(name) {	
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
	this.node.Visible = true;
	
	this.speed = 0.05;
	this.rotationSpeed = 5;
	
	//this.baseRotation = new CL3D.Vect3d(1,0,0).getHorizontalAngle();
	//Adjust the fact the length of the ship is the X-axis
	//this.node.Rot = new CL3D.Vect3d(0,90,0);
	
	this.velocity = new CL3D.Vect3d(0,0,0);
	
	this.path = null;
	this.rot = null;
	
	//angle in the x-z plane w.r.t to z-axis
	this.theta = 0;
	
	this.update = function() {
		if ( self.path ) {
			if ( Math.abs(self.path.X - self.node.Pos.X ) < self.speed && Math.abs(self.path.Y - self.node.Pos.Y ) < self.speed ) {
				self.path = null;
			}
			self.node.Pos.addToThis(self.velocity);
		}
		if ( self.rot ) {
			//console.log(self.path.substract(self.node.Pos));
			if ( Math.abs(self.theta - self.rot) < Math.abs(self.rotationSpeed)  ) {
				self.rot = null;
			}
			self.theta = (self.theta + self.rotationSpeed) %360;
			self.theta += self.theta < 0 ? 360 : 0 ;
			//alert(self.rot + " " + self.theta + " " + Math.abs(self.theta - self.rot));
		}
						
		self.node.Rot.Y = (self.theta + 90) % 360;
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
			
			var delta = direction.getHorizontalAngle().Y - self.theta;
			self.rotationSpeed = ( (delta * (Math.abs(delta) - 180) < 0 ) ? 1 : -1 ) * Math.abs(self.rotationSpeed);
			self.rot = direction.getHorizontalAngle().Y;
		}
	}
	
		
	this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	this.node.addAnimator(this.clickAnimator);
}


