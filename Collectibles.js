
function HealthGlobe(name) {
    this.self = this;
    this.node = scene.getSceneNodeFromName(name);//.createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.type = "health";
}

function ManaGlobe(name) {
    this.self = this;
    this.node = scene.getSceneNodeFromName(name);//.createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.type = "mana";
}

function Star(name) {
    this.self = this;
    this.node = scene.getSceneNodeFromName(name);//.createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.type = "star";
    this.node.addAnimator(new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 1, 0)));
}

function Coin(name) {
    this.self = this;
    this.node = scene.getSceneNodeFromName(name);//.createClone(scene.getSceneNodeFromName(name).getParent());
    this.node.Visible = true;
    this.type = "coin";
    this.node.addAnimator(new CL3D.AnimatorRotation(new CL3D.Vect3d(0,1,0)));
}
