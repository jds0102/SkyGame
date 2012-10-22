function Bullet1(pos, vel) {
    var self = this;
    this.node = scene.getSceneNodeFromName('health1').createClone(scene.getSceneNodeFromName('health1').getParent());
    scene.getRootSceneNode().addChild(this.node);
    this.node.Visible = true;
    this.type = "Bullet1";
    this.node.Pos = pos;
    this.node.scale = new CL3D.Vect3d(0.5, 0.5, 0.5);
    this.speed = 10;

    this.velocity = vel.multiplyWithScal(this.speed);
    //alert(this.velocity);
    this.update = function () {
        self.node.Pos.addToThis(self.velocity);
    }
}

var bullets = Array();


function updateBullets() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].update();
        if (!worldBox.isPointInside(bullets[i].node.Pos)) 
        {
            //alert('h');
            scene.getRootSceneNode().removeChild(bullets[i].node);
            
            bullets.splice(i, 1);
            i--;
        }
    }
}