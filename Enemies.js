function EnemyTower(name) {
    var self = this;
    this.node = scene.getSceneNodeFromName(name).createClone(scene.getSceneNodeFromName(name).getParent());
    scene.getRootSceneNode().addChild(this.node);
    this.node.Visible = true;
    this.type = "ETower";
    //this.node.Pos = new CL3D.Vect3d(50, 0, 50);
    this.node.scale = new CL3D.Vect3d(0.5, 0.5, 0.5);

    this.rotRange = { min : 10, max : 20};
    this.rotSpeed = 0.1;
    this.direction = new CL3D.Vect3d(0, 0, 1);
    this.init_direction = self.direction.clone();
    
    this.dFrame = 0.1;
    this.frame = 0;
    var shader1;

    this.isShooting = true;

    this.bulletBounds = new CL3D.Box3d();
    this.bulletBounds.addInternalPointByVector(this.node.Pos);
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(100,0,0)));
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(-100,0,0)));
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(0, 0, 100)));
    this.bulletBounds.addInternalPointByVector(this.node.Pos.add(new CL3D.Vect3d(0, 0, -100)));

    this.toggleShooting = function () {
        self.isShooting = !self.isShooting;
    }

    setInterval(this.toggleShooting, 2000);


    this.updateDirection = function () {
        var mat = new CL3D.Matrix4(true);
        mat.setRotationDegrees(self.node.Rot);
        self.direction = self.init_direction.clone();
        mat.rotateVect(self.direction);
    }
    
    this.updateDirection();
    this.init_direction = self.direction.clone();

    this.node.Rot.Y = this.rotRange.min;

    this.gotShot = function (shooter, bullet) {
        if (shooter == player ) {
            //alert("OUCH");
        }
    }

    this.update = function () {
         if (self.frame >= 60 || self.frame <= 0)
             self.dFrame = -self.dFrame;
        
 		//console.log(self.frame);
 		
 		self.frame = self.frame + self.dFrame;
        shader1 = renderer.getGLProgramFromMaterialType(newMaterialType);
        shader1.time = renderer.gl.getUniformLocation(shader1, "time");
        renderer.gl.uniform1f(shader1.time, self.frame);
    
        newMaterialType = renderer.createMaterialType(vertex_shader_source, fragment_shader_source);
        
 		self.node.getMaterial(4).Type = newMaterialType;   
        
        self.node.Rot.Y = (self.node.Rot.Y + self.rotSpeed) % 360;
        self.updateDirection();
        if (self.node.Rot.Y < self.rotRange.min || self.node.Rot.Y > self.rotRange.max)
            self.rotSpeed = -self.rotSpeed;
        else if (self.isShooting)
            shoot(self, self.node.Pos.clone(), self.direction.clone(), this.bulletBounds);
    }

    this.pulseHit = function () {

    }
    var vertex_shader_source = 
                "\
        		   #ifdef GL_ES                    \n\
        		   precision highp float;          \n\
        		   #endif                          \n\
        		   uniform mat4 worldviewproj;     \
        		   uniform float time; \
        		   attribute vec4 vPosition;       \
        		   varying float intensity;     \
        		   uniform vec3 lightDir;       \
        		   attribute vec3 vNormal;         \
		           attribute vec2 vTexCoord1;      \
		           varying vec2 uv;       \
        		   void main()                     \
        		   {      \
        		   vec4 newPos = vPosition + vec4(vNormal, 1.0) * time; \
                    intensity = dot(lightDir,vNormal);         \
                    gl_Position = worldviewproj * newPos ; \
        		   }";
        		   
        var fragment_shader_source = 
        "\
        #ifdef GL_ES                    \n\
        precision highp float;          \n\
        #endif                          \n\
        uniform float radius;            \
        uniform float time; \
        varying float intensity;             \
        varying vec2 uv;       \
        \
        void main()                     \
        {                               \
	    gl_FragColor = vec4(1.0,0.41,0.15,1.0); \
        }";
        
        
    
        renderer = engine.getRenderer();
        newMaterialType = renderer.createMaterialType(vertex_shader_source, fragment_shader_source);
        shader1 = renderer.getGLProgramFromMaterialType(newMaterialType);
        shader1.time = renderer.gl.getUniformLocation(shader1, "time");
        renderer.gl.uniform1f(shader1.time, self.frame);
        
        
}