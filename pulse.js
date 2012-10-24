function Pulse(position) {
    var self = this;
    this.maxSize = 40;
    this.size = new CL3D.Vect3d(2,2,2);
    speed = 1.2;
    this.node = scene.getSceneNodeFromName('ring1').createClone(scene.getSceneNodeFromName('ring1').getParent());
    this.node.Visible = true;
    this.node.Pos = position;
    this.timerID;


    this.update = function () {
        self.size.multiplyThisWithScal(speed);
        self.node.Scale = new CL3D.Vect3d(self.size.X, 1, self.size.Y);
        if (self.size.getLength() > self.maxSize) {
            self.node.Visible = false;
            delete (player.curPulse);
            clearInterval(timerID);
        }

        for (var i = shootables.length - 1; i >= 0; i--) {

            if (shootables[i] && shootables[i].node.getTransformedBoundingBox().intersectsWithBox(self.node.getTransformedBoundingBox()) && shootables[i] != player) {
                shootables[i].pulseHit(self);
            }
        }
    }

    timerID = setInterval(this.update, 16);
}