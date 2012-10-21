createVertex = function (x, y, z) {
    var vtx = new CL3D.Vertex3D(true);
    vtx.Pos.X = x;
    vtx.Pos.Y = y;
    vtx.Pos.Z = z;
    vtx.Color = 0xff0000ff;
    //vtx.TCoords.X = s;
    //vtx.TCoords.Y = t;
    return vtx;
}

Portal = function () {
    var self = this;
    this.init();  // init scene node specific members

    // create a 3d mesh with one mesh buffer

    this.mesh = new CL3D.Mesh();
    var buf = new CL3D.MeshBuffer();
    this.mesh.AddMeshBuffer(buf);
    // set indices and vertices

    buf.Indices = [3, 1, 0, 2, 1, 3];

    buf.Vertices.push(createVertex(100, 100, 0));
    buf.Vertices.push(createVertex(-100, 100, 0));
    buf.Vertices.push(createVertex(-100, -100, 0));
    buf.Vertices.push(createVertex(100, -100, 0));

//    self.material = new CL3D.Material();
//    self.material.setFrom(player.node.getMaterial(0));
//    self.material.BackFaceCulling = false;
    // set the texture of the material
    
    //buf.Mat.Tex1 = engine.getTextureManager().getTexture("test.jpg", true);
}
	Portal.prototype = new CL3D.SceneNode(); // derive from SceneNode

	Portal.prototype.OnRegisterSceneNode = function (scene) {
	    scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
	    CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene); // call base class
	}

	Portal.prototype.render = function (renderer) {
	    //renderer.setMaterial(this.material);
	    renderer.setWorld(this.getAbsoluteTransformation());
	    if (this.Visible) {
	        renderer.drawMesh(this.mesh);
	    }
	}