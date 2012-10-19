createVertex = function(x, y, z)
	{
		var vtx = new CL3D.Vertex3D(true);
		vtx.Pos.X = x;
		vtx.Pos.Y = y;
		vtx.Pos.Z = z;
		//vtx.TCoords.X = s;
		//vtx.TCoords.Y = t;
		return vtx;
	}

FloorPlane = function()
	{
		this.init();  // init scene node specific members
		
		// create a 3d mesh with one mesh buffer
		
		this.mesh = new CL3D.Mesh();
		var buf = new CL3D.MeshBuffer();
		this.mesh.AddMeshBuffer(buf);
		
		// set indices and vertices
							
		buf.Indices = [0,1,3, 3,1,2];
		
		buf.Vertices.push(createVertex( 100, 0, 100 ));
		buf.Vertices.push(createVertex( -100, 0, 100));
		buf.Vertices.push(createVertex( -100, 0, -100));
		buf.Vertices.push(createVertex( 100, 0, -100 ));
		
		// set the texture of the material
		
		//buf.Mat.Tex1 = engine.getTextureManager().getTexture("test.jpg", true);
	}
	FloorPlane.prototype = new CL3D.SceneNode(); // derive from SceneNode
	
	FloorPlane.prototype.OnRegisterSceneNode = function(scene)
	{
		scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
		CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this, scene); // call base class
	}
	
	FloorPlane.prototype.render = function(renderer)
	{
		renderer.setWorld(this.getAbsoluteTransformation());
		renderer.drawMesh(this.mesh);
	}