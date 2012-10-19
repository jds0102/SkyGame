
function floatingRock(name, position) {
    this.self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.node.Pos = position;
    this.animator = new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 1.6, 0.8));
    this.node.addAnimator(this.animator);
}
