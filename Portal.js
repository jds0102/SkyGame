

createVertex = function (x, y, z, s, t) {
    var vtx = new CL3D.Vertex3D(true);
    vtx.Pos.X = x;
    vtx.Pos.Y = y;
    vtx.Pos.Z = z;
    vtx.TCoords.X = s;
    vtx.TCoords.Y = t;
    vtx.Color = CL3D.createColor(255,255,0,255);
    return vtx;
}

Portal = function (pos, rot) {
    var self = this;
    this.init();  // init scene node specific members
    this.Pos = pos;
    this.Rot = rot;

    this.dFrame = 1;
    this.frame = 0;

    this.size = 20;
    this.Scale = new CL3D.Vect3d(this.size, this.size, this.size);
    this.initShader();

    // create a 3d mesh with one mesh buffer
    this.mesh = new CL3D.Mesh();

    var buf = new CL3D.MeshBuffer();

    // set indices and verticesaa
    buf.Indices = [3, 1, 0, 2, 1, 3];
    buf.Vertices.push(createVertex(1, 1, 0, 1, 0));
    buf.Vertices.push(createVertex(-1, 1, 0, 0, 0));
    buf.Vertices.push(createVertex(-1, -1, 0, 0, 1));
    buf.Vertices.push(createVertex(1, -1, 0, 1, 1));

    buf.Mat = new CL3D.Material();
    //alert(buf.Mat.Type);
    buf.Mat.Type = this.portalShaderType;
    buf.Mat.BackFaceCulling = false;
    buf.Mat.isTransparent = function () { return true; }
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
        		   uniform mat4 worldviewproj;     \
        		   attribute vec4 vPosition;       \
        		   attribute vec4 vNormal;         \
		           attribute vec2 vTexCoord1;      \
		           varying vec2 uv;       \
        		   void main()                     \
        		   {                               \
        			gl_Position = worldviewproj * vPosition;\
                    uv = vTexCoord1.st;         \
        		   }";

    var fragment_shader_source = 
        "\
        #ifdef GL_ES                    \n\
        precision highp float;          \n\
        #endif                          \n\
        uniform float radius;             \
        uniform float nBands;           \
        uniform float time;           \
        varying vec2 uv;       \
        \
        void main()                     \
        {                               \
        float angle = 0.8;\
        vec2 center = vec2(radius , radius );\
        vec2 tc = uv * radius * 2.0; \
        tc -= center; \
        float dist = length(tc);\
        if (dist > (radius) )\
            discard;\
        \
        float percent = (radius - dist) / radius;\
        float theta = percent * percent * angle * time;\
        float S = sin(theta); \
        float C = cos(theta); \
        tc = vec2(dot(tc, vec2(C, -S)), dot(tc, vec2(S, C)));   \
        tc += center;\
        tc = tc / radius;\
        \
        float u = tc.t * nBands;           \
        u = mod(u, 2.0);             \
        vec4 c;                   \
        if ( u < 1.0 ) \
        gl_FragColor  = vec4(0.0, 0.0, 0.5, 0.5);  \
        else \
        gl_FragColor  = vec4(0.4, 0.3, 1.0, 0.5);  \
        if ( dist > radius * 0.95) \
            gl_FragColor  = vec4(233.0 / 256.0, 214.0/ 256.0, 106.0 / 256.0, 0.5);  \
        }";

    renderer = engine.getRenderer();
    this.portalShaderType = renderer.createMaterialType(vertex_shader_source, fragment_shader_source, true, renderer.gl.ONE, renderer.gl.ONE_MINUS_SRC_ALPHA);
    shader = renderer.getGLProgramFromMaterialType(this.portalShaderType);
    shader.radius = renderer.gl.getUniformLocation(shader, "radius");
    shader.nBands = renderer.gl.getUniformLocation(shader, "nBands");
    shader.time = renderer.gl.getUniformLocation(shader, "time");
    renderer.gl.uniform1f(shader.radius, this.size / 2);
    renderer.gl.uniform1f(shader.nBands, 20.0);
    renderer.gl.uniform1f(shader.time, frame);
    this.shader = shader;
}

Portal.prototype.update = function () {

    this.frame = this.frame + this.dFrame;
    shader = renderer.getGLProgramFromMaterialType(this.portalShaderType);
    renderer.gl.uniform1f(portal.shader.time, this.frame / 3);

    if (this.frame >= 49 || this.frame <= -49)
        this.dFrame = -this.dFrame;
}