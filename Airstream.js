function Airstream(name) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.node.getMaterial(0).BackFaceCulling = false;
    this.direction = new CL3D.Vect3d(0, 0, 1);
    //this.node.Scale = new CL3D.Vect3d(1, 1, 100);

    var mat = new CL3D.Matrix4(true);
    mat.setRotationDegrees(this.node.Rot);
    mat.rotateVect(self.direction);

    this.update = function () {
        
    }
}