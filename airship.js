
function Airship(name) {	
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
	this.node.Visible = true;
	
	this.speed = 0.05;
	
	this.path = null;
	this.update = function() {
		// path = CL3D.PathSceneNode();
		// path.Nodes = [this.node.Pos, new CL3D.Vect3d(clickedWorld2dPos.X, clickedWorld2dPos.Y, clickedWorld2dPos.Z)];
		// self.animator = new CL3D.AnimatorFollowPath(scene);
		// self.animator.setPathToFollow(path);
		// self.addAnimator(animator);
		
		// var p = new CL3D.PathSceneNode();

		// p.Pos = this.node.Pos.clone();
		// p.Visible = true;
		// p.scene = scene;
		// p.Nodes.push(p.Pos);
		// p.Nodes.push(new CL3D.Vect3d(clickedWorld2dPos.X, clickedWorld2dPos.Y, clickedWorld2dPos.Z));

		// self.node.addChild(p);
		// p.updateAbsolutePosition();
		
		
		// self.animator = new CL3D.AnimatorFollowPath(scene);
		// self.animator.setPathToFollow(p);
		// self.animator.setOptions(CL3D.AnimatorFollowPath.EFPFEM_STOP, 5000, false)
		// self.node.addAnimator(self.animator);
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
		this.path = clickedWorld2dPos;
	}
}
