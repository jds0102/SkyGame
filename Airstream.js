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
    this.initShader();

//    this.node.getMaterial(0).Type =this.shaderType;
//    this.node.getMaterial(0).BackFaceCulling = false;
//    this.node.getMaterial(0).isTransparent = function () { return true; }

    this.update = function () {
        shader = renderer.getGLProgramFromMaterialType(self.shaderType);
        shader.light1 = renderer.gl.getUniformLocation(shader.light1, 'light1');
        var lPos = light1.getAbsolutePosition();
        renderer.gl.uniform4f(shader.light1, 1.0, lPos.Y, lPos.Z, 1.0);
    }
}

Airstream.prototype.initShader = function () {
    var vertex_shader_source =
                "\
        		   #ifdef GL_ES                    \n\
        		   precision highp float;          \n\
        		   #endif                          \n\
        		   uniform mat4 worldviewproj;     \
        		   attribute vec4 vPosition;       \
                   attribute vec4 vColor;       \
        		   attribute vec4 vNormal;         \
		           attribute vec2 vTexCoord1;      \
                   \
                   uniform vec4 light1;         \
                   uniform vec4 light2;         \
                   varying vec4 v_color;            \
		           \
                   varying vec3 color;          \
                   varying vec3 pos;            \
                   \
                   \
        		   void main()                     \
        		   {                               \
                    vec4 normal = worldviewproj * vNormal; \
                    vec3 n = normalize(vec3(normal.xyz));\
        			gl_Position = worldviewproj * vPosition;\
                    vec4 currentLight = vec4(0.0, 0.0, 0.0, 1.0);\
                    \
                    vec3 lPos = vec3((worldviewproj * light1).xyz);\
					vec3 vertexToLight = lPos - vec3(gl_Position.xyz);\
                    float distance = length(vertexToLight);\
				    float distanceFact = 1.0 / (light1.w * distance);\
                    vertexToLight = normalize(vertexToLight);\
                    float angle = dot(n, vertexToLight);\
			        float intensity = angle;\
                    currentLight = currentLight + vec4(intensity, intensity, intensity, 1.0);\
                    \
                    lPos = vec3((worldviewproj * light2).xyz);\
					vertexToLight = lPos - vec3(gl_Position.xyz);\
                    distance = length(vertexToLight);\
				    distanceFact = 1.0 / (light2.w * distance);\
                    vertexToLight = normalize(vertexToLight);\
                    angle = dot(n, vertexToLight);\
			        intensity = angle * distanceFact;\
                    currentLight = currentLight + vec4(intensity, intensity, intensity, 1.0);\
                    \
                    currentLight = max(currentLight, vec4(0.0, 0.0, 0.0, 0.0)); \
                    currentLight = currentLight * vec4(vColor.x, vColor.y, vColor.z, 1.0);  \
                    vec4 v_color = min(currentLight, vec4(1.0, 1.0, 1.0, 1.0));  \
                    color = v_color.rgb;    \
                    pos = vPosition.xyz;\
        		   }";

    var fragment_shader_source =
        "\
        #ifdef GL_ES                    \n\
        precision highp float;          \n\
        #endif                          \n\
        varying vec3 color;          \
        varying vec3 pos;\
        void main()                     \
        {                               \
        gl_FragColor  = vec4(color, 0.5);  \
        }";

    renderer = engine.getRenderer();
    this.shaderType = renderer.createMaterialType(vertex_shader_source, fragment_shader_source, true, renderer.gl.ONE, renderer.gl.ONE_MINUS_SRC_ALPHA);
    shader = renderer.getGLProgramFromMaterialType(this.shaderType);
    
    shader.light1 = renderer.gl.getUniformLocation(shader, 'light1');
    var lPos = light1.getAbsolutePosition();
    renderer.gl.uniform4f(shader.light1, 1.0, lPos.Y, lPos.Z, 1.0);

    shader.light2 = renderer.gl.getUniformLocation(shader, 'light2');
    var lPos = light2.getAbsolutePosition();
    renderer.gl.uniform4f(shader.light2, 1.0, lPos.Y, lPos.Z, 1.0);
    
    this.shader = shader;
}