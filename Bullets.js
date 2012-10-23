function Bullet1(pos, vel) {
    var self = this;
    this.node = scene.getSceneNodeFromName('bullet1').createClone(scene.getSceneNodeFromName('bullet1').getParent());
    scene.getRootSceneNode().addChild(this.node);
    this.node.Visible = true;
    this.type = "Bullet1";
    this.node.Pos = pos;
    this.node.scale = new CL3D.Vect3d(0.5, 0.5, 0.5);
    this.speed = 10;
    this.node.Scale = new CL3D.Vect3d(1.2, 1.2, 1.2);
    this.shooter = null;
    this.rangeBound = null;

    this.velocity = vel.multiplyWithScal(this.speed);
    //alert(this.velocity);
    this.update = function () {
        self.node.Pos.addToThis(self.velocity);
    }
}

var bullets = Array();

function shoot(shooter, pos, vel, bound) {
    b = new Bullet1(pos, vel);
    b.shooter = shooter;
    if (bound)
        b.rangeBound = bound;
    else
        b.rangeBound = worldBox;
    bullets.push(b)
}

function updateBullets() {
    for (var i = bullets.length-1; i >=0; i--) {
        bullets[i].update();
        if (!bullets[i].rangeBound.isPointInside(bullets[i].node.Pos)) 
        {
            scene.getRootSceneNode().removeChild(bullets[i].node);            
            bullets.splice(i, 1);
        }
    }
}

function updateForCollisions() {
    for (var i = bullets.length-1; i >=0 ; i--) {
        for ( var j = shootables.length-1; j >=0 ; j--) {
            if (bullets[i].node.getBoundingBox().intersectsWithBox(shootables[j].node.getBoundingBox())) 
            {
                alert(i+" "+j);
                //scene.getRootSceneNode().removeChild(bullets[i].node);            
                //bullets.splice(i, 1);
            }
        }

        
    }
}