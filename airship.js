function Airship(name, startCoins) {	
    var self = this;
    this.node = scene.getSceneNodeFromName(name); //.createClone(scene.getSceneNodeFromName(name).getParent());
	this.node.Visible = true;
	
	this.velocity = new CL3D.Vect3d(0,0,0);
	this.direction = new CL3D.Vect3d(0, 0, 1);

	this.speed = 1;
	this.hzSpeed = 0.5;
	this.rotSpeed = 3;
    this.dragFactor = 0.98;

    this.turnFactor = 0.01;
    self.toTurn = false;
    this.curStreamIndex = 1;

    this.health = 100;
    this.mana = 100;
    this.lastManaUpdate = 0.0;
    this.stars = 0;
    this.coins = startCoins;
    this.curPulse = null;

    this.justHitAsteroid = false;

    this.invunrable = false;
    scene.getSceneNodeFromName('forcefield1').Visible = false;
    this.shield = scene.getSceneNodeFromName('forcefield1').createClone(this.node); ;
    this.shield.Visible = false;

    this.handleInput = function () {
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

        //This is the getString result of pressing left arrow
        if (KB.isKeyDown['%'] && player.node)
            self.node.Pos.addToThis(left);

        if (KB.isKeyDown['S'] && player.node)
            self.node.Pos.substractFromThis(self.direction); ;

        //This is the getString result of pressing right arrow
        if (KB.isKeyDown['\''] && player.node)
            self.node.Pos.addToThis(left.multiplyWithScal(-1));

        if (KB.isKeyDown[' '] && player.node && self.mana > 0) {
            var bulletBounds = new CL3D.Box3d();
            bulletBounds.addInternalPointByVector(self.node.Pos);
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(100, 0, 0)));
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(-100, 0, 0)));
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(0, 0, 100)));
            bulletBounds.addInternalPointByVector(self.node.Pos.add(new CL3D.Vect3d(0, 0, -100)));
            shoot(self, self.node.Pos.clone(), self.direction.clone(), bulletBounds);
            self.mana -= 6;
        }

        if (KB.isKeyDown['1'] && player.node && self.coins >= 10 && self.invunrable == false) {
            self.invunrable = true;
            self.coins -= 10;
            self.shield.Visible = true;
            setTimeout(self.resetInvulnerability, 5000);
        }

        if (KB.isKeyDown['2'] && player.node && self.coins >= 5) {
            self.coins -= 5;
            isSlowTime = true;
            setTimeout(function () { isSlowTime = false; }, 3000);
        }

        if (KB.isKeyDown['3'] && player.node && self.coins >= 5 && self.curPulse == null) {
            self.coins -= 5;
            self.curPulse = new Pulse(self.node.Pos);
        }

    }

    this.updateVelocity = function () {
        var insideStream = false;
        if (self.curStreamIndex < airstreams.length - 1 && airstreams[self.curStreamIndex].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
            insideStream = true;
            if (self.toTurn && self.velocity.dotProduct(airstreams[self.curStreamIndex].direction) / player.speed < 0.95) {
                self.velocity.multiplyThisWithScal(1 - self.turnFactor);
                self.velocity.addToThis(airstreams[self.curStreamIndex].direction.multiplyWithScal(self.speed * self.turnFactor));
            }
            else
                self.velocity = airstreams[self.curStreamIndex].direction.multiplyWithScal(self.speed);
        }
        else if (self.curStreamIndex < airstreams.length - 2 && airstreams[self.curStreamIndex + 1].node.getTransformedBoundingBox().isPointInside(self.node.Pos)) {
            self.curStreamIndex++;
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
            self.decreaseHealth(0.3);
        }
    }

    this.update = function () {
        if (paused) {
            return;
        }

        if (airstreams && !self.justHitAsteroid) {
            self.updateVelocity();
        }
        self.node.Pos.addToThis(self.velocity);

        self.handleInput();

        var mat = new CL3D.Matrix4(true);
        mat.setRotationDegrees(self.node.Rot);
        self.direction.X = 0;
        self.direction.Y = 0;
        self.direction.Z = 1;
        mat.rotateVect(self.direction);

        for (var i = 0; i < collectibles.length; i++) {
            if (this.node.getTransformedBoundingBox().intersectsWithBox(collectibles[i].node.getTransformedBoundingBox()) && collectibles[i].node.Visible == true) {
                if (collectibles[i].type == "health") {
                    self.increaseHealth(10);
                } else if (collectibles[i].type == "mana") {
                    self.increaseMana(10);
                } else if (collectibles[i].type == "star") {
                    self.stars++;
                } else if (collectibles[i].type == "coin") {
                    self.coins++;
                }
                collectibles[i].node.Visible = false;
            }

        }

        for (var i = 0; i < asteroids.length; i++) {
            if (self.node.getTransformedBoundingBox().intersectsWithBox(asteroids[i].node.getTransformedBoundingBox()) && asteroids[i].node.Visible == true) {
                //asteroids[i].node.Visible = false;

                if (!self.justHitAsteroid) {
                    self.justHitAsteroid = true;
                    self.decreaseHealth(25);
                    self.velocity.multiplyThisWithScal(-1);
                    setTimeout(function () { self.justHitAsteroid = false; }, 500)
                }
                else {
                    self.velocity.multiplyThisWithScal(0.8);
                }
                self.node.updateAbsolutePosition();
            }
        }

        //Increase the mana at 1 mana per second
        var date = new Date()
        if (date.getTime() - self.lastManaUpdate > 1.5 && !KB.isKeyDown[' ']) {
            self.lastManaUpdate = date.getTime();
            self.increaseMana(1);
        }

        

//        if (self.curPulse != null && self.curPulse.node.Visible == false) {
//            self.curPulse = null;
//        }

    }

	this.onClick = function () {

	    //alert("airship"+"  " + clickedButton);
	    if (clickedButton == LEFT_BUTTON)
	        ;
	    else if (clickedButton == RIGHT_BUTTON) {
	        ;
	    }
	}

	this.increaseHealth = function (value) {
	    self.health = Math.min(100, self.health + value);
	}

    this.decreaseHealth = function (value) {
        if (!self.invunrable) {
            self.health = Math.max(0, self.health - value);
        }
    }

    this.increaseMana = function (value) {
        self.mana = Math.min(100, self.mana + value);
    }

	//this.clickAnimator = new CL3D.AnimatorOnClick(scene, engine, this.onClick);
	//this.node.addAnimator(this.clickAnimator);
	this.animator = new CL3D.Animator();
	this.node.addAnimator(this.animator);

	this.gotShot = function (shooter, bullet) {
	    if (shooter != self && !self.invunerable) {
	        self.decreaseHealth(bullet.damage);
	    }
	}

	this.resetInvulnerability = function () {
	    self.invunrable = false;
	    self.shield.Visible = false;
	}

	this.mouseDown = function (x, y) {
//	    if (x < 95 && x > 0) {
//	        if (y > 200 && y < 290 && player.node && self.coins >= 10) {
//	            self.invunrable = true;
//	            self.coins -= 10;
//	            setTimeout(self.resetInvulnerability, 5000);
//	        } else if (y > 300 && y < 390 && player.node && self.coins >= 5) {
//	            self.coins -= 5;
//	            //slow time
//	        } else if (y > 400 && y < 490 && self.coins >= 5 && self.curPulse == null) {
//	            self.coins -= 5;
//	            self.curPulse = new Pulse(self.node.Pos);
//	        }
//	    }
	}

}



