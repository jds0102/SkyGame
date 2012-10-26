function EnemyTower(name) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
    scene.getRootSceneNode().addChild(this.node);
    this.node.Visible = true;
    this.type = "ETower";
    //this.node.Pos = new CL3D.Vect3d(50, 0, 50);
    this.node.scale = new CL3D.Vect3d(0.5, 0.5, 0.5);

    this.rotRange = { min : 10, max : 20};
    this.rotSpeed = 0.1;
    this.direction = new CL3D.Vect3d(0, 0, 1);
    this.init_direction = self.direction.clone();

    this.isShooting = true;

    this.bulletBounds = new CL3D.Box3d();
    this.bulletBounds.addInternalPointByVector(this.node.Pos);
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(100,0,0)));
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(-100,0,0)));
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(0, 0, 100)));
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(0, 0, -100)));

    this.toggleShooting = function () {
        self.isShooting = !self.isShooting;
    }

    setInterval(this.toggleShooting, 2000);


    this.updateDirection = function () {
        var mat = new CL3D.Matrix4(true);
        mat.setRotationDegrees(self.node.Rot);
        self.direction = self.init_direction.clone();
        mat.rotateVect(self.direction);
    }
    
    this.updateDirection();
    this.init_direction = self.direction.clone();

    this.node.Rot.Y = this.rotRange.min;

    this.gotShot = function (shooter, bullet) {
        if (shooter == player ) {
            //alert("OUCH");
        }
    }

    this.update = function () {
        self.node.Rot.Y = (self.node.Rot.Y + self.rotSpeed) % 360;
        self.updateDirection();
        if (self.node.Rot.Y < self.rotRange.min || self.node.Rot.Y > self.rotRange.max)
            self.rotSpeed = -self.rotSpeed;
        else if (self.isShooting)
            shoot(self, self.node.Pos.clone(), self.direction.clone(), this.bulletBounds);
    }

    this.pulseHit = function () {

    }
}