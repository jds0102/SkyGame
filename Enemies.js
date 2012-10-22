function EnemyTower() {
    var self = this;
    this.node = scene.getSceneNodeFromName('ship').createClone(scene.getSceneNodeFromName('ship').getParent());
    scene.getRootSceneNode().addChild(this.node);
    this.node.Visible = true;
    this.type = "ETower";
    
    this.node.scale = new CL3D.Vect3d(0.5, 0.5, 0.5);
    
    this.update = function () {
        shoot(self, self.node.Pos.clone(), new CL3D.Vect3d(0,0,1));
    }
}