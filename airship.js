function Airship(name) {	
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
	this.node.Visible = true;

	this.velocity = new CL3D.Vect3d(0,0,0);
	this.direction = new CL3D.Vect3d(0, 0, 1);

	this.speed = 1;
	this.hzSpeed = 0.5;
	this.rotSpeed = 3;
    this.dragFactor = 0.98;

    this.turnFactor = 0.10;
    self.toTurn = false;
    this.curStreamIndex = 1;

    this.health = 100;
    this.mana = 100;
    this.stars = 12;
    this.coins = 4;

    this.update = function () {
        if (airstreams) {
            var insideStream = false;
            if (self.curStreamIndex < airstreams.length - 1 && airstreams[self.curStreamIndex].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
                insideStream = true;
                if (self.velocity.dotProduct(airstreams[self.curStreamIndex].direction) / player.speed < 0.95) {
                    //alert(self.velocity.dotProduct(airstreams[self.curStreamIndex].direction) / player.speed);
                    self.velocity.multiplyThisWithScal(1 - self.turnFactor);
                    self.velocity.addToThis(airstreams[self.curStreamIndex].direction.multiplyWithScal(self.speed * self.turnFactor));
                }
                else
                    self.velocity = airstreams[self.curStreamIndex].direction.multiplyWithScal(self.speed);
            }
            else if (self.curStreamIndex < airstreams.length - 2 && airstreams[self.curStreamIndex + 1].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
                self.curStreamIndex++;
                //self.toTurn = true;
                insideStream = true;
            }
            else {
                for (var i = airstreams.length - 1; i >= 0; i--) {
                    if (airstreams[i].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
                        self.velocity = airstreams[i].direction.multiplyWithScal(self.speed);
                        insideStream = true;
                        break;
                    }
                }
            }
            if (!insideStream) {
                self.velocity.multiplyThisWithScal(self.dragFactor);
            }
        }
        self.node.Pos.addToThis(self.velocity);

        var left = self.direction.crossProduct(new CL3D.Vect3d(0, 1, 0));
        var rot = self.direction.getHorizontalAngle();
        left.multiplyThisWithScal(self.hzSpeed);

        if (KB.isKeyDown['W'] && player.node)
            self.node.Pos.addToThis(self.direction);

        if (KB.isKeyDown['Q'] && player.node) {
            self.node.Rot.Y -= self.rotSpeed;
        }

        if (KB.isKeyDown['E'] && player.node) {
            self.node.Rot.Y += self.rotSpeed; ;
        }
        
        if (KB.isKeyDown['A'] && player.node) 
            self.node.Pos.addToThis(left);

        if (KB.isKeyDown['S'] && player.node)
            self.node.Pos.substractFromThis(self.direction); ;

        if (KB.isKeyDown['D'] && player.node)
            self.node.Pos.addToThis(left.multiplyWithScal(-1));

        var mat = new CL3D.Matrix4(true);
        mat.setRotationDegrees(self.node.Rot);
        self.direction.X = 0;
        self.direction.Y = 0;
        self.direction.Z = 1;
        mat.rotateVect(self.direction);
    }

	this.onClick = function () {

	    //alert("airship"+"  " + clickedButton);
	    if (clickedButton == LEFT_BUTTON)
	        ;
	    else if (clickedButton == RIGHT_BUTTON) {
	        ;
	    }
	}
//	this.onKeyDown = function (event) {
//	    var key = String.fromCharCode(event.keyCode);
//	    var left = self.direction.crossProduct(new CL3D.Vect3d(0, 1, 0));

//	    var rot = self.direction.getHorizontalAngle();

//	    left.multiplyThisWithScal(self.hzSpeed);
//	    if (key == 'W' && player.node)
//	        self.node.Pos.addToThis(self.direction);

//	    if (key == 'Q' && player.node) {
//	        self.node.Rot.Y -= self.rotSpeed;
//	    }

//	    if (key == 'E' && player.node) {
//	        self.node.Rot.Y += self.rotSpeed; ;
//	    }

//	    if (key == 'A' && player.node)
//	        self.node.Pos.addToThis(left);

//	    if (key == 'S' && player.node)
//	        self.node.Pos.substractFromThis(self.direction); ;

//	    if (key == 'D' && player.node)
//	        self.node.Pos.addToThis(left.multiplyWithScal(-1));

//	    var mat = new CL3D.Matrix4(true);
//	    mat.setRotationDegrees(self.node.Rot);
//	    self.direction.X = 0;
//	    self.direction.Y = 0;
//	    self.direction.Z = 1;
//	    mat.rotateVect(self.direction);

//	}	

	//this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	//this.node.addAnimator(this.clickAnimator);
	this.animator = new CL3D.Animator();
	this.node.addAnimator(this.animator);

	
}


