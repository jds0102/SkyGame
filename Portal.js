var portalShader;

createVertex = function (x, y, z) {
    var vtx = new CL3D.Vertex3D(true);
    vtx.Pos.X = x;
    vtx.Pos.Y = y;
    vtx.Pos.Z = z;
    vtx.Color = CL3D.createColor(255,255,0,255);
    return vtx;
}

Portal = function (pos, rot) {
    var self = this;
    this.init();  // init scene node specific members
    this.Pos = pos;
    this.Rot = rot;
    this.length = 50;
    this.height = 50;

    // create a 3d mesh with one mesh buffer
    this.mesh = new CL3D.Mesh();

    var buf = new CL3D.MeshBuffer();

    // set indices and verticesaa
    buf.Indices = [3, 1, 0, 2, 1, 3];
    buf.Vertices.push(createVertex(50, 50, 0));
    buf.Vertices.push(createVertex(-50, 50, 0));
    buf.Vertices.push(createVertex(-50, -50, 0));
    buf.Vertices.push(createVertex(50, -50, 0));

    buf.Mat = new CL3D.Material();
    //alert(buf.Mat.Type);
    buf.Mat.Type = newMaterialType;
    buf.Mat.BackFaceCulling = false;

    this.mesh.AddMeshBuffer(buf);
}

Portal.prototype = new CL3D.SceneNode(); // derive from SceneNode

Portal.prototype.OnRegisterSceneNode = function (scene) {
	scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
	CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene); // call base class
}

Portal.prototype.render = function (renderer) {
    this.updateAbsolutePosition();
    renderer.setWorld(this.getAbsoluteTransformation());
    if (this.Visible) {
        renderer.drawMesh(this.mesh);
    }
}

Portal.prototype.initShader = function () {
    var vertex_shader_source = 
                "\
        		   #ifdef GL_ES                    \n\
        		   precision highp float;          \n\
        		   #endif                          \n\
                   uniform float some;             \
        		   uniform mat4 worldviewproj;     \
        		   attribute vec4 vPosition;       \
        		   attribute vec4 vNormal;         \
        		   void main()                     \
        		   {                               \
        			gl_Position = worldviewproj * vPosition;\
        		   }";

    var fragment_shader_source = 

        "\
        #ifdef GL_ES                    \n\
        precision highp float;          \n\
        #endif                          \n\
        uniform float some;             \
        \
        void main()                     \
        {                               \
        gl_FragColor = vec4(some, 0.0, some, 1.0);  \
        }";

    renderer = engine.getRenderer();
    newMaterialType = renderer.createMaterialType(vertex_shader_source, fragment_shader_source);
    shader = renderer.getGLProgramFromMaterialType(newMaterialType);
    shader.some = renderer.gl.getUniformLocation(shader, "some");
    renderer.gl.uniform1f(shader.some, 1.0);

}